# Lo que falta por rellenar · What's left to fill in

Ya está puesto · Already set: dominio **https://contextbot.app**, X **[@SoyAnaDev](https://x.com/SoyAnaDev)** y **[@contextbotapp](https://x.com/contextbotapp)**, GitHub **[AnaGuiDev/context-bot](https://github.com/AnaGuiDev/context-bot)**, Buy Me a Coffee **[soyanadev](https://buymeacoffee.com/soyanadev)**.
No queda ningún marcador por rellenar. · No markers left to fill in.

Resuelto · Resolved: `TODO_TEMPLATE_URL` (plantillas x.ai ya puestas · x.ai templates in place) y la fecha de la v0.2.0 en `CHANGELOG.md`: **2026-11-04** (fecha del tag `v0.2.0` · date of the `v0.2.0` tag).

Pendiente aparte · Separate, not a marker: los ids `TODO_*_ID` de `worker/wrangler.toml` siguen sin poner porque el conector MCP está en preparación para la v0.3 (Próximamente · Coming soon).


Nombre sugerido del repositorio · Suggested repo name: **`context-bot`**.

## De una vez · All at once

```bash
bash scripts/rellenar-placeholders.sh --prueba --bmc usuario --template "https://…"   # mira qué cambiaría · dry run
bash scripts/rellenar-placeholders.sh          --bmc usuario --template "https://…"   # lo cambia · apply
```

- Puedes pasar solo lo que ya tengas y repetirlo luego. · You can pass only what you have and run it again later.
- `--template` también cambia los README y las guías de instalación a la versión con plantilla (bloques `TPL-ON` / `TPL-OFF`). La web cambia sola al generarla; para verla antes: `CB_TEMPLATE="https://…" bash scripts/build-site.sh`. · `--template` also switches the READMEs and install docs to the template version; the website switches on its own when built.
- Al terminar te dice si queda algún marcador. · It tells you if any marker is left.
- Los comentarios `TODO(PLACEHOLDER)` son solo avisos. · `TODO(PLACEHOLDER)` comments are just reminders.

## A mano · By hand

```bash
git grep -n "TODO_BMC\|TODO_TEMPLATE_URL"
```

Los textos de la web están en `src/i18n.py` (inglés y español). · Website copy lives in `src/i18n.py` (English and Spanish).
El correo noreply de los commits es orientativo; el real está en GitHub → Settings → Emails. · The noreply email is a guess; the real one is under GitHub → Settings → Emails.
