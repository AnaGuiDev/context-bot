# Lo que falta por rellenar · What's left to fill in

El dominio ya está puesto: **https://contextbot.app** (`src/static/CNAME`). Quedan **tres datos** y una fecha.
The domain is already set: **https://contextbot.app** (`src/static/CNAME`). **Three details** and a date are left.

| # | Dato · Detail | Marcador · Marker | Ejemplo · Example |
|---|---|---|---|
| 1 | Usuario de X · X username | `TODO_ANA_GUI` (en `x.com/…` y `@…`) | `ana_gui` |
| 2 | Buy Me a Coffee | `buymeacoffee.com/TODO_ANA_GUI` | `ana_gui` o la URL completa · or the full URL |
| 3 | Usuario de GitHub · GitHub user | `ana-gui` (en `github.com/ana-gui/context-bot`, `ana-gui.github.io` y el correo noreply) | `ana-gui` (déjalo si es ese · keep it if it is) |
| 4 | Fecha de la v0.2.0 · v0.2.0 date | `AAAA-MM-DD` en `CHANGELOG.md` | `2026-11-10` |

Nombre sugerido del repositorio · Suggested repo name: **`context-bot`**.

## De una vez · All at once

```bash
bash scripts/rellenar-placeholders.sh --prueba --x ana_gui --bmc ana_gui --github ana-gui   # mira qué cambiaría · dry run
bash scripts/rellenar-placeholders.sh          --x ana_gui --bmc ana_gui --github ana-gui   # lo cambia · apply
```

- Puedes pasar solo lo que ya tengas y repetirlo luego. · You can pass only what you have and run it again later.
- Al terminar te dice si queda algún marcador. · It tells you if any marker is left.
- La fecha del CHANGELOG se cambia a mano el día que publiques. · Change the CHANGELOG date by hand on launch day.
- Los comentarios `TODO(PLACEHOLDER)` son solo avisos. · `TODO(PLACEHOLDER)` comments are just reminders.

## A mano · By hand

```bash
git grep -n "TODO_ANA_GUI\|ana-gui\|AAAA-MM-DD"
```

Los textos de la web están en `src/i18n.py` (inglés y español). · Website copy lives in `src/i18n.py` (English and Spanish).
El correo `ana-gui@users.noreply.github.com` es orientativo; el real está en GitHub → Settings → Emails. · The noreply email is a guess; the real one is under GitHub → Settings → Emails.
