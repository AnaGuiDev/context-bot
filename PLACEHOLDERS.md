# Lo que tienes que rellenar al despertar

Solo quedan **cuatro datos** (y una fecha). Todo lo demás ya está hecho.

| # | Dato | Marcador en los archivos | Ejemplo |
|---|------|--------------------------|---------|
| 1 | Tu dominio (cuando lo compres) | `TODO-DOMINIO` | `controldecontexto.com` |
| 2 | Tu usuario de X | `TODO_ANA_GUI` (en `x.com/…` y `@…`) | `ana_gui` |
| 3 | Tu enlace de Buy Me a Coffee | `buymeacoffee.com/TODO_ANA_GUI` | `ana_gui` o la URL completa |
| 4 | Tu usuario de GitHub | `ana-gui` (en `github.com/ana-gui/…`, `ana-gui.github.io` y el correo noreply) | `ana-gui` (déjalo si es ese) |
| 5 | Fecha de la versión 0.2.0 | `AAAA-MM-DD` en `CHANGELOG.md` | `2026-11-04` |

## Cómo rellenarlo todo de una vez

```bash
bash scripts/rellenar-placeholders.sh --prueba \
  --dominio controldecontexto.com --x ana_gui --bmc ana_gui --github ana-gui   # mira qué cambiaría
bash scripts/rellenar-placeholders.sh \
  --dominio controldecontexto.com --x ana_gui --bmc ana_gui --github ana-gui   # lo cambia
```

- Puedes pasar solo los datos que ya tengas y ejecutarlo otra vez más tarde.
- Al terminar te dice si queda algún marcador pendiente.
- También escribe el dominio en `site/CNAME`, así `scripts/build-site.sh` ya lo copiará a `dist/`.
- La fecha del CHANGELOG (punto 5) se cambia a mano el día que publiques.
- Los comentarios `TODO(PLACEHOLDER)` que quedan en el código solo son avisos; puedes borrarlos o dejarlos.

## Dónde aparece cada cosa (por si prefieres hacerlo a mano)

```bash
git grep -n "TODO-DOMINIO\|TODO--DOMINIO\|TODO_ANA_GUI\|ana-gui\|AAAA-MM-DD"
```

Ojo: en la insignia del README el dominio va con guiones dobles (`TODO--DOMINIO`); el script ya lo tiene en cuenta.
El correo `ana-gui@users.noreply.github.com` es orientativo: el de verdad lo ves en GitHub → Settings → Emails (suele empezar por un número).
