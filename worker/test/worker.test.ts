import { describe, expect, it } from "vitest";
import { SELF, env } from "cloudflare:test";
import { BASE, call, getToken, rpc } from "./helpers";

describe("OAuth", () => {
  it("publishes protected resource metadata and challenges without a token", async () => {
    const meta = await SELF.fetch(`${BASE}/.well-known/oauth-protected-resource/mcp`).then((r) => r.json<any>());
    expect(meta.resource).toBe(`${BASE}/mcp`);
    const r = await SELF.fetch(`${BASE}/mcp`, { method: "POST", body: "{}" });
    expect(r.status).toBe(401);
    expect(r.headers.get("WWW-Authenticate")).toMatch(/resource_metadata/);
  });

  it("runs the full flow: consent page, fake login, token, state kept", async () => {
    const { token, state, html } = await getToken();
    expect(html).toContain("never");
    expect(html).toContain("Test client");
    expect(state).toBe("xyz");
    expect(token).toBeTruthy();
  });

  it("rejects a consent POST without the matching cookie", async () => {
    const r = await SELF.fetch(`${BASE}/authorize`, { method: "POST", body: new URLSearchParams({ nonce: crypto.randomUUID(), action: "allow" }) });
    expect(r.status).toBe(400);
  });

  it("serves no fake login when PUBLIC_URL is not localhost", async () => {
    const { fakeLoginAllowed } = await import("../src/auth");
    expect(fakeLoginAllowed({ ...(env as any), PUBLIC_URL: "https://mcp.contextbot.app" })).toBe(false);
    expect(fakeLoginAllowed({ ...(env as any), DEV_FAKE_LOGIN: "0" })).toBe(false);
  });
});

describe("MCP tools", () => {
  it("lists the five tools", async () => {
    const { token } = await getToken("lister");
    const r = await rpc(token, "tools/list");
    expect(r.body.result.tools.map((t: any) => t.name).sort()).toEqual(["delete_my_data", "get_status", "get_tips", "list_bots", "report_status"]);
  });

  it("reports, reads, lists and isolates users", async () => {
    const a = (await getToken("alice")).token;
    const b = (await getToken("bob")).token;
    const rep = await call(a, "report_status", { bot_name: "Writer", colour: "yellow", turns: 120, usage_share: 0.4, routines_per_day: 2, compacted: false, note: "estimate" });
    expect(rep.isError).toBeFalsy();
    expect(rep.data.status.colour).toBe("yellow");
    expect((await call(a, "get_status", { bot_name: "Writer" })).data.turns).toBe(120);
    expect((await call(a, "list_bots")).data.bots).toEqual(["Writer"]);
    expect((await call(b, "list_bots")).data.bots).toEqual([]);
    expect((await call(b, "get_status", { bot_name: "Writer" })).data.status).toBeNull();
  });

  it("validates input", async () => {
    const { token } = await getToken("val");
    expect((await call(token, "report_status", { bot_name: "X", colour: "blue" })).isError).toBe(true);
    expect((await call(token, "report_status", { bot_name: "X", colour: "red", note: "a".repeat(141) })).isError).toBe(true);
    expect((await call(token, "report_status", { bot_name: "<script>", colour: "red" })).isError).toBe(true);
    expect((await call(token, "report_status", { bot_name: "X", colour: "red", usage_share: 2 })).isError).toBe(true);
  });

  it("returns sourced tips in both languages", async () => {
    const { token } = await getToken("tips");
    for (const lang of ["en", "es"]) {
      const t = (await call(token, "get_tips", { lang })).data.tips;
      expect(t.length).toBeGreaterThan(3);
      expect(t[0].sources.length).toBeGreaterThan(0);
    }
  });

  it("rate-limits report_status at 30 per hour", async () => {
    const { token } = await getToken("spammer");
    for (let i = 0; i < 30; i++) expect((await call(token, "report_status", { bot_name: "B", colour: "green" })).isError).toBeFalsy();
    const r = await call(token, "report_status", { bot_name: "B", colour: "green" });
    expect(r.isError).toBe(true);
    expect(r.data).toMatch(/Rate limit/);
  });

  it("delete_my_data wipes data and revokes the token", async () => {
    const { token } = await getToken("leaver");
    await call(token, "report_status", { bot_name: "Gone", colour: "red" });
    expect((await call(token, "delete_my_data", { confirm: true })).data.deleted).toBe(true);
    expect(await (env as any).LATEST.get("latest:dev_leaver:Gone")).toBeNull();
    const n = await (env as any).DB.prepare("SELECT COUNT(*) n FROM status_history WHERE user_id='dev_leaver'").first();
    expect(n.n).toBe(0);
    expect((await rpc(token, "tools/list")).status).toBe(401);
  });
});

describe("REST API for the dashboard", () => {
  it("returns statuses with history, and CORS", async () => {
    const { token } = await getToken("dash");
    await call(token, "report_status", { bot_name: "Main", colour: "green", turns: 10 });
    await call(token, "report_status", { bot_name: "Main", colour: "yellow", turns: 90 });
    const r = await SELF.fetch(`${BASE}/mcp/api/statuses?history=1`, { headers: { Authorization: `Bearer ${token}`, Origin: "http://localhost:8765" } });
    expect(r.status).toBe(200);
    const j = await r.json<any>();
    expect(j.bots[0].colour).toBe("yellow");
    expect(j.bots[0].history.length).toBe(2);
    expect(r.headers.get("Access-Control-Allow-Origin")).toBeTruthy();
  });

  it("requires a token", async () => {
    expect((await SELF.fetch(`${BASE}/mcp/api/statuses`)).status).toBe(401);
  });
});

describe("cron", () => {
  it("purges history older than 90 days", async () => {
    const db = (env as any).DB;
    await db.prepare("INSERT INTO status_history (user_id, bot_name, colour, created_at) VALUES ('old','b','red',?)").bind(Date.now() - 91 * 86400_000).run();
    const { purgeOld } = await import("../src/store");
    await purgeOld(env as any);
    expect((await db.prepare("SELECT COUNT(*) n FROM status_history WHERE user_id='old'").first()).n).toBe(0);
  });
});
