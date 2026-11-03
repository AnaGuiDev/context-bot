# Registro de cambios

Todos los cambios importantes de este proyecto se apuntan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y las versiones siguen [SemVer](https://semver.org/lang/es/).

## [0.2.0] - Sin publicar

### Añadido
- Sección «Trucos para gastar menos» en la landing y guía `docs/tips-ahorro.md` con fuentes.
- `docs/tips-pendientes.md` con ideas aún sin verificar.
- Panel «Revisa tus rutinas» en el dashboard, con semáforo, sugerencias, datos de ejemplo (`?demo`) y exportación/importación junto a los bots.
- Vídeo promocional con controles propios en la landing y opciones de apoyo (Buy Me a Coffee y Propinas en X).

### Cambiado
- La guía de migración y la skill aclaran que al duplicar un bot no se copia la memoria aprendida: el STATUS debe ir en un archivo.
- El formato de exportación pasa a `{ version, bots, rutinas }`; se siguen aceptando listas antiguas.

## [0.1.0] - 2026-11-03

### Añadido
- Skill `control-de-contexto` para que el bot vigile el tamaño de la conversación y mantenga un `STATUS.md`.
- Panel (`dashboard/index.html`) con semáforo verde / amarillo / rojo, sin servidor, guardado en el navegador.
- Prompt del bot coordinador (`prompts/bot-coordinador.md`).
- Ejemplo de `STATUS.md`.
- Guías de instalación y de migración con BotDuplicator.
- Página de presentación (`landing/index.html`).
