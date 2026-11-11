# Registro de cambios

Todos los cambios importantes de este proyecto se apuntan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y las versiones siguen [SemVer](https://semver.org/lang/es/).

## [Sin publicar]

### Añadido
- CI sin secretos para web y worker, agrupado en un único job; verificación posterior de las dos skills y del script publicado.
- Informes recurrentes / modo solo consulta en la skill ES y EN: misma Page, rutina autorizada reutilizable, avisos con enlace, fallos y última actualización correcta, exportación verificada. Bloque ES recibido íntegro; resto de ambas skills conservado.
- Entrada al panel con ejemplo y primer bot; demo identificada como ilustrativa.
- Pruebas del contrato de publicación y de persistencia local frente a la demo, ejecutadas también antes de desplegar.

### Mejorado
- Portada centrada en un traspaso revisable: bot existente primero, demo visible y funciones opcionales plegadas, conservando la identidad visual.
- Ahorro y velocidad sin garantías; sin porcentajes de contexto en la portada; distinción entre resumen y eliminación del historial.
- Privacidad diferenciada entre modo local y conector opcional; textos de plantilla preparados para publicar en Grok por separado.

### Corregido
- Conector: nombres habituales con acentos y puntuación, borrado individual con confirmación, límite de registros OAuth y errores seguros cuando GitHub no responde correctamente.
- El panel solo acepta el conector oficial o un servidor local; elimina destinos guardados no permitidos. CSP generada por página con hashes de los scripts y cabeceras explícitas para savings-scan.sh.
- La edición de STATUS y del traspaso en la demo ya no sobrescribe los bots guardados en local.
- El estado en directo no inicializa ni modifica configuración en modo demo.
- Elementos ocultos del panel respetan `hidden` incluso cuando tienen estilos de cuadrícula.

## [0.2.0] - 2026-11-04

### Resumen
- **Suite completa:** Context Bot, Context Bot Migrator y Context Bot Lite, gratis y de código abierto, con web bilingüe (EN/ES) y panel.
- **Plantilla Context Bot** lista para añadir desde Grok Bot.
- **Modo ahorro con scripts:** log de tareas, `savings-scan.sh` (https://contextbot.app/savings-scan.sh) y revisión barata del texto de las rutinas; solo sugerencias, nada cambia sin permiso.
- **Context Bot Migrator:** paso a un bot nuevo en cinco etapas (inventario, traspaso revisado, bot nuevo tras un sí, checklist con rutinas en pausa y vuelta atrás). Retoma donde lo dejaste.
- **Vídeo nuevo** de presentación en la web (EN/ES).
- **Context Bot Lite:** solo semáforo y `STATUS.md`, revisión cada ~20 mensajes; en rojo sugiere el Migrator. Plantilla próximamente.
- **Chequeo de un minuto** (`#check` en la web): un prompt para saber el color de cualquier Grok Bot.
- Imagen social nueva para el repositorio (`assets/social-preview.png`), descripciones de plantillas (`docs/template-descriptions.md`) y topics en GitHub.

### Añadido
- Conector MCP opcional de estado en directo en `worker/` (Cloudflare Workers, OAuth con GitHub, D1/KV), con 5 herramientas, entre ellas `delete_my_data`, y pruebas. Guías: `docs/conector.md` y `docs/despliegue-worker.md`.
- Panel: botón «Conectar estado en directo». Si no conecta, el panel sigue usando los datos locales.
- Vista **Traspaso / Handoff** en el panel: elige un bot en amarillo o rojo, mira cómo pasan su memoria, tareas, archivos y rutinas al bot nuevo, y copia o descarga el `TRASPASO.md`. También puedes pegar un `TRASPASO.md` para verlo. Respeta «reducir movimiento».
- Publicaciones de lanzamiento en inglés y en español, y pasos para Cloudflare Registrar + Cloudflare Pages en `docs/publicar.md`.
- Página principal: semáforo interactivo en la cabecera (cambia solo de color, se puede pausar y se queda quieto con «reducir movimiento»), sección «antes y después», las tres luces contadas como historia y bloque de apoyo con GitHub, Buy Me a Coffee y propinas en X.
- Cuenta del proyecto en X, [@contextbotapp](https://x.com/contextbotapp), en el pie de la web, los metadatos (`twitter:site`) y los README.
- Datos estructurados (JSON-LD `SoftwareApplication`) en la página principal, sin valoraciones ni cifras.
- `assets/brand/og-card.html`: fuente de las imágenes para redes, para regenerarlas con Chrome sin dependencias.
- `MARKETING-REVIEW.md`: revisión de la web, el vídeo y el marketing, con plan de lanzamiento.

### Cambiado
- **Historia de la plantilla, lista para cuando haya enlace**: con el enlace público de la plantilla, la web cuenta la instalación como «1. Añade Context Bot desde la plantilla, 2. charla como siempre, 3. en rojo, migra con Context Bot Migrator», con «¿Ya tienes un bot? Pega este prompt» como segunda opción, una pregunta nueva «¿Plantilla o prompt?» y avisos en el panel. Sin enlace, sigue el flujo del prompt. `rellenar-placeholders.sh --template` cambia también los README y las guías de instalación, y `CB_TEMPLATE=https://… bash scripts/build-site.sh` deja probar la web así sin tocar archivos.
- El vídeo de la demo sube justo después de la cabecera, con el póster adecuado desde el principio (sin descargar los dos).
- **Diseño alternativo «viaje por carretera»** (propuesta): papel cálido y asfalto, letra de señal de autopista (Overpass) con notas a mano (Caveat), un semáforo de verdad que cambia al bajar por la página y un bot conductor que se va cansando. Vuelve el vídeo en reproducción automática, sin sonido y en bucle (no arranca con «reducir movimiento»).
- **Nuevo nombre: Context Bot** (antes «Control de Contexto»), con dominio `contextbot.app`. La carpeta de la skill pasa de `skills/control-de-contexto/` a `skills/context-bot/` y la skill se llama `context-bot`. Si ya la tenías guardada con el nombre anterior, sigue funcionando; puedes volver a guardarla con el nombre nuevo.
- Web bilingüe: inglés en `/` y español en `/es/`, con `hreflang`, selector EN/ES que se recuerda y detección del idioma del navegador. La web se genera desde `src/` con `scripts/build_site.py`.
- README principal en inglés (`README.md`) y en español (`README.es.md`). Guías en inglés en `docs/en/`.
- El panel guarda en `context-bot:*` y recupera los datos guardados con el nombre anterior.
- **Nueva imagen**: fondo azul marino y morado con las luces del semáforo brillando, como el banner y el avatar nuevos de X. La página, el panel, la privacidad y la 404 comparten los mismos estilos (`src/templates/_brand.html`).
- Titular nuevo, más directo: «Long chats make your bot slow & pricey. Keep it fast & cheap.» / «Charla larga, bot lento y caro. Mantenlo rápido y barato.».
- El botón principal copia el prompt de instalación y el secundario lleva a GitHub; el prompt también se ve entero en el paso 1.
- Imágenes para redes, favicon e icono de Apple con el nuevo estilo. Títulos y descripciones nuevos para buscadores y redes.
- README en inglés y en español rehechos como portada del repositorio: instalación en un bloque copiable, antes y después, insignia de estrellas y preguntas sobre privacidad.
- `.github/FUNDING.yml` usa la clave nativa `buy_me_a_coffee`.

### Añadido
- Procedimiento de **Traspaso** y **arranque** en la skill: la memoria viaja en un archivo `TRASPASO.md` (memoria duradera, estado, archivos, rutinas y resumen), sin credenciales.
- `examples/TRASPASO.md.example`, guía de migración, prompt del coordinador, README y paso 3 de la landing actualizados.
- Truco pendiente: rutinas con scripts (sin respaldo oficial todavía).
- Sección «Trucos para gastar menos» en la landing y guía `docs/tips-ahorro.md` con fuentes.
- `docs/tips-pendientes.md` con ideas aún sin verificar.
- Panel «Revisa tus rutinas» en el dashboard, con semáforo, sugerencias, datos de ejemplo (`?demo`) y exportación/importación junto a los bots.
- Web estática lista para publicar: `scripts/build-site.sh` genera `dist/` con la página en la raíz y el panel en `/dashboard/`.
- Favicon, imagen para redes (Open Graph y tarjeta de X), página de privacidad, 404, `robots.txt` y `sitemap.xml`.
- Configuración de despliegue para GitHub Pages, Netlify, Vercel y Cloudflare Pages, con guía en `docs/publicar.md`.
- `scripts/rellenar-placeholders.sh` para poner dominio, X, Buy Me a Coffee y usuario de GitHub de una vez.
- `SECURITY.md`, plantilla de pull request, `README.en.md` y kit de lanzamiento (`docs/lanzamiento.md`).
- Botón «Probar el panel» en la página principal.
- Vídeo promocional con controles propios en la landing y opciones de apoyo (Buy Me a Coffee y Propinas en X).

### Cambiado
- La guía de migración y la skill aclaran que al duplicar un bot no se copia la memoria aprendida: el STATUS debe ir en un archivo.
- La fuente Nunito se sirve desde la propia web (sin Google Fonts): ninguna petición a terceros.
- Mejor contraste de los botones en modo claro y botones del panel con `type` explícito.
- El formato de exportación pasa a `{ version, bots, rutinas }`; se siguen aceptando listas antiguas.

## [0.1.0] - 2026-11-03

### Añadido
- Skill `control-de-contexto` para que el bot vigile el tamaño de la conversación y mantenga un `STATUS.md`.
- Panel (`dashboard/index.html`) con semáforo verde / amarillo / rojo, sin servidor, guardado en el navegador.
- Prompt del bot coordinador (`prompts/bot-coordinador.md`).
- Ejemplo de `STATUS.md`.
- Guías de instalación y de migración.
- Página de presentación (`landing/index.html`).

[Sin publicar]: https://github.com/AnaGuiDev/context-bot/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/AnaGuiDev/context-bot/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/AnaGuiDev/context-bot/releases/tag/v0.1.0
