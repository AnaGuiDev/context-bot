# Desplegar el conector (Cloudflare Workers)

[English](en/worker-deployment.md) · Esta guía es para quien mantiene el proyecto. Todo funciona en el plan gratuito de Cloudflare.

## En local (sin cuenta)

```bash
cd worker
npm install
cp .dev.vars.example .dev.vars   # DEV_FAKE_LOGIN=1: inicio de sesión falso, solo en localhost
npm run db:local                 # aplica las migraciones a la D1 local
npm test                         # 13 pruebas (OAuth, herramientas, REST, borrado, purga)
npm run dev                      # http://localhost:8787
npm run smoke                    # en otra terminal: cliente MCP real contra wrangler dev
```

Para probar el panel contra tu Worker local:

1. Sirve `dist/` con `python3 -m http.server 8765`.
2. Abre `http://localhost:8765/es/dashboard/?live=http://localhost:8787`.

## En producción

1. Inicia sesión y crea los recursos. Copia los ids en `wrangler.toml` (en lugar de `TODO_D1_DATABASE_ID`, `TODO_KV_LATEST_ID` y `TODO_KV_OAUTH_ID`):
   ```bash
   npx wrangler login
   npx wrangler d1 create context_bot
   npx wrangler kv namespace create LATEST
   npx wrangler kv namespace create OAUTH_KV
   ```
2. Aplica las migraciones a la base de datos remota:
   ```bash
   npx wrangler d1 migrations apply context_bot --remote
   ```
3. Crea la app OAuth de GitHub en <https://github.com/settings/developers> → *New OAuth App*:
   - Homepage: `https://contextbot.app`
   - Authorization callback URL: `https://mcp.contextbot.app/callback`
4. Guarda los secretos:
   ```bash
   npx wrangler secret put GITHUB_CLIENT_ID
   npx wrangler secret put GITHUB_CLIENT_SECRET
   ```
5. Despliega con `npm run deploy`. El dominio `mcp.contextbot.app` debe estar en la misma cuenta de Cloudflare: `custom_domain = true` crea el DNS y el certificado.
6. Comprueba que todo responde:
   - `curl https://mcp.contextbot.app/health`
   - `curl https://mcp.contextbot.app/.well-known/oauth-authorization-server`

En producción, `DEV_FAKE_LOGIN` se queda en `"0"`. Además, el inicio de sesión falso solo se activa si `PUBLIC_URL` es localhost.

## Mantenimiento

- Hay un cron diario (03:17 UTC) que purga el historial de más de 90 días.
- Los clientes OAuth registrados caducan a los 90 días.
