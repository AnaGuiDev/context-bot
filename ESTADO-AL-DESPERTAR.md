# Estado al despertar ☀️

¡Buenos días! El paquete está listo para publicar. **No se ha subido, publicado ni comprado nada**: todo está solo en este repositorio local, en commits firmados como Ana Gui.

## Qué está hecho

- **Vídeos finales** en `assets/video/` (16:9 y 9:16, con portadas y GIF), ya en el repositorio.
- **Web estática**: `bash scripts/build-site.sh` genera `dist/` con la página, el panel en `/dashboard/`, privacidad, 404, `robots.txt`, `sitemap.xml`, favicon, imagen para redes y la fuente Nunito alojada en local (sin Google Fonts ni rastreadores).
- **Revisado**: HTML validado sin errores, sin enlaces rotos, Lighthouse a 100 en rendimiento, buenas prácticas y SEO, y accesibilidad corregida (contraste en modo claro). Probado en escritorio y móvil, modo claro y oscuro.
- **Publicación**: configuración para GitHub Pages (`.github/workflows/pages.yml`), Netlify (`netlify.toml`) y Vercel (`vercel.json`), con la guía paso a paso en [docs/publicar.md](docs/publicar.md).
- **Repositorio pulido**: README en español con índice e insignias, [README.en.md](README.en.md), `SECURITY.md`, plantilla de PR, CHANGELOG y notas de la versión ([docs/notas-v0.2.0.md](docs/notas-v0.2.0.md)).
- **Kit de lanzamiento**: borradores para X, textos para directorios y lista de comprobación en [docs/lanzamiento.md](docs/lanzamiento.md). Son solo borradores: no se ha publicado nada.
- **Marcadores**: un solo script para rellenarlos (abajo) y la lista en [PLACEHOLDERS.md](PLACEHOLDERS.md).

## Qué te toca, en orden

1. **Compra el dominio** que quieras.
2. **Rellena los datos** de una vez:
   ```bash
   bash scripts/rellenar-placeholders.sh --dominio TU-DOMINIO --x TU_USUARIO_X --bmc TU_USUARIO_BMC --github TU_USUARIO_GITHUB
   ```
   Y cambia a mano `AAAA-MM-DD` en `CHANGELOG.md` por la fecha de publicación.
3. **Compila y míralo**:
   ```bash
   bash scripts/build-site.sh && python3 -m http.server -d dist 8000
   ```
   Abre http://localhost:8000 y echa un vistazo a la página y al panel (`/dashboard/?demo`).
4. **Haz commit** de los cambios del paso 2.
5. **Publica** siguiendo [docs/publicar.md](docs/publicar.md): crear el repositorio, subirlo, activar Pages (o Netlify/Vercel), configurar el DNS, activar HTTPS, poner la imagen de redes del repositorio y crear la versión v0.2.0.
6. **Lanza** con [docs/lanzamiento.md](docs/lanzamiento.md) cuando la web ya cargue con tu dominio.

## Puntos flojos conocidos (con sinceridad)

- **Vídeo: el clip del semáforo.** Es el tramo más flojo del vídeo; se entiende, pero se podría mejorar. Los vídeos se dieron por finales tal cual.
- **Traspaso de memoria con BotDuplicator sin probar.** El procedimiento de [examples/TRASPASO.md.example](examples/TRASPASO.md.example) está escrito pero no lo he probado de principio a fin. Tampoco he comprobado si BotDuplicator hace algo distinto de la opción Duplicar que trae Grok Bot. Conviene probarlo una vez antes de anunciarlo.
- **Algunas fuentes son del foro**, de mensajes del equipo, no de la documentación oficial. Están citadas, pero pueden cambiar.
- **El consejo de usar scripts en rutinas está sin verificar**, por eso está aparte en [docs/tips-pendientes.md](docs/tips-pendientes.md) y no en la web.
- **Peso**: cada vídeo ronda los 5,8 MB y el GIF los 4,8 MB. La página carga rápido porque del vídeo solo se descargan los datos básicos hasta que se reproduce, pero el repositorio pesa algo más.
- **Si publicas primero en `usuario.github.io/control-de-contexto/`** (sin dominio propio), la página 404 y algunos enlaces absolutos no funcionarán bien en esa subruta. Con dominio propio va todo bien.
- **Caché y compresión** dependen del servidor; Pages, Netlify y Vercel ya lo hacen bien por defecto.

Proyecto no oficial, sin relación con Grok Bot ni con xAI.
