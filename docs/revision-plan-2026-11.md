# Revisión del plan de mejora — 11 de noviembre de 2026

Se revisó «Context Bot · Plan de mejora completo» sobre main `984049e`. Se aplican los cambios siguientes en PRs por fase, sin merge, despliegue, DNS ni actualización de las plantillas alojadas en Grok. La prioridad del producto sigue siendo reducir contexto innecesario y proteger el uso; velocidad es secundaria.

| Fase | Decisión y resultado |
|---|---|
| 0 — base | Aplicada. CI web/worker en un job, comprobación ES/EN/script tras publicación, lockfile corregido. npm 11 no reprodujo el fallo; Node 22/npm 10 del CI sí: faltaba el peer opcional workers-types 5 del plugin de Vitest. Se añade ese registro sin actualizar dependencias directas ni quitar metadatos de otras plataformas. |
| 1 — separar skills | Aplazada. Puede reducir instrucciones cargadas, pero hay que medir cómo Grok carga skills opcionales y comprobar instalación/actualización. Fragmentarlas sin esa evidencia puede ocultar funciones. Las skills y sus bloques permanecen intactos. |
| 2 — semáforo | Aplazada conforme al valor por defecto D1. No sustituir porcentajes no calibrados por otro umbral igualmente no medido. Hace falta validar señales y pérdida de información con conversaciones reales. La portada no muestra porcentajes. |
| 3 — versión e instalación inmutable | Aplazada junto con la separación: hace falta definir y publicar una versión real. No crear una 0.3.0 ni rebajar el worker 1.0.0 solo para igualar etiquetas. |
| 4 — seguridad web | Aplicados CSP por página/alias con hashes del HTML real, restricción de ?live y bases guardadas, y cabeceras del script. Se conserva TTL de tokens: reducirlo no corrige el destino externo y podría interrumpir conexiones. No se borran configuraciones de otros alojamientos. |
| 5 — worker | Aplicados nombres con puntuación/acento, delete_bot con confirmación, aislamiento e idempotencia, errores HTTP/JSON/red de GitHub controlados y registro OAuth limitado por IP. Se conservan usage_share y versiones por compatibilidad. Consentimiento bilingüe y REST de borrado individual quedan fuera: MCP ya resuelve el bloqueo de 20 bots sin ampliar superficies. |
| 6 — claridad | Aplicados privacidad precisa ES/EN, compartir sin garantías, prompt MCP ES, eliminación del botón X duplicado, instalación existente antes de plantilla, introducción más corta y objetivos táctiles de 44 px. Se mantienen los tres botones coherentes acordados con Marc. No se cambian imágenes ni se inventan capturas o resultados; no se acorta toda la página. |
| 7 — documentación | Aplicados generación/check de consejos, inclusión de los párrafos de informes recurrentes que el generador anterior omitía, comentarios corregidos, alojamiento actual y este registro. No se mueve documentación interna. |
| 8 — validación humana | Pendiente. No se simulan mediciones ni entrevistas. Probar migración, memoria, rutina/Page y errores; medir uso real antes/después y activación antes de prometer resultados. |

## Fuentes revisadas

No se adopta la sospecha de que los enlaces de Cursor son necesariamente ajenos a Grok Bot. Comprobados el 11 de noviembre:

- [Routines](https://cursor.com/help/grok-bot/routines): la página trata explícitamente Grok Bot y explica pausas, frecuencia, disparadores y que Test realiza trabajo real y consume uso.
- [Context window and token accumulation](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540): la respuesta de Mohit del 14 de septiembre describe relectura del historial, tokens mayoritariamente en caché y duplicación con conversación vacía. Eso no prueba un porcentaje de ahorro ni un coste idéntico para cada mensaje.

Se conservan esas referencias. Esta comprobación no equivale a validar todas las afirmaciones del foro ni a medir Context Bot con usuarios.

## Evidencias y límites

- `npm ci` con npm 10, typecheck y 20 pruebas worker pasan localmente; pruebas de errores de GitHub, confirmación, aislamiento y límites incluidas.
- Build offline ES/EN, 3 contratos Python, 15 pruebas JS, hashes CSP y sincronización de consejos pasan.
- Se mantienen metadatos y contenido de ambas skills, y no se versiona dist/.
- No hay validación visual acreditada: Chromium local no se pudo iniciar (`socket() failed: Operation not permitted`). Revisar móvil/escritorio y comportamiento real de CSP en una vista previa antes de publicar.
- La restricción de servidor permite el conector oficial y loopback HTTP para desarrollo. Otros conectores propios requieren un cambio explícito de configuración, no un enlace arbitrario.
- Registro OAuth: límite compartido por IP, hash por ventana almacenado en D1 y limpieza diaria de contadores antiguos. No equivale a anonimización ni a protección ilimitada frente a abuso distribuido.
- Los tests no acreditan el OAuth real con GitHub/Grok ni una migración real. El worker debe publicarse por separado de la web cuando se decida hacerlo.

## Orden de revisión

[PR 7](https://github.com/AnaGuiDev/context-bot/pull/7) → [PR 8](https://github.com/AnaGuiDev/context-bot/pull/8) → [PR 9](https://github.com/AnaGuiDev/context-bot/pull/9) → [PR 10](https://github.com/AnaGuiDev/context-bot/pull/10) → PR de esta documentación. Cada PR muestra solo su fase respecto a la anterior. Integrar en una rama de revisión y revisar el conjunto antes de llevarlo a main, que publica automáticamente la web. No fusionar cada fase a main sin planificar esa publicación.
