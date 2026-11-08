# Publicar Context Bot

> Para actualizar el repositorio existente: rama → pruebas → PR → fusión en `main`. El workflow `Publicar web` necesita GitHub Pages habilitado con fuente GitHub Actions. Comprueba la ejecución y compara `/es/skill.md` con `skills/context-bot/SKILL.md`: una fusión no demuestra que el dominio se haya actualizado. La guía de Cloudflare de abajo es una alternativa de alojamiento, no una confirmación de la configuración actual.

Guía paso a paso para subir el repositorio a GitHub y poner la web en `https://contextbot.app` con Cloudflare Registrar y Cloudflare Pages. Sigue el orden: cada paso depende del anterior.

> Antes de nada, rellena los datos pendientes con `scripts/rellenar-placeholders.sh` (lo explica [`PLACEHOLDERS.md`](../PLACEHOLDERS.md)). El dominio ya está puesto.

## 0. Comprueba la web en tu ordenador

```bash
bash scripts/build-site.sh
cd dist && python3 -m http.server 8000
```

Abre <http://localhost:8000> (inglés), <http://localhost:8000/es/> (español) y <http://localhost:8000/dashboard/?demo>. Si todo se ve bien, sigue.

## 1. Crear el repositorio en GitHub como Ana Gui

1. Entra en GitHub con la cuenta **AnaGuiDev** (o la que vayas a usar).
2. Crea un repositorio nuevo: <https://github.com/new>
   - Nombre: `context-bot`
   - Público.
   - **No** marques «Add a README», ni licencia, ni .gitignore (ya los tienes).
3. En tu ordenador, dentro de la carpeta del proyecto:

   ```bash
   git config user.name "Ana Gui"
   git config user.email "AnaGuiDev@users.noreply.github.com"
   git branch -M main
   git remote add origin https://github.com/AnaGuiDev/context-bot.git
   git push -u origin main
   ```

   Con GitHub CLI es un solo comando (hace lo mismo que los pasos 2 y 3):

   ```bash
   gh repo create AnaGuiDev/context-bot --public --source . --remote origin --push \
     --description "Keep your bot fast. A traffic light for long Grok Bot chats: know when to summarise and when to move to a new bot without losing anything."
   ```

4. Comprueba que en GitHub los commits aparecen a nombre de **Ana Gui**.

## 2. Descripción, web y temas

En la página del repositorio, pulsa el engranaje ⚙️ junto a «About»:

- **Description:** Keep your bot fast. A traffic light for long Grok Bot chats: know when to summarise and when to move to a new bot without losing anything.
- **Website:** `https://contextbot.app`.
- **Topics:** `grok-bot`, `ai-agents`, `context-window`, `productivity`, `spanish`, `skill`, `dashboard`, `open-source`.

### Temas sugeridos (GitHub admite hasta 20)

Los temas ayudan a que te encuentren en la búsqueda de GitHub y en las páginas de cada tema. Por orden de importancia:

| Tema | Para qué |
|---|---|
| `grok-bot` | Quien busca cosas para Grok Bot. El más importante. |
| `ai-agents`, `ai-assistant`, `llm` | Búsquedas generales de agentes e IA. |
| `context-window`, `context-management` | El problema exacto que resuelve. |
| `mcp`, `mcp-server` | El conector de estado en directo (`worker/`). |
| `prompt-engineering`, `skill` | La skill y los prompts. |
| `productivity`, `token-usage` | Ahorro de uso y de tiempo. |
| `cloudflare-workers`, `cloudflare-pages` | La parte técnica (web y conector). |
| `dashboard`, `localstorage` | El panel sin servidor. |
| `spanish`, `bilingual` | Que es bilingüe, cosa poco habitual. |
| `open-source` | Genérico, pero suma. |

Son 19. Repasa la lista cada pocos meses: GitHub sugiere temas parecidos en la propia caja de «Topics».

Con GitHub CLI:

```bash
gh repo edit AnaGuiDev/context-bot \
  --homepage "https://contextbot.app" \
  --add-topic grok-bot --add-topic ai-agents --add-topic ai-assistant --add-topic llm \
  --add-topic context-window --add-topic context-management --add-topic mcp --add-topic mcp-server \
  --add-topic prompt-engineering --add-topic skill --add-topic productivity --add-topic token-usage \
  --add-topic cloudflare-workers --add-topic cloudflare-pages --add-topic dashboard --add-topic localstorage \
  --add-topic spanish --add-topic bilingual --add-topic open-source
```

## 2 bis. Avisos de seguridad privados

**Settings → Security → Private vulnerability reporting → Enable.** Así funciona el enlace de [`SECURITY.md`](../SECURITY.md).

## 3. Imagen para redes (social preview)

1. Repositorio → **Settings** → **General** → sección **Social preview**.
2. **Edit** → **Upload an image** → elige `assets/brand/og-image.png` (1200 × 630).

Esto solo se puede hacer desde la web de GitHub.

## 4. Comprar contextbot.app en Cloudflare Registrar

Cloudflare Registrar vende los dominios a precio de coste, sin recargo, y deja el DNS ya en Cloudflare, así que el paso 5 se configura casi solo.

1. Crea una cuenta en <https://dash.cloudflare.com/sign-up> (o entra en la tuya) y activa la verificación en dos pasos (**My Profile → Authentication**).
2. En el panel: **Domain Registration → Register Domains**.
3. Busca `contextbot.app`. Mira el precio del primer año **y el de renovación** antes de seguir.
4. Rellena los datos de contacto. Cloudflare oculta los datos personales del WHOIS sin coste.
5. Paga y confirma. El dominio aparece en **Websites** (o **Domains**) con el DNS ya gestionado por Cloudflare.
6. Recomendado: en **Domain Registration → Manage Domains → contextbot.app**, deja activada la **renovación automática**.

> **Importante: `.app` solo funciona con HTTPS.** Todo el dominio `.app` está en la lista de precarga HSTS de los navegadores: Chrome, Firefox, Safari y Edge nunca abren `http://contextbot.app`, solo `https://`. Hasta que el certificado esté activo (paso 5), la web **no cargará en ningún navegador**. No anuncies nada antes de comprobarlo.

## 5. Publicar la web en Cloudflare Pages

1. Sube antes el repositorio a GitHub (paso 1) con al menos un commit en `main`.
2. Panel de Cloudflare → **Compute → Workers & Pages → Create application**.
3. Cloudflare muestra primero el asistente de Workers. Abajo, pulsa **Looking to deploy Pages? Get started** y luego **Import an existing Git repository → Get started**.
4. **Connect GitHub**. Al autorizar, elige **Only select repositories** y marca solo `context-bot`. Pulsa **Begin setup**.
5. Configura la compilación:
   - **Project name:** `context-bot` (te da `context-bot.pages.dev`).
   - **Production branch:** `main`.
   - **Framework preset:** `None`.
   - **Build command:** `bash scripts/build-site.sh`
   - **Build output directory:** `dist`
6. **Save and Deploy**. Cuando termine, abre `https://context-bot.pages.dev` y `https://context-bot.pages.dev/dashboard/?demo` para comprobarlo.
7. En el proyecto: **Custom domains → Set up a custom domain** → escribe `contextbot.app` → **Continue** → **Activate domain**. Como el dominio ya está en Cloudflare, el registro DNS se crea solo.
8. Repite con `www.contextbot.app`. Para que `www` lleve a la dirección principal: **Rules → Redirect Rules → Create rule → plantilla «Redirect from WWW to root»** (redirección 301, conservando la ruta y la consulta).
9. Espera a que el estado pase de **Initializing** a **Active** (suele tardar unos minutos). Ese es el certificado HTTPS.
10. En **SSL/TLS → Overview** de `contextbot.app`, deja el modo en **Full (strict)**, y en **SSL/TLS → Edge Certificates** activa **Always Use HTTPS**. Con `.app` HSTS ya viene impuesto por el navegador; no hace falta activar nada más.

Notas:
- Cloudflare Pages lee `dist/_headers` (cabeceras de seguridad y caché) y sirve `dist/404.html` en las direcciones que no existen.
- Cada push a `main` vuelve a publicar la web. Las ramas y pull requests reciben una vista previa propia.
- Si usas Cloudflare Pages, **no** actives también GitHub Pages: desactiva el flujo `.github/workflows/pages.yml` (**Actions → Publicar web → ⋯ → Disable workflow**) o bórralo.

## Otras opciones (secundarias)

Usa **solo una** para el mismo dominio. Todas generan la web con `bash scripts/build-site.sh` y publican `dist/`. Con `.app`, comprueba siempre que HTTPS funciona antes de anunciar nada.

### GitHub Pages

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.** El flujo «Publicar web» (`.github/workflows/pages.yml`) se lanza en cada push a `main`.
2. **Settings → Pages → Custom domain:** `contextbot.app` → **Save**. `src/static/CNAME` ya lleva `contextbot.app`.
3. En el DNS de Cloudflare crea los registros de [la documentación de GitHub](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site): cuatro `A` (`185.199.108.153` a `185.199.111.153`), cuatro `AAAA` (`2606:50c0:8000::153` a `2606:50c0:8003::153`) y `CNAME www → AnaGuiDev.github.io`, todos con la nube en gris (**DNS only**).
4. Marca **Enforce HTTPS** en cuanto GitHub lo permita.

> En la dirección provisional `AnaGuiDev.github.io/context-bot/` la 404 y algunos enlaces absolutos fallan porque la web está en una subcarpeta. Con el dominio propio va todo bien.

### Netlify

1. <https://app.netlify.com> → **Add new site → Import an existing project** → elige el repositorio. Netlify lee `netlify.toml`.
2. **Domain management → Add a domain** → `contextbot.app`, y crea en Cloudflare los registros que te indique (con la nube en gris).

### Vercel

1. <https://vercel.com/new> → importa el repositorio. Framework: **Other**. Vercel lee `vercel.json`.
2. **Settings → Domains → Add** → `contextbot.app`, y crea en Cloudflare los registros que te indique (con la nube en gris).

## 6. Primera versión: v0.2.0

1. En `CHANGELOG.md`, comprueba la fecha de la versión (la v0.2.0 ya figura como 2026-11-04, la del tag).
2. Crea la etiqueta y la versión:

   ```bash
   git tag -a v0.2.0 -m "v0.2.0"
   git push origin v0.2.0
   gh release create v0.2.0 --title "v0.2.0 · Primera versión pública" --notes-file docs/notas-v0.2.0.md
   ```

   Sin GitHub CLI: **Releases → Draft a new release**, elige la etiqueta `v0.2.0` y pega el texto de [`docs/notas-v0.2.0.md`](notas-v0.2.0.md).

## 7. Comprobación final

- [ ] La web abre en `https://contextbot.app` con el candado de HTTPS.
- [ ] `https://contextbot.app/dashboard/?demo` y `https://contextbot.app/es/dashboard/?demo` muestran el panel con ejemplos, y el selector EN/ES cambia de idioma.
- [ ] `http://contextbot.app` salta solo a `https://` y `https://www.contextbot.app` lleva a `https://contextbot.app/`.
- [ ] Una dirección inventada (`/no-existe`) muestra la página 404.
- [ ] Al pegar el enlace en X sale la imagen del semáforo (puedes comprobarlo con el [validador de tarjetas](https://cards-dev.x.com/validator) si sigue activo, o publicando un post de prueba privado).
- [ ] Los botones de café y Propinas en X llevan a tus perfiles reales.
