# Conector de estado en directo (opcional)

> Proyecto no oficial, sin relación con Grok Bot ni con xAI. Context Bot funciona igual de bien **sin** el conector: es solo para quien quiera ver el semáforo de sus bots sin copiarlo a mano.

> **Próximamente (v0.3).** El conector aún no está disponible para usarse; esta guía describe cómo funcionará.

[English](en/connector.md)

## Cómo se conecta

1. Escríbele a tu bot: **«Add this MCP server: https://mcp.contextbot.app/mcp»**.
2. Se abre la página de permiso de Context Bot. Pulsa **Permitir** y entra con GitHub. Solo leemos tu número de usuario de GitHub, sin pedir permisos de repositorios ni de correo.
3. Pídele al bot: «informa de tu estado al conector». La plantilla de Context Bot ya trae esta instrucción en su rutina.
4. En el [panel](https://contextbot.app/es/dashboard/), pulsa **Conectar estado en directo**. El panel se actualiza cada minuto.

## Qué se envía (y qué no)

Cada informe lleva solo esto:

| Campo | Ejemplo | Notas |
|---|---|---|
| `bot_name` | `Viajes` | 1–60 caracteres |
| `colour` | `green` / `yellow` / `red` | |
| `turns` | `85` | estimación del bot |
| `usage_share` | `0.3` | estimación (0–1) |
| `routines_per_day` | `2` | |
| `compacted` | `true` | si ya ha resumido alguna vez |
| `note` | `"listo para traspaso"` | 140 caracteres como máximo, opcional |

**Nunca** se envían tus conversaciones, tus archivos ni tu token de GitHub. Las cifras son estimaciones del propio bot, no datos oficiales.

- El historial se borra automáticamente a los 90 días.
- Puedes tener 20 bots como máximo.
- Se aceptan 30 informes por hora.

## Herramientas

| Herramienta | Para qué sirve |
|---|---|
| `report_status` | Guardar el semáforo actual de un bot |
| `get_status` | Leer el último estado de uno o de todos |
| `list_bots` | Ver los bots que han informado |
| `get_tips` | Consejos para ahorrar contexto (`en` / `es`) |
| `delete_my_data` | Borrar **todo** y revocar el acceso (requiere `confirm: true`) |

También hay una API REST para el panel: `GET /mcp/api/statuses` (con `?history=1` para el historial) y `DELETE /mcp/api/me`. Las dos piden el mismo token OAuth.

## Borrar tus datos

Tienes tres formas de hacerlo:

- Dile al bot: «borra mis datos del conector de Context Bot» (usa `delete_my_data`).
- En el panel, pulsa **Borrar mis datos en directo**.
- Escribe a @SoyAnaDev en X.

El borrado es inmediato y además revoca todos tus tokens.
