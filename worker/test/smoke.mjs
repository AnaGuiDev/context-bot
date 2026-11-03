// Prueba de humo contra `wrangler dev` (http://localhost:8787) con un cliente MCP real.
// Uso: npm run dev   (en otra terminal)  →  npm run smoke
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { createHash, randomBytes } from "node:crypto";

const BASE = process.env.BASE ?? "http://localhost:8787";
const REDIRECT = "http://localhost:9999/cb";
const ok = (c, m) => { if (!c) { console.error("✗", m); process.exit(1); } console.log("✓", m); };

const meta = await fetch(`${BASE}/.well-known/oauth-authorization-server`).then((r) => r.json());
ok(meta.registration_endpoint, "authorization server metadata");
const reg = await fetch(meta.registration_endpoint, { method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ client_name: "Smoke test", redirect_uris: [REDIRECT], token_endpoint_auth_method: "none" }) }).then((r) => r.json());
ok(reg.client_id, "dynamic client registration");
const verifier = randomBytes(32).toString("base64url");
const challenge = createHash("sha256").update(verifier).digest("base64url");
const q = new URLSearchParams({ response_type: "code", client_id: reg.client_id, redirect_uri: REDIRECT, state: "s1", code_challenge: challenge, code_challenge_method: "S256", scope: "status", resource: `${BASE}/mcp` });
const consent = await fetch(`${BASE}/authorize?${q}`);
const html = await consent.text();
const nonce = html.match(/name="nonce" value="([^"]+)"/)?.[1];
const cookie = consent.headers.get("set-cookie")?.split(";")[0];
ok(nonce && cookie, "consent page");
const post = await fetch(`${BASE}/authorize`, { method: "POST", redirect: "manual", headers: { Cookie: cookie }, body: new URLSearchParams({ nonce, action: "allow" }) });
const fin = await fetch(new URL(post.headers.get("location"), BASE) + "&user=" + (process.env.SMOKE_USER ?? "smoke"), { redirect: "manual", headers: { Cookie: cookie } });
const back = new URL(fin.headers.get("location"));
ok(back.searchParams.get("code") && back.searchParams.get("state") === "s1", "login (dev) and redirect back with code");
const tok = await fetch(meta.token_endpoint, { method: "POST", body: new URLSearchParams({ grant_type: "authorization_code", code: back.searchParams.get("code"), redirect_uri: REDIRECT, client_id: reg.client_id, code_verifier: verifier, resource: `${BASE}/mcp` }) }).then((r) => r.json());
ok(tok.access_token && tok.refresh_token, "token exchange (PKCE)");

const client = new Client({ name: "smoke", version: "1.0.0" });
await client.connect(new StreamableHTTPClientTransport(new URL(`${BASE}/mcp`), { requestInit: { headers: { Authorization: `Bearer ${tok.access_token}` } } }));
const tools = (await client.listTools()).tools.map((t) => t.name).sort();
ok(tools.length === 5, `tools/list → ${tools.join(", ")}`);
const r = await client.callTool({ name: "report_status", arguments: { bot_name: "Smoke Bot", colour: "yellow", turns: 85, usage_share: 0.3, routines_per_day: 1, compacted: false, note: "smoke test" } });
ok(!r.isError, "report_status");
const g = JSON.parse((await client.callTool({ name: "get_status", arguments: { bot_name: "Smoke Bot" } })).content[0].text);
ok(g.colour === "yellow" && g.turns === 85, "get_status");
const l = JSON.parse((await client.callTool({ name: "list_bots", arguments: {} })).content[0].text);
ok(l.bots.includes("Smoke Bot"), "list_bots");
const t = JSON.parse((await client.callTool({ name: "get_tips", arguments: { lang: "es" } })).content[0].text);
ok(t.tips.length > 0, `get_tips (es) → ${t.tips.length}`);
const api = await fetch(`${BASE}/mcp/api/statuses`, { headers: { Authorization: `Bearer ${tok.access_token}` } }).then((r) => r.json());
ok(api.bots[0]?.bot_name === "Smoke Bot", "REST /mcp/api/statuses");
if (process.env.KEEP_DATA) { await client.close(); console.log("Smoke test OK (data kept)"); process.exit(0); }
const d = JSON.parse((await client.callTool({ name: "delete_my_data", arguments: { confirm: true } })).content[0].text);
ok(d.deleted && d.revoked_grants >= 1, "delete_my_data");
const after = await fetch(`${BASE}/mcp/api/statuses`, { headers: { Authorization: `Bearer ${tok.access_token}` } });
ok(after.status === 401, "token revoked after deletion");
await client.close();
console.log("Smoke test OK");
