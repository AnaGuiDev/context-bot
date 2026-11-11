# Revisión del plan de mejora — 11 de noviembre de 2026

Se revisó «Context Bot · Plan de mejora completo» sobre main `984049e`. Se aplican los cambios siguientes en PRs por fase, sin merge, despliegue, DNS ni actualización de las plantillas alojadas en Grok. La prioridad del producto sigue siendo reducir contexto innecesario y proteger el uso; velocidad es secundaria.

| Fase | Decisión y resultado |
|---|---|
| 0 — base | Aplicada. CI web/worker en un job, comprobación ES/EN/script tras publicación, lockfile corregido. npm 11 no reprodujo el fallo; Node 22/npm 10 del CI sí: faltaba el peer opcional workers-types 5 del plugin de Vitest. Se añade ese registro sin actualizar dependencias directas ni quitar metadatos de otras plataformas. |
| 1 — separar skills | Aplazada. Puede reducir instrucciones cargadas, pero hay que medir cómo Grok carga skills opcionales y comprobar instalación/actualización. Fragmentarlas sin esa evidencia puede ocultar funciones. Las skills y sus bloques permanecen intactos. |
| 2 — semáforo | Aplazada conforme a la decisión D1 del plan (no es la base de datos D1 de Cloudflare). No sustituir porcentajes no calibrados por otro umbral igualmente no medido. Hace falta validar señales y pérdida de información con conversaciones reales. La portada no muestra porcentajes. |
| 3 — versión e instalación inmutable | Aplazada junto con la separación: hace falta definir y publicar una versión real. No crear una 0.3.0 ni rebajar el worker 1.0.0 solo para igualar etiquetas. |
| 4 — seguridad web | Aplicados CSP por página/alias con hashes del HTML real, restricción de ?live y bases guardadas, y cabeceras del script. Se conserva TTL de tokens: reducirlo no corrige el destino externo y podría interrumpir conexiones. No se borran configuraciones de otros alojamientos. |
| 5 — worker | Aplicados nombres con puntuación/acento, delete_bot con confirmación, aislamiento e idempotencia, errores HTTP/JSON/red de GitHub controlados y registro OAuth limitado por IP. Se conservan usage_share y versiones por compatibilidad. Consentimiento bilingüe y REST de borrado individual quedan fuera: MCP ya resuelve el bloqueo de 20 bots sin ampliar superficies. |
| 6 — claridad | Aplicados privacidad precisa ES/EN, compartir sin garantías, prompt MCP ES, eliminación del botón X duplicado, instalación existente antes de plantilla, introducción más corta y objetivos táctiles de 44 px. Se mantienen los tres botones coherentes acordados con el propietario. No se cambian imágenes ni se inventan capturas o resultados; no se acorta toda la página. |
| 7 — documentación | Aplicados generación/check de consejos, inclusión de los párrafos de informes recurrentes que el generador anterior omitía, comentarios corregidos, alojamiento actual y este registro. No se mueve documentación interna. |
| 8 — validación humana | Pendiente. No se simulan mediciones ni entrevistas. Probar migración, memoria, rutina/Page y errores; medir uso real antes/después y activación antes de prometer resultados. La revisión de código posterior está en la sección «Fase 8 — revisión», más abajo; no sustituye esta validación. |

## Fuentes revisadas

No se adopta la sospecha de que los enlaces de Cursor son necesariamente ajenos a Grok Bot. Comprobados el 11 de noviembre:

- [Routines](https://cursor.com/help/grok-bot/routines): la página trata explícitamente Grok Bot y explica pausas, frecuencia, disparadores y que Test realiza trabajo real y consume uso.
- [Context window and token accumulation](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540): la respuesta de Mohit del 14 de septiembre describe relectura del historial, tokens mayoritariamente en caché y duplicación con conversación vacía. Eso no prueba un porcentaje de ahorro ni un coste idéntico para cada mensaje.

Se conservan esas referencias. Esta comprobación no equivale a validar todas las afirmaciones del foro ni a medir Context Bot con usuarios.

## Evidencias y límites

- `npm ci` con npm 10, typecheck y 21 pruebas worker pasan localmente; incluyen NFC, `existed`, el cupo por IP y el tope global.
- Build offline ES/EN, 3 contratos Python, 15 pruebas JS, hashes CSP y sincronización de consejos pasan.
- Se mantienen metadatos y contenido de ambas skills, y no se versiona dist/.
- No hay validación visual acreditada: Chromium local no se pudo iniciar (`socket() failed: Operation not permitted`). Revisar móvil/escritorio y comportamiento real de CSP en una vista previa antes de publicar.
- La restricción de servidor permite el conector oficial y loopback HTTP para desarrollo. Otros conectores propios requieren un cambio explícito de configuración, no un enlace arbitrario.
- Registro OAuth: 120 por hora e IP y 1000 por hora en total. El contador es SHA-256 de hora e IP, sin sal, en la base D1 (aquí sí es la base de datos), con limpieza diaria. No es anonimización. HMAC queda fuera porque exigiría un secreto nuevo o reutilizar el de GitHub.
- Los tests no acreditan el OAuth real con GitHub/Grok ni una migración real. El worker debe publicarse por separado de la web cuando se decida hacerlo.

## Orden de revisión

[PR 7](https://github.com/AnaGuiDev/context-bot/pull/7) → [PR 8](https://github.com/AnaGuiDev/context-bot/pull/8) → [PR 9](https://github.com/AnaGuiDev/context-bot/pull/9) → [PR 10](https://github.com/AnaGuiDev/context-bot/pull/10) → PR de la fase 7 → PR de la fase 8, con base `plan/fase-7-documentacion`. Cada PR muestra solo su fase respecto a la anterior. Integrar en una rama de revisión y revisar el conjunto antes de llevarlo a main, que publica automáticamente la web. No fusionar cada fase a main sin planificar esa publicación.

## Fase 8 — revisión

Aplicado en la rama `plan/fase-8-revision`, sin fusionar, sin publicar la web y sin desplegar el worker.

| Punto | Resultado |
|---|---|
| 1. Límite de registro | Aplicado. 120 por hora e IP y 1000 por hora en total. El cupo de la IP se comprueba antes, así un exceso de una IP no gasta el tope global. Documentado en el conector ES/EN. |
| 2. Pages sin crear proyecto | Aplicado. Si `context-bot` no existe, el workflow termina. Tras publicar compara `https://contextbot.app/` con `dist/index.html`, además de las skills y el script en `*.pages.dev`. |
| 3. No publicar si fallan las pruebas | Aplicado en el mismo job, antes del despliegue: cabeceras, `gen-tips --check`, pruebas JS y la suite del worker. `cloudflare/wrangler-action` queda en el commit `953926a2e2182532811c01a25e53647d93bf07c0` (v4.1.3). |
| 4. Nota de despliegue | Aplicado en `docs/conector.md`, `docs/en/connector.md` y las guías de despliegue. Los consejos de ahorro no describen `delete_bot` ni este límite, así que no se les añade esa nota. |
| 5. Semáforo | Aplicado sin cambiar umbrales. La tabla de porcentajes sigue en las skills de Context Bot y Lite (ES/EN) y ahora dice que orienta el color y no es una medida. |
| 6. FAQ de la plantilla | Aplicado. `a2_tpl` nombra «Instalar en mi bot actual» y después «Empezar un bot nuevo». Corregido el comentario de `landing.html`. |
| 7. Uso antes que velocidad | Aplicado en apoyo, carretera, README ES/EN y los borradores de hilo que repetían «tarde lenta» o ponían la lentitud primero. Ana sigue antes que Context Bot en el apoyo. No hay cifras nuevas. |
| 8. Privacidad | Aplicado en `a5`, `s4_p`, la nota local del panel y los README: ID numérico de GitHub y notas breves. Ya no dicen que el panel lo guarda todo en el navegador. |
| 9. 44 px | Aplicado en `.copy-code`, `.tl-toggle` y los botones del panel (estaban a 42 px). Los controles «Quitar» siguen siendo texto, por debajo de 44 px: subirlos deformaría la fila. |
| 10. `delete_bot` y NFC | Aplicado. La respuesta incluye `existed`. El nombre se normaliza a NFC antes de validar y de guardar, así la forma compuesta y la descompuesta son el mismo bot. |
| 11. HMAC | No aplicado. Hace falta una clave. No se crea un secreto nuevo. No se reutiliza `GITHUB_CLIENT_SECRET`, porque rotarla cambiaría los contadores y pondría esa credencial en el registro anónimo. Una clave en el código no sería un secreto. Queda documentado junto al hash sin sal. |
| 12. Decisión D1 y Account ID | Aplicado. «Valor por defecto D1» pasa a «decisión D1 del plan», distinta de la base de datos. El Account ID sale de NEXT-STEPS y se queda en el workflow, que lo necesita. |
| Nombre del propietario | Sustituido en el árbol. No se reescribe el historial. |

Sigue sin hacerse aquí: OAuth real con Grok, despliegue del worker, render visual de la CSP y la validación humana de la fase 8 del plan.
