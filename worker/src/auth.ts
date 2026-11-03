import type { AuthRequest } from "@cloudflare/workers-oauth-provider";
import type { Env, Props } from "./env";
import { VERSION } from "./mcp";

const PENDING_TTL = 600;
const SEC_HEADERS = {
  // Sin form-action: Chrome lo aplica también a la redirección final al redirect_uri del cliente.
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cache-Control": "no-store",
};

export function fakeLoginAllowed(env: Env) {
  if (env.DEV_FAKE_LOGIN !== "1") return false;
  const h = new URL(env.PUBLIC_URL).hostname;
  return h === "localhost" || h === "127.0.0.1";
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const page = (title: string, body: string, status = 200, extra: Record<string, string> = {}) =>
  new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:34rem;margin:3rem auto;padding:0 1rem;color:#1a1d24}h1{font-size:1.4rem}.box{background:#f4f6fb;border-radius:12px;padding:1rem 1.2rem}button{font:inherit;padding:.6rem 1.2rem;border-radius:999px;border:1px solid #c9cfdb;background:#fff;cursor:pointer;margin-right:.5rem}button.ok{background:#2d5bd2;color:#fff;border-color:#2d5bd2}small{color:#5a6170}</style>
<body>${body}</body></html>`, { status, headers: { "Content-Type": "text/html; charset=utf-8", ...SEC_HEADERS, ...extra } });

const secure = (env: Env) => env.PUBLIC_URL.startsWith("https://");
const cookie = (env: Env, v: string, maxAge: number) =>
  `${secure(env) ? "__Host-" : ""}cb_nonce=${v}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure(env) ? "; Secure" : ""}`;
const readCookie = (req: Request, env: Env) => {
  const name = `${secure(env) ? "__Host-" : ""}cb_nonce=`;
  return (req.headers.get("Cookie") ?? "").split(/;\s*/).find((c) => c.startsWith(name))?.slice(name.length);
};

async function savePending(env: Env, oauthReq: AuthRequest) {
  const nonce = crypto.randomUUID();
  await env.OAUTH_KV.put(`pending:${nonce}`, JSON.stringify(oauthReq), { expirationTtl: PENDING_TTL });
  return nonce;
}
async function takePending(env: Env, nonce: string | null | undefined, consume = true): Promise<AuthRequest | null> {
  if (!nonce || !/^[0-9a-f-]{36}$/.test(nonce)) return null;
  const v = await env.OAUTH_KV.get(`pending:${nonce}`);
  if (v && consume) await env.OAUTH_KV.delete(`pending:${nonce}`);
  return v ? JSON.parse(v) : null;
}

async function finish(env: Env, oauthReq: AuthRequest, userId: string) {
  const props: Props = { userId };
  const { redirectTo } = await env.OAUTH_PROVIDER.completeAuthorization({
    request: oauthReq, userId, metadata: { connectedAt: new Date().toISOString() }, scope: ["status"], props,
  });
  return new Response(null, { status: 302, headers: { Location: redirectTo, "Set-Cookie": cookie(env, "", 0), ...SEC_HEADERS } });
}

export const defaultHandler = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/" && request.method === "GET")
      return page("Context Bot · live status", `<h1>🚦 Context Bot · live status</h1><p>Remote MCP server for <a href="https://contextbot.app/">Context Bot</a>. Add <code>${esc(env.PUBLIC_URL)}/mcp</code> as a connector in Grok Bot.</p><p><small>Unofficial community project, not affiliated with Grok Bot or xAI. v${VERSION}</small></p>`);

    if (url.pathname === "/health") return Response.json({ ok: true, version: VERSION });

    if (url.pathname === "/authorize" && request.method === "GET") {
      let oauthReq: AuthRequest;
      try { oauthReq = await env.OAUTH_PROVIDER.parseAuthRequest(request); }
      catch (e) { return page("Invalid request", `<h1>Invalid request</h1><p>${esc((e as Error).message)}</p>`, 400); }
      const client = await env.OAUTH_PROVIDER.lookupClient(oauthReq.clientId);
      if (!client) return page("Unknown app", "<h1>Unknown app</h1>", 400);
      const nonce = await savePending(env, oauthReq);
      const who = client.clientName || "An app";
      const dest = new URL(oauthReq.redirectUri).host;
      const login = fakeLoginAllowed(env) ? "a local test account (dev mode)" : "your GitHub account";
      return page("Connect Context Bot", `<h1>Connect Context Bot live status</h1>
<div class="box"><p><strong>${esc(who)}</strong> (<code>${esc(dest)}</code>) wants to:</p>
<ul><li>save and read your bots' traffic-light status (colour and estimated numbers),</li><li>delete that data when you ask.</li></ul>
<p>It will <strong>never</strong> receive your conversations. You'll sign in with ${login}; we only keep its numeric ID.</p></div>
<form method="post" action="/authorize"><input type="hidden" name="nonce" value="${nonce}"><p>
<button class="ok" name="action" value="allow">Allow</button><button name="action" value="deny">Cancel</button></p></form>
<p><small>Unofficial community project, not affiliated with Grok Bot or xAI.</small></p>`, 200, { "Set-Cookie": cookie(env, nonce, PENDING_TTL) });
    }

    if (url.pathname === "/authorize" && request.method === "POST") {
      const form = await request.formData();
      const nonce = String(form.get("nonce") ?? "");
      if (nonce !== readCookie(request, env)) return page("Expired", "<h1>This request expired</h1><p>Start again from your app.</p>", 400);
      const oauthReq = await takePending(env, nonce, false);
      if (!oauthReq) return page("Expired", "<h1>This request expired</h1><p>Start again from your app.</p>", 400);
      if (form.get("action") !== "allow") {
        await takePending(env, nonce);
        const r = new URL(oauthReq.redirectUri);
        r.searchParams.set("error", "access_denied");
        if (oauthReq.state) r.searchParams.set("state", oauthReq.state);
        return Response.redirect(r.toString(), 302);
      }
      if (fakeLoginAllowed(env)) return new Response(null, { status: 302, headers: { Location: `/dev-login?state=${nonce}`, ...SEC_HEADERS } });
      if (!env.GITHUB_CLIENT_ID) return page("Not configured", "<h1>GitHub sign-in is not configured</h1>", 500);
      const gh = new URL("https://github.com/login/oauth/authorize");
      gh.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      gh.searchParams.set("redirect_uri", `${env.PUBLIC_URL}/callback`);
      gh.searchParams.set("scope", ""); // sin permisos: solo identidad pública
      gh.searchParams.set("state", nonce);
      gh.searchParams.set("allow_signup", "true");
      return Response.redirect(gh.toString(), 302);
    }

    if (url.pathname === "/dev-login" && fakeLoginAllowed(env)) {
      const nonce = url.searchParams.get("state");
      if (nonce !== readCookie(request, env)) return page("Expired", "<h1>Expired</h1>", 400);
      const oauthReq = await takePending(env, nonce);
      if (!oauthReq) return page("Expired", "<h1>Expired</h1>", 400);
      const user = (url.searchParams.get("user") ?? "tester").replace(/[^a-z0-9-]/gi, "").slice(0, 30) || "tester";
      return finish(env, oauthReq, `dev_${user}`);
    }

    if (url.pathname === "/callback") {
      const nonce = url.searchParams.get("state");
      if (!nonce || nonce !== readCookie(request, env)) return page("Expired", "<h1>This sign-in expired</h1><p>Start again from your app.</p>", 400);
      const oauthReq = await takePending(env, nonce);
      const code = url.searchParams.get("code");
      if (!oauthReq || !code) return page("Expired", "<h1>This sign-in expired</h1><p>Start again from your app.</p>", 400);
      const tok = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: `${env.PUBLIC_URL}/callback` }),
      }).then((r) => r.json<any>());
      if (!tok.access_token) return page("Sign-in failed", "<h1>GitHub sign-in failed</h1>", 400);
      const user = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${tok.access_token}`, "User-Agent": "context-bot-mcp", Accept: "application/vnd.github+json" },
      }).then((r) => r.json<any>());
      // El token de GitHub no se guarda: solo el ID numérico.
      if (typeof user.id !== "number") return page("Sign-in failed", "<h1>GitHub sign-in failed</h1>", 400);
      return finish(env, oauthReq, `gh_${user.id}`);
    }

    return new Response("Not found", { status: 404 });
  },
};
