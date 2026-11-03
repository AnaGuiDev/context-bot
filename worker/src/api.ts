import type { Env, Props } from "./env";
import { allStatuses, deleteUser, hit, history } from "./store";
import { handleMcp } from "./mcp";

/** Rutas protegidas por token (las valida OAuthProvider antes de llegar aquí). */
export const apiHandler = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext & { props: Props }): Promise<Response> {
    const props = ctx.props;
    const url = new URL(request.url);
    if (url.pathname === "/mcp") return handleMcp(request, env, props);

    if (!(await hit(env, props.userId, "request"))) return json({ error: "rate_limited" }, 429);
    if (url.pathname === "/mcp/api/statuses" && request.method === "GET") {
      const statuses = await allStatuses(env, props.userId);
      const withHistory = url.searchParams.get("history") === "1";
      const bots = [];
      for (const s of statuses) bots.push(withHistory ? { ...s, history: await history(env, props.userId, s.bot_name) } : s);
      return json({ bots, estimates: true });
    }
    if (url.pathname === "/mcp/api/me" && request.method === "DELETE") return json({ deleted: true, ...(await deleteUser(env, props.userId)) });
    return json({ error: "not_found" }, 404);
  },
};

function json(o: unknown, status = 200) {
  return new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}
