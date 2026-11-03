#!/usr/bin/env bash
# Rellena de una vez los datos pendientes (Buy Me a Coffee, enlace de la plantilla del bot y usuario de GitHub).
# El dominio ya está puesto (contextbot.app); --dominio solo sirve para marcadores TODO-DOMINIO antiguos.
#
# Uso:
#   bash scripts/rellenar-placeholders.sh \
#     --bmc ana_gui \
#     --template https://x.ai/... \
#     --github ana-gui
#
# Opciones:
#   --dominio   (Obsoleto) Dominio sin https://, solo para marcadores TODO-DOMINIO
#   --x         Usuario de X sin @ (ya puesto: SoyAnaDev; solo para marcadores TODO_ANA_GUI antiguos)
#   --template  Enlace público de la plantilla del bot (Share → Create a copy → Publish → Copy link)
#   --bmc       Usuario de Buy Me a Coffee o URL completa (https://buymeacoffee.com/...)
#   --github    Usuario u organización de GitHub (por defecto: ana-gui)
#   --prueba    Solo muestra qué archivos cambiaría, sin tocar nada
#
# Puedes ejecutarlo varias veces: cada vez solo cambia lo que siga pendiente.
# Excepción: --github también cambia «ana-gui» si ya lo habías puesto antes.
set -euo pipefail
cd "$(dirname "$0")/.."

DOMINIO="" XUSER="" BMC="" TPL="" GH="ana-gui" PRUEBA=0
while [ $# -gt 0 ]; do
  case "$1" in
    --dominio) DOMINIO="${2:-}"; shift 2 ;;
    --x) XUSER="${2:-}"; shift 2 ;;
    --bmc) BMC="${2:-}"; shift 2 ;;
    --template) TPL="${2:-}"; shift 2 ;;
    --github) GH="${2:-}"; shift 2 ;;
    --prueba) PRUEBA=1; shift ;;
    -h|--help) sed -n '2,21p' "$0"; exit 0 ;;
    *) echo "Opción desconocida: $1 (usa --help)" >&2; exit 1 ;;
  esac
done

# Limpieza y validación
DOMINIO="${DOMINIO#https://}"; DOMINIO="${DOMINIO#http://}"; DOMINIO="${DOMINIO%/}"
XUSER="${XUSER#@}"; XUSER="${XUSER#https://x.com/}"
BMC="${BMC#https://buymeacoffee.com/}"; BMC="${BMC#https://www.buymeacoffee.com/}"; BMC="${BMC%/}"
[ -n "$DOMINIO" ] && ! [[ "$DOMINIO" =~ ^[a-z0-9.-]+\.[a-z]{2,}$ ]] && { echo "Dominio no válido: $DOMINIO" >&2; exit 1; }
[ -n "$XUSER" ] && ! [[ "$XUSER" =~ ^[A-Za-z0-9_]{1,15}$ ]] && { echo "Usuario de X no válido: $XUSER" >&2; exit 1; }
TPL_RE='^https://[A-Za-z0-9./?=_%&~+-]+$'
[ -n "$TPL" ] && ! [[ "$TPL" =~ $TPL_RE ]] && { echo "Enlace de plantilla no válido (debe empezar por https://): $TPL" >&2; exit 1; }
[ -n "$BMC" ] && ! [[ "$BMC" =~ ^[A-Za-z0-9_.-]+$ ]] && { echo "Usuario de Buy Me a Coffee no válido: $BMC" >&2; exit 1; }
! [[ "$GH" =~ ^[A-Za-z0-9-]+$ ]] && { echo "Usuario de GitHub no válido: $GH" >&2; exit 1; }
if [ -z "$DOMINIO$XUSER$BMC$TPL" ] && [ "$GH" = "ana-gui" ]; then
  echo "No has indicado nada que rellenar. Usa --help." >&2; exit 1
fi

# Archivos de texto del repositorio (sin binarios, sin este script ni las guías de placeholders)
mapfile -t FILES < <(git ls-files | grep -Ev '\.(png|jpg|jpeg|gif|mp4|woff2|ico)$' \
  | grep -Ev '^(scripts/rellenar-placeholders\.sh|PLACEHOLDERS\.md|NEXT-STEPS\.md)$')

export DOMINIO XUSER BMC TPL GH
CAMBIADOS=()
for f in "${FILES[@]}"; do
  [ -f "$f" ] || continue
  nuevo="$(perl -0pe '
    my ($d,$x,$b,$t,$g)=@ENV{qw(DOMINIO XUSER BMC TPL GH)};
    if ($d ne "") { my $dd=$d; $dd=~s/-/--/g; s/TODO--DOMINIO/$dd/g; s/TODO-DOMINIO/$d/g; }
    if ($b ne "") { s{buymeacoffee\.com/TODO_(?:ANA_GUI|BMC)}{buymeacoffee.com/$b}g; }
    if ($t ne "") { s{TODO_TEMPLATE_URL}{$t}g; }
    if ($x ne "") { s/TODO_ANA_GUI/$x/g; }
    if ($g ne "ana-gui") {
      s{ana-gui/context-bot}{$g/context-bot}g;
      s{ana-gui\.github\.io}{$g.github.io}g;
      s{\*\*ana-gui\*\*}{**$g**}g;
      s{ana-gui\@users\.noreply}{$g\@users.noreply}g;
    }
  ' "$f")"
  if [ "$nuevo" != "$(cat "$f")" ]; then
    CAMBIADOS+=("$f")
    [ "$PRUEBA" = 1 ] || printf '%s\n' "$nuevo" > "$f"
  fi
done

[ "$PRUEBA" = 1 ] && echo "Modo prueba: se cambiarían ${#CAMBIADOS[@]} archivos:" || echo "Cambiados ${#CAMBIADOS[@]} archivos:"
printf '  %s\n' "${CAMBIADOS[@]}"

echo
echo "Pendiente tras este paso:"
pend="$(git grep -nE 'TODO-DOMINIO|TODO--DOMINIO|TODO_ANA_GUI|TODO_BMC|TODO_TEMPLATE_URL' -- ':!scripts/rellenar-placeholders.sh' ':!PLACEHOLDERS.md' ':!NEXT-STEPS.md' 2>/dev/null || true)"
[ "$PRUEBA" = 1 ] && pend="(modo prueba: no se comprueba)"
if [ -z "$pend" ]; then
  echo "  Nada. ✔ Quedan los comentarios TODO(PLACEHOLDER), que puedes borrar o dejar."
  echo "  Siguiente: bash scripts/build-site.sh y revisa dist/. Luego haz commit."
else
  echo "$pend"
fi
