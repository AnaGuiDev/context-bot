import { OAuthProvider } from "@cloudflare/workers-oauth-provider";
import type { Env } from "./env";
import { apiHandler } from "./api";
import { defaultHandler } from "./auth";
import { allowRegistration, purgeOld } from "./store";

let provider: OAuthProvider<Env> | undefined;
let builtFor = "";

/** Se construye con PUBLIC_URL del entorno (producción o localhost). */
function getProvider(env: Env) {
  if (!provider || builtFor !== env.PUBLIC_URL) {
    const base = env.PUBLIC_URL.replace(/\/$/, "");
    provider = new OAuthProvider<Env>({
      apiRoute: "/mcp",
      apiHandler: apiHandler as any,
      defaultHandler: defaultHandler as any,
      authorizeEndpoint: "/authorize",
      tokenEndpoint: "/oauth/token",
      clientRegistrationEndpoint: "/oauth/register",
      scopesSupported: ["status"],
      requiredScopes: ["status"],
      accessTokenTTL: 3600,
      refreshTokenTTL: 90 * 86400,
      resourceMetadata: { resource: `${base}/mcp`, authorization_servers: [base], resource_name: "Context Bot live status" },
    });
    builtFor = env.PUBLIC_URL;
  }
  return provider;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // El origen público manda (en `wrangler dev` la ruta del dominio propio cambia el Host).
    const url = new URL(request.url);
    if (url.pathname === "/oauth/register" && request.method === "POST") {
      // CF-Connecting-IP llega de Cloudflare. El cupo es por IP y hay otro tope global.
      const ip = request.headers.get("CF-Connecting-IP") || "unknown";
      if (!(await allowRegistration(env, ip))) {
        return Response.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(3600 - Math.floor(Date.now() / 1000) % 3600) } });
      }
    }
    const pub = new URL(env.PUBLIC_URL);
    if (url.origin !== pub.origin) request = new Request(pub.origin + url.pathname + url.search, request);
    return getProvider(env).fetch(request, env, ctx);
  },
  async scheduled(_c: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(purgeOld(env));
  },
} satisfies ExportedHandler<Env>;
