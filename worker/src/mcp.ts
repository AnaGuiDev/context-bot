import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import type { Env, Props } from "./env";
import tips from "./tips.json";
import { COLOURS, deleteUser, getStatus, hit, listBots, reportStatus } from "./store";

export const VERSION = "1.0.0";
const BOT_NAME = z.string().trim().min(1).max(60).regex(/^[\p{L}\p{N} ._'-]+$/u, "letters, numbers, spaces and . _ ' - only");

const text = (o: unknown) => ({ content: [{ type: "text" as const, text: typeof o === "string" ? o : JSON.stringify(o, null, 2) }] });
const fail = (msg: string) => ({ ...text(msg), isError: true });

export function buildServer(env: Env, props: Props) {
  const uid = props.userId;
  const server = new McpServer({ name: "context-bot", version: VERSION });

  server.registerTool("report_status", {
    title: "Report status",
    description:
      "Save this bot's current Context Bot traffic-light status so the owner can see it in the dashboard. " +
      "All numbers are the bot's own ESTIMATES (bots cannot read their exact context size). " +
      "Never send conversation content: `note` is a short generic label such as 'summarised today'.",
    inputSchema: {
      bot_name: BOT_NAME.describe("The bot's display name"),
      colour: z.enum(COLOURS).describe("green, yellow or red"),
      turns: z.number().int().min(0).max(100000).optional().describe("Estimated turns in this conversation"),
      usage_share: z.number().min(0).max(1).optional().describe("Estimated share of the owner's usage this bot takes, 0–1"),
      routines_per_day: z.number().int().min(0).max(1000).optional().describe("Routine runs per day"),
      compacted: z.boolean().optional().describe("Whether the conversation has been compacted or summarised"),
      note: z.string().max(140).optional().describe("Short generic note, max 140 characters, no conversation content"),
    },
    annotations: { idempotentHint: false, destructiveHint: false },
  }, async (args) => {
    if (!(await hit(env, uid, "report"))) return fail("Rate limit: at most 30 reports per hour. Try again later.");
    try {
      const s = await reportStatus(env, uid, args);
      return text({ saved: true, status: s });
    } catch (e) { return fail((e as Error).message); }
  });

  server.registerTool("get_status", {
    title: "Get status",
    description: "Read the latest saved status of one bot (or all bots if bot_name is omitted).",
    inputSchema: { bot_name: BOT_NAME.optional() },
    annotations: { readOnlyHint: true },
  }, async ({ bot_name }) => {
    if (bot_name) return text((await getStatus(env, uid, bot_name)) ?? { status: null, message: "No status saved for that bot yet." });
    const out = [];
    for (const b of await listBots(env, uid)) { const s = await getStatus(env, uid, b); if (s) out.push(s); }
    return text({ statuses: out });
  });

  server.registerTool("get_tips", {
    title: "Get tips",
    description: "Tips for using less, each with its source. lang: 'en' or 'es'.",
    inputSchema: { lang: z.enum(["en", "es"]).default("en") },
    annotations: { readOnlyHint: true },
  }, async ({ lang }) => text({ tips: (tips as any)[lang ?? "en"] }));

  server.registerTool("list_bots", {
    title: "List bots",
    description: "List the bot names that have reported a status for this account.",
    inputSchema: {},
    annotations: { readOnlyHint: true },
  }, async () => text({ bots: await listBots(env, uid) }));

  server.registerTool("delete_my_data", {
    title: "Delete my data",
    description: "Permanently delete every status, bot name and the account record, and revoke this connector's access. Only call when the owner explicitly asks. Requires confirm: true.",
    inputSchema: { confirm: z.literal(true).describe("Must be true") },
    annotations: { destructiveHint: true, idempotentHint: true },
  }, async () => text({ deleted: true, ...(await deleteUser(env, uid)) }));

  return server;
}

/** Sin estado: un servidor y un transporte por petición. */
export async function handleMcp(request: Request, env: Env, props: Props): Promise<Response> {
  if (!(await hit(env, props.userId, "request"))) return Response.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": "600" } });
  const server = buildServer(env, props);
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await server.connect(transport);
  return transport.handleRequest(request);
}
