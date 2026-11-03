# Deploying the connector (Cloudflare Workers)

[Español](../despliegue-worker.md) · This guide is for maintainers. Everything fits in Cloudflare's free plan.

## Locally (no account needed)

```bash
cd worker
npm install
cp .dev.vars.example .dev.vars   # DEV_FAKE_LOGIN=1: fake sign-in, localhost only
npm run db:local                 # apply migrations to the local D1
npm test                         # 13 tests (OAuth, tools, REST, deletion, purge)
npm run dev                      # http://localhost:8787
npm run smoke                    # in another terminal: real MCP client against wrangler dev
```

To try the dashboard against your local Worker:

1. Serve `dist/` with `python3 -m http.server 8765`.
2. Open `http://localhost:8765/dashboard/?live=http://localhost:8787`.

## Production

1. Sign in and create the resources. Copy the ids into `wrangler.toml` (replacing `TODO_D1_DATABASE_ID`, `TODO_KV_LATEST_ID` and `TODO_KV_OAUTH_ID`):
   ```bash
   npx wrangler login
   npx wrangler d1 create context_bot
   npx wrangler kv namespace create LATEST
   npx wrangler kv namespace create OAUTH_KV
   ```
2. Apply the migrations to the remote database:
   ```bash
   npx wrangler d1 migrations apply context_bot --remote
   ```
3. Create the GitHub OAuth app at <https://github.com/settings/developers> → *New OAuth App*:
   - Homepage: `https://contextbot.app`
   - Authorization callback URL: `https://mcp.contextbot.app/callback`
4. Store the secrets:
   ```bash
   npx wrangler secret put GITHUB_CLIENT_ID
   npx wrangler secret put GITHUB_CLIENT_SECRET
   ```
5. Deploy with `npm run deploy`. The `mcp.contextbot.app` domain must be in the same Cloudflare account; `custom_domain = true` creates the DNS record and the certificate.
6. Check that everything responds:
   - `curl https://mcp.contextbot.app/health`
   - `curl https://mcp.contextbot.app/.well-known/oauth-authorization-server`

`DEV_FAKE_LOGIN` stays `"0"` in production. On top of that, the fake sign-in only works when `PUBLIC_URL` is localhost.

## Maintenance

- A daily cron (03:17 UTC) purges history older than 90 days.
- Registered OAuth clients expire after 90 days.
