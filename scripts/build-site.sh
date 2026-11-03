#!/usr/bin/env bash
# Genera la web estática en dist/ (lista para GitHub Pages, Netlify, Vercel o Cloudflare Pages).
# Uso: bash scripts/build-site.sh
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="dist"
rm -rf "$OUT"
mkdir -p "$OUT/dashboard" "$OUT/assets/video"

# Página principal (landing) en la raíz
sed -e 's#\.\./assets/#assets/#g' \
    -e 's#\.\./dashboard/index\.html#dashboard/#g' \
    -e 's#\.\./site/privacidad\.html#privacidad.html#g' \
    landing/index.html > "$OUT/index.html"

# Panel en /dashboard/
sed -e 's#\.\./site/privacidad\.html#../privacidad.html#g' \
    -e 's#\.\./landing/index\.html#../#g' \
    dashboard/index.html > "$OUT/dashboard/index.html"

# Páginas y archivos del sitio
sed -e 's#\.\./assets/#assets/#g' \
    -e 's#\.\./dashboard/index\.html#dashboard/#g' \
    -e 's#\.\./landing/index\.html#./#g' \
    site/privacidad.html > "$OUT/privacidad.html"
cp site/404.html site/robots.txt site/sitemap.xml site/_headers "$OUT/"
# CNAME solo si ya tiene un dominio real
if ! grep -q "TODO-""DOMINIO" site/CNAME; then cp site/CNAME "$OUT/"; fi

# Recursos (solo lo que usa la web; el GIF es para el README)
cp -r assets/brand assets/fonts "$OUT/assets/"
cp assets/video/promo-16x9.mp4 assets/video/promo-9x16.mp4 assets/video/poster.jpg assets/video/poster-9x16.jpg "$OUT/assets/video/"
touch "$OUT/.nojekyll"

# Comprobación: no deben quedar rutas de la estructura de origen
if grep -rn '\.\./site/\|\.\./landing/\|"\.\./assets/' "$OUT/index.html" "$OUT/privacidad.html"; then
  echo "ERROR: quedan rutas sin convertir" >&2; exit 1
fi
echo "Web generada en $OUT/ ($(du -sh "$OUT" | cut -f1))"
