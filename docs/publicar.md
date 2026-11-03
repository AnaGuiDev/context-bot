# Publicar Control de Contexto

Guía paso a paso para subir el repositorio a GitHub y poner la web en tu propio dominio. Sigue el orden: cada paso depende del anterior.

> Antes de nada, rellena los datos pendientes con `scripts/rellenar-placeholders.sh` (lo explica [`ESTADO-AL-DESPERTAR.md`](../ESTADO-AL-DESPERTAR.md)).

## 0. Comprueba la web en tu ordenador

```bash
bash scripts/build-site.sh
cd dist && python3 -m http.server 8000
```

Abre <http://localhost:8000> y <http://localhost:8000/dashboard/?demo>. Si todo se ve bien, sigue.

## 1. Crear el repositorio en GitHub como Ana Gui

1. Entra en GitHub con la cuenta **ana-gui** (o la que vayas a usar).
2. Crea un repositorio nuevo: <https://github.com/new>
   - Nombre: `control-de-contexto`
   - Público.
   - **No** marques «Add a README», ni licencia, ni .gitignore (ya los tienes).
3. En tu ordenador, dentro de la carpeta del proyecto:

   ```bash
   git config user.name "Ana Gui"
   git config user.email "ana-gui@users.noreply.github.com"
   git branch -M main
   git remote add origin https://github.com/ana-gui/control-de-contexto.git
   git push -u origin main
   ```

   Con GitHub CLI es un solo comando (hace lo mismo que los pasos 2 y 3):

   ```bash
   gh repo create ana-gui/control-de-contexto --public --source . --remote origin --push \
     --description "Un semáforo para tus conversaciones con Grok Bot: te avisa cuándo resumir y cuándo pasar a un bot nuevo sin perder nada."
   ```

4. Comprueba que en GitHub los commits aparecen a nombre de **Ana Gui**.

## 2. Descripción, web y temas

En la página del repositorio, pulsa el engranaje ⚙️ junto a «About»:

- **Description:** Un semáforo para tus conversaciones con Grok Bot: te avisa cuándo resumir y cuándo pasar a un bot nuevo sin perder nada.
- **Website:** `https://tu-dominio` (cuando lo tengas).
- **Topics:** `grok-bot`, `ai-agents`, `context-window`, `productividad`, `espanol`, `skill`, `dashboard`, `open-source`.

Con GitHub CLI:

```bash
gh repo edit ana-gui/control-de-contexto \
  --homepage "https://tu-dominio" \
  --add-topic grok-bot --add-topic ai-agents --add-topic context-window \
  --add-topic productividad --add-topic espanol --add-topic skill \
  --add-topic dashboard --add-topic open-source
```

## 2 bis. Avisos de seguridad privados

**Settings → Security → Private vulnerability reporting → Enable.** Así funciona el enlace de [`SECURITY.md`](../SECURITY.md).

## 3. Imagen para redes (social preview)

1. Repositorio → **Settings** → **General** → sección **Social preview**.
2. **Edit** → **Upload an image** → elige `assets/brand/og-image.png` (1200 × 630).

Esto solo se puede hacer desde la web de GitHub.

## 4. Activar GitHub Pages

1. **Settings** → **Pages**.
2. En **Build and deployment → Source**, elige **GitHub Actions**.
3. Ve a la pestaña **Actions**: el flujo «Publicar web» (`.github/workflows/pages.yml`) se lanza en cada push a `main`. Si no ha arrancado, ábrelo y pulsa **Run workflow**.
4. Al terminar, la web queda en `https://ana-gui.github.io/control-de-contexto/`.

> En esa dirección provisional, la página 404 y algunos enlaces absolutos no funcionan bien porque la web está en una subcarpeta. Con tu dominio propio (paso 5) todo funciona.

## 5. Comprar un dominio y apuntarlo

### Comprar

1. Elige un registrador (por ejemplo Cloudflare Registrar, Porkbun, Namecheap o el que prefieras). Compara el precio de **renovación**, no solo el del primer año.
2. Busca un nombre corto. Ideas: `controldecontexto.com`, `controldecontexto.es`, `semaforodebots.com`.
3. Compra solo el dominio. No hacen falta extras de correo ni de alojamiento. Activa la protección de privacidad WHOIS si es gratis.

### Apuntar el DNS a GitHub Pages

En el panel DNS del registrador, crea estos registros (valores oficiales de GitHub Pages, compruébalos en [su documentación](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)):

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `ana-gui.github.io` |

Luego, en GitHub:

1. **Settings → Pages → Custom domain:** escribe tu dominio (`controldecontexto.com`) y pulsa **Save**.
2. Espera a que la comprobación DNS salga en verde (de minutos a unas horas).
3. Marca **Enforce HTTPS** en cuanto se active. GitHub emite el certificado gratis.
4. Recomendado: verifica el dominio en tu cuenta (**Settings de tu perfil → Pages → Add a domain**) para que nadie pueda usarlo en otro repositorio.

> El archivo `site/CNAME` lleva tu dominio cuando ejecutas `rellenar-placeholders.sh`. Con el despliegue por Actions, GitHub usa el dominio que pongas en Settings; el archivo sirve para Netlify/otros y como recordatorio.

## Alternativas a GitHub Pages

Las tres generan la web con `bash scripts/build-site.sh` y publican la carpeta `dist/`. HTTPS es automático y gratis en todas.

### Netlify

1. <https://app.netlify.com> → **Add new site → Import an existing project** → elige el repositorio.
2. Netlify lee `netlify.toml` (comando y carpeta ya puestos). Pulsa **Deploy**.
3. **Domain management → Add a domain** y sigue sus instrucciones DNS (normalmente un CNAME de `www` y un registro A o ALIAS para el dominio raíz).

### Vercel

1. <https://vercel.com/new> → importa el repositorio.
2. Framework: **Other**. Vercel lee `vercel.json`. Pulsa **Deploy**.
3. **Settings → Domains → Add** y crea los registros DNS que te indique.

### Cloudflare Pages

1. Panel de Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
2. Build command: `bash scripts/build-site.sh` · Build output directory: `dist`.
3. **Custom domains → Set up a domain**. Si el dominio está en Cloudflare, el DNS se configura solo.
4. Las cabeceras de `site/_headers` se aplican automáticamente.

Usa **solo una** de las opciones para el mismo dominio.

## 6. Primera versión: v0.2.0

1. En `CHANGELOG.md`, cambia `AAAA-MM-DD` por la fecha de hoy y haz commit.
2. Crea la etiqueta y la versión:

   ```bash
   git tag -a v0.2.0 -m "v0.2.0"
   git push origin v0.2.0
   gh release create v0.2.0 --title "v0.2.0 · Primera versión pública" --notes-file docs/notas-v0.2.0.md
   ```

   Sin GitHub CLI: **Releases → Draft a new release**, elige la etiqueta `v0.2.0` y pega el texto de [`docs/notas-v0.2.0.md`](notas-v0.2.0.md).

## 7. Comprobación final

- [ ] La web abre en `https://tu-dominio` con el candado de HTTPS.
- [ ] `https://tu-dominio/dashboard/?demo` muestra el panel con ejemplos.
- [ ] Una dirección inventada (`/no-existe`) muestra la página 404.
- [ ] Al pegar el enlace en X sale la imagen del semáforo (puedes comprobarlo con el [validador de tarjetas](https://cards-dev.x.com/validator) si sigue activo, o publicando un post de prueba privado).
- [ ] Los botones de café y Propinas en X llevan a tus perfiles reales.
