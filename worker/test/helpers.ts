import { SELF } from "cloudflare:test";
export const BASE = "http://localhost:8787";
const b64url = (b: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

/** DCR → authorize → consentimiento → login falso → token. */
export async function getToken(user = "tester", redirect = "http://localhost:9999/cb") {
  const reg = await SELF.fetch(`${BASE}/oauth/register`, {
    method: "POST", headers: { "Content-Type": "application/json", "CF-Connecting-IP": "test-" + user },
    body: JSON.stringify({ client_name: "Test client", redirect_uris: [redirect], token_endpoint_auth_method: "none" }),
  }).then((r) => r.json<any>());
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(32)).buffer);
  const challenge = b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
  const q = new URLSearchParams({ response_type: "code", client_id: reg.client_id, redirect_uri: redirect, state: "xyz", code_challenge: challenge, code_challenge_method: "S256", scope: "status", resource: `${BASE}/mcp` });
  const consent = await SELF.fetch(`${BASE}/authorize?${q}`);
  const html = await consent.text();
  const nonce = html.match(/name="nonce" value="([^"]+)"/)![1];
  const cookie = consent.headers.get("Set-Cookie")!.split(";")[0];
  const post = await SELF.fetch(`${BASE}/authorize`, { method: "POST", redirect: "manual", headers: { Cookie: cookie }, body: new URLSearchParams({ nonce, action: "allow" }) });
  const dev = new URL(post.headers.get("Location")!, BASE);
  dev.searchParams.set("user", user);
  const fin = await SELF.fetch(dev.toString(), { redirect: "manual", headers: { Cookie: cookie } });
  const back = new URL(fin.headers.get("Location")!);
  const code = back.searchParams.get("code")!;
  const tok = await SELF.fetch(`${BASE}/oauth/token`, {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirect, client_id: reg.client_id, code_verifier: verifier, resource: `${BASE}/mcp` }),
  }).then((r) => r.json<any>());
  return { token: tok.access_token as string, state: back.searchParams.get("state"), tok, reg, cookie, html };
}

let id = 0;
export async function rpc(token: string, method: string, params: any = {}) {
  const r = await SELF.fetch(`${BASE}/mcp`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json, text/event-stream", "MCP-Protocol-Version": "2025-06-18" },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++id, method, params }),
  });
  return { status: r.status, body: r.status === 200 ? await r.json<any>() : await r.text() };
}
export const call = async (token: string, name: string, args: any = {}) => {
  const r = await rpc(token, "tools/call", { name, arguments: args });
  const res = r.body.result;
  return { ...res, data: res?.content?.[0]?.text?.startsWith("{") ? JSON.parse(res.content[0].text) : res?.content?.[0]?.text };
};
