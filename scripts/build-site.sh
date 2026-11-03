#!/usr/bin/env bash
# Genera la web estática bilingüe en dist/ (Cloudflare Pages, GitHub Pages, Netlify o Vercel).
# Uso: bash scripts/build-site.sh   (necesita python3, sin dependencias)
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/build_site.py
echo "Web generada en dist/ ($(du -sh dist | cut -f1))"
