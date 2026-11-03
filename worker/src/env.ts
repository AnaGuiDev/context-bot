import type { OAuthHelpers } from "@cloudflare/workers-oauth-provider";

export interface Env {
  DB: D1Database;
  LATEST: KVNamespace;
  OAUTH_KV: KVNamespace;
  OAUTH_PROVIDER: OAuthHelpers;
  PUBLIC_URL: string;
  DEV_FAKE_LOGIN?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}

/** Lo único que guardamos del usuario en el token. */
export interface Props {
  userId: string; // "gh_<id>"
}
