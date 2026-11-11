import type { Env } from "./env";

export const COLOURS = ["green", "yellow", "red"] as const;
export type Colour = (typeof COLOURS)[number];

export interface StatusInput {
  bot_name: string;
  colour: Colour;
  turns?: number | null;
  usage_share?: number | null;
  routines_per_day?: number | null;
  compacted?: boolean | null;
  note?: string | null;
}
export interface Status extends StatusInput {
  updated_at: string; // ISO 8601
}

export const HISTORY_DAYS = 90;
export const MAX_BOTS = 20;

export const LIMITS = {
  registration: { max: 10, windowSec: 3600 }, // OAuth client registrations per IP per hour
  report: { max: 30, windowSec: 3600 }, // report_status por hora
  request: { max: 300, windowSec: 3600 }, // cualquier petición autenticada por hora
} as const;

const now = () => Date.now();
const latestKey = (u: string, b: string) => `latest:${u}:${b}`;

export async function ensureUser(env: Env, userId: string) {
  await env.DB.prepare("INSERT OR IGNORE INTO users (id, created_at) VALUES (?, ?)").bind(userId, now()).run();
}

/** Ventana fija. Devuelve true si la petición entra en el límite. */
export async function hit(env: Env, userId: string, bucket: keyof typeof LIMITS): Promise<boolean> {
  const { max, windowSec } = LIMITS[bucket];
  const start = Math.floor(now() / 1000 / windowSec) * windowSec;
  const row = await env.DB.prepare(
    `INSERT INTO rate (user_id, bucket, window_start, count) VALUES (?, ?, ?, 1)
     ON CONFLICT (user_id, bucket, window_start) DO UPDATE SET count = count + 1
     RETURNING count`,
  ).bind(userId, bucket, start).first<{ count: number }>();
  return (row?.count ?? 1) <= max;
}

export async function reportStatus(env: Env, userId: string, s: StatusInput): Promise<Status> {
  await ensureUser(env, userId);
  const known = await env.DB.prepare("SELECT 1 FROM bots WHERE user_id = ? AND name = ?").bind(userId, s.bot_name).first();
  if (!known) {
    const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM bots WHERE user_id = ?").bind(userId).first<{ n: number }>();
    if ((c?.n ?? 0) >= MAX_BOTS) throw new Error(`Too many bots (max ${MAX_BOTS}). Use delete_bot with explicit confirmation to remove an unused bot first.`);
    await env.DB.prepare("INSERT INTO bots (user_id, name, created_at) VALUES (?, ?, ?)").bind(userId, s.bot_name, now()).run();
  }
  const t = now();
  await env.DB.prepare(
    `INSERT INTO status_history (user_id, bot_name, colour, turns, usage_share, routines_per_day, compacted, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    userId, s.bot_name, s.colour, s.turns ?? null, s.usage_share ?? null, s.routines_per_day ?? null,
    s.compacted == null ? null : s.compacted ? 1 : 0, s.note ?? null, t,
  ).run();
  const status: Status = { ...clean(s), updated_at: new Date(t).toISOString() };
  await env.LATEST.put(latestKey(userId, s.bot_name), JSON.stringify(status));
  return status;
}

function clean(s: StatusInput): StatusInput {
  const o: StatusInput = { bot_name: s.bot_name, colour: s.colour };
  for (const k of ["turns", "usage_share", "routines_per_day", "compacted", "note"] as const) {
    if (s[k] != null) (o as any)[k] = s[k];
  }
  return o;
}

export async function listBots(env: Env, userId: string): Promise<string[]> {
  const r = await env.DB.prepare("SELECT name FROM bots WHERE user_id = ? ORDER BY name").bind(userId).all<{ name: string }>();
  return r.results.map((x) => x.name);
}

export async function getStatus(env: Env, userId: string, bot: string): Promise<Status | null> {
  const v = await env.LATEST.get(latestKey(userId, bot));
  return v ? (JSON.parse(v) as Status) : null;
}

export async function allStatuses(env: Env, userId: string): Promise<Status[]> {
  const out: Status[] = [];
  for (const b of await listBots(env, userId)) {
    const s = await getStatus(env, userId, b);
    if (s) out.push(s);
  }
  return out;
}

export async function history(env: Env, userId: string, bot: string, limit = 30) {
  const r = await env.DB.prepare(
    `SELECT colour, turns, usage_share, routines_per_day, compacted, created_at FROM status_history
     WHERE user_id = ? AND bot_name = ? ORDER BY created_at DESC LIMIT ?`,
  ).bind(userId, bot, limit).all();
  return r.results.map((x: any) => ({ ...x, compacted: x.compacted == null ? null : !!x.compacted, created_at: new Date(x.created_at).toISOString() }));
}

/** Delete only this account's bot; retrying also clears a failed KV deletion. */
export async function deleteBot(env: Env, userId: string, bot: string) {
  await env.DB.batch([
    env.DB.prepare("DELETE FROM status_history WHERE user_id = ? AND bot_name = ?").bind(userId, bot),
    env.DB.prepare("DELETE FROM bots WHERE user_id = ? AND name = ?").bind(userId, bot),
  ]);
  await env.LATEST.delete(latestKey(userId, bot));
  return { access_revoked: false };
}

/** Borra todo lo del usuario: D1, KV y sus permisos OAuth. */
export async function deleteUser(env: Env, userId: string) {
  for (const b of await listBots(env, userId)) await env.LATEST.delete(latestKey(userId, b));
  await env.DB.batch([
    env.DB.prepare("DELETE FROM status_history WHERE user_id = ?").bind(userId),
    env.DB.prepare("DELETE FROM bots WHERE user_id = ?").bind(userId),
    env.DB.prepare("DELETE FROM rate WHERE user_id = ?").bind(userId),
    env.DB.prepare("DELETE FROM users WHERE id = ?").bind(userId),
  ]);
  let revoked = 0;
  try {
    let cursor: string | undefined;
    do {
      const page: any = await env.OAUTH_PROVIDER.listUserGrants(userId, cursor ? { cursor } : undefined);
      for (const g of page.items) { await env.OAUTH_PROVIDER.revokeGrant(g.id, userId); revoked++; }
      cursor = page.cursor;
    } while (cursor);
  } catch (e) {
    console.error("revoke failed", (e as Error).message);
  }
  return { revoked_grants: revoked };
}

export async function purgeOld(env: Env) {
  const cutoff = now() - HISTORY_DAYS * 86400_000;
  await env.DB.batch([
    env.DB.prepare("DELETE FROM status_history WHERE created_at < ?").bind(cutoff),
    env.DB.prepare("DELETE FROM rate WHERE window_start < ?").bind(Math.floor(now() / 1000) - 86400),
  ]);
}
