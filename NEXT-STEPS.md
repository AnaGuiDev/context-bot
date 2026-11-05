# Next steps · Siguientes pasos

**Nothing has been pushed, published, bought or deployed.** Everything is in this local repository, in commits by Ana Gui.
**No se ha subido, publicado, comprado ni desplegado nada.** Todo está en este repositorio local, en commits de Ana Gui.

## English

### What's done
- **Rebrand to Context Bot** (`contextbot.app`). Skill in `skills/context-bot/`.
- **Bilingual website** built from `src/` by `bash scripts/build-site.sh` into `dist/`: English at `/`, Spanish at `/es/`, `hreflang` + `x-default`, a remembered EN/ES toggle, and browser-language detection.
- **Dashboard** in both languages, with the new **Handoff** view (watch memory, tasks, files and routines move to the new bot; copy or download `TRASPASO.md`; paste one to visualise it). Try `/dashboard/?demo`.
- **Docs** in Spanish (`docs/`) and English (`docs/en/`). `README.md` is English, `README.es.md` is Spanish.
- **Launch kit** with EN and ES posts in [docs/lanzamiento.md](docs/lanzamiento.md).

### Your turn, in order
1. Fill in the X, Buy Me a Coffee and GitHub details ([PLACEHOLDERS.md](PLACEHOLDERS.md)) and commit.
2. Check the videos have arrived in `assets/video/` (`promo-{en,es}-{16x9,9x16}.mp4`, `poster-{en,es}-{16x9,9x16}.jpg`, `promo-en.gif`). The build warns if any are missing.
3. `bash scripts/build-site.sh && python3 -m http.server -d dist 8000`, then look at `/`, `/es/` and `/dashboard/?demo`.
4. Create the `context-bot` repo and push ([docs/publicar.md](docs/publicar.md), step 1).
5. Buy `contextbot.app` on Cloudflare Registrar and publish on Cloudflare Pages (steps 4–5). **`.app` only works over HTTPS:** wait for the certificate to be Active before announcing anything.
6. Launch with [docs/lanzamiento.md](docs/lanzamiento.md).

### Live status connector (v1, optional)
- `worker/`: Cloudflare Worker MCP server with OAuth (GitHub sign-in), D1 + KV and 5 tools including `delete_my_data`, plus a REST API for the dashboard. Locally: tsc is clean, 13/13 tests pass, and the smoke test with a real MCP client against `wrangler dev` passes. The dashboard's **Connect live status** button was tested end to end in Chrome against `wrangler dev`.
- Docs: [docs/en/connector.md](docs/en/connector.md) and [docs/en/worker-deployment.md](docs/en/worker-deployment.md).
- **Your turn:**
  1. Deploy following worker-deployment.md (D1/KV ids, GitHub OAuth app with callback `https://mcp.contextbot.app/callback`, secrets).
  2. Then change "Coming soon: live status" in `src/i18n.py` (`s4_h`, EN and ES) and rebuild.
- **Test live before announcing:**
  - Does Grok Bot's "Add this MCP server" support dynamic client registration and the `resource` parameter?
  - Does the OAuth redirect come back correctly?
  - Does the routine report its status without asking you anything?
- **Known limits:**
  - Rate limits are per user only.
  - `/oauth/register` is open (as DCR requires); registered clients expire after 90 days.

### Known weak spots
- The Context Bot Migrator handoff hasn't been tested end to end yet. Try it once before announcing.
- Some sources are forum posts from the team, not official docs.
- The skill text is Spanish only for now.

## Español

### Qué está hecho
- **Nuevo nombre: Context Bot** (`contextbot.app`). Skill en `skills/context-bot/`.
- **Web bilingüe** generada desde `src/` con `bash scripts/build-site.sh` en `dist/`: inglés en `/`, español en `/es/`, `hreflang` + `x-default`, selector EN/ES que se recuerda y detección del idioma del navegador.
- **Panel** en los dos idiomas, con la nueva vista **Traspaso** (ves cómo pasan memoria, tareas, archivos y rutinas al bot nuevo; copias o descargas el `TRASPASO.md`; pegas uno para verlo). Pruébalo en `/es/dashboard/?demo`.
- **Guías** en español (`docs/`) y en inglés (`docs/en/`). `README.md` en inglés y `README.es.md` en español.
- **Kit de lanzamiento** con posts en inglés y en español en [docs/lanzamiento.md](docs/lanzamiento.md).

### Qué te toca, en orden
1. Rellena X, Buy Me a Coffee y GitHub ([PLACEHOLDERS.md](PLACEHOLDERS.md)) y haz commit.
2. Comprueba que han llegado los vídeos a `assets/video/` (`promo-{en,es}-{16x9,9x16}.mp4`, `poster-{en,es}-{16x9,9x16}.jpg`, `promo-en.gif`). La compilación avisa si falta alguno.
3. `bash scripts/build-site.sh && python3 -m http.server -d dist 8000` y mira `/`, `/es/` y `/es/dashboard/?demo`.
4. Crea el repositorio `context-bot` y súbelo ([docs/publicar.md](docs/publicar.md), paso 1).
5. Compra `contextbot.app` en Cloudflare Registrar y publica en Cloudflare Pages (pasos 4 y 5). **`.app` solo funciona con HTTPS:** espera a que el certificado esté en Active antes de anunciar nada.
6. Lanza con [docs/lanzamiento.md](docs/lanzamiento.md).

### Conector de estado en directo (v1, opcional)
- `worker/`: servidor MCP en un Worker de Cloudflare con OAuth (entrada con GitHub), D1 + KV y 5 herramientas, entre ellas `delete_my_data`, más una API REST para el panel. En local: tsc sin errores, 13/13 pruebas superadas y prueba de humo superada con un cliente MCP real contra `wrangler dev`. El botón **Conectar estado en directo** del panel está probado de principio a fin en Chrome contra `wrangler dev`.
- Guías: [docs/conector.md](docs/conector.md) y [docs/despliegue-worker.md](docs/despliegue-worker.md).
- **Te toca:**
  1. Despliega siguiendo despliegue-worker.md (ids de D1/KV, app OAuth de GitHub con callback `https://mcp.contextbot.app/callback`, secretos).
  2. Después cambia «Próximamente: estado en directo» en `src/i18n.py` (`s4_h`, EN y ES) y vuelve a generar la web.
- **Prueba en real antes de anunciarlo:**
  - ¿El «Add this MCP server» de Grok Bot admite el registro dinámico de clientes y el parámetro `resource`?
  - ¿La redirección OAuth vuelve bien?
  - ¿La rutina informa de su estado sin preguntarte nada?
- **Límites conocidos:**
  - Los límites de uso son solo por usuario.
  - `/oauth/register` es abierto (lo exige el registro dinámico de clientes); los clientes registrados caducan a los 90 días.

### Puntos flojos conocidos
- El traspaso con Context Bot Migrator aún no se ha probado de principio a fin. Pruébalo una vez antes de anunciarlo.
- Algunas fuentes son mensajes del equipo en el foro, no documentación oficial.
- De momento la skill solo está en español.

Unofficial project, not affiliated with Grok Bot or xAI. · Proyecto no oficial, sin relación con Grok Bot ni con xAI.
