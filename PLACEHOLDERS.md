# Lo que falta por rellenar · What's left to fill in

Ya está puesto · Already set: dominio **https://contextbot.app**, X **[@SoyAnaDev](https://x.com/SoyAnaDev)** y **[@contextbotapp](https://x.com/contextbotapp)**, GitHub **[AnaGuiDev/context-bot](https://github.com/AnaGuiDev/context-bot)**, Buy Me a Coffee **[soyanadev](https://buymeacoffee.com/soyanadev)**.
Quedan **un dato** y una fecha. · **One detail** and a date are left.

| # | Dato · Detail | Marcador · Marker | Cómo · How |
|---|---|---|---|
| 1 | Enlace de la plantilla · Template link | `TODO_TEMPLATE_URL` | `--template "https://…"` (ver · see [templates/context-bot-template.md](templates/context-bot-template.md)) |
| 2 | Fecha de la v0.2.0 · v0.2.0 date | `AAAA-MM-DD` en `CHANGELOG.md` | a mano · by hand |

Nombre sugerido del repositorio · Suggested repo name: **`context-bot`**.

## De una vez · All at once

```bash
bash scripts/rellenar-placeholders.sh --prueba --bmc usuario --template "https://…"   # mira qué cambiaría · dry run
bash scripts/rellenar-placeholders.sh          --bmc usuario --template "https://…"   # lo cambia · apply
```

- Puedes pasar solo lo que ya tengas y repetirlo luego. · You can pass only what you have and run it again later.
- Al terminar te dice si queda algún marcador. · It tells you if any marker is left.
- La fecha del CHANGELOG se cambia a mano el día que publiques. · Change the CHANGELOG date by hand on launch day.
- Los comentarios `TODO(PLACEHOLDER)` son solo avisos. · `TODO(PLACEHOLDER)` comments are just reminders.

## A mano · By hand

```bash
git grep -n "TODO_BMC\|TODO_TEMPLATE_URL\|AAAA-MM-DD"
```

Los textos de la web están en `src/i18n.py` (inglés y español). · Website copy lives in `src/i18n.py` (English and Spanish).
El correo noreply de los commits es orientativo; el real está en GitHub → Settings → Emails. · The noreply email is a guess; the real one is under GitHub → Settings → Emails.
