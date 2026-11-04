#!/usr/bin/env python3
"""Genera la web estática bilingüe en dist/ a partir de src/.

  /                 inglés (por defecto)     /es/                 español
  /dashboard/       panel en inglés          /es/dashboard/       panel en español
  /privacy.html     privacidad (inglés)      /es/privacidad.html  privacidad (español)
"""
import json, os, posixpath, re, shutil, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "src"))
import i18n  # noqa: E402

DOMAIN = "https://contextbot.app"
OUT = os.path.join(ROOT, "dist")
PAGES = {  # plantilla: (ruta en inglés, ruta en español, prefijo de claves)
    "landing": ("/", "/es/", "landing"),
    "dashboard": ("/dashboard/", "/es/dashboard/", "dash"),
    "privacy": ("/privacy.html", "/es/privacidad.html", "privacy"),
}
TPL = os.path.join(ROOT, "src", "templates")
# Mientras la plantilla del bot no tenga enlace real (TODO_TEMPLATE_URL), no se publica el botón «Add Context Bot»:
# el botón principal pasa a ser «Copy install prompt». Al rellenarla con scripts/rellenar-placeholders.sh --template,
# vuelve a salir «Add Context Bot» como principal y «Copy install prompt» como secundario.
HAS_TPL = i18n.TEMPLATE.startswith("https://")
ICON_COPY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H6a2 2 0 0 0-2 2v13h2V3h10V1zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H10V7h9v14z"/></svg>'
ICON_STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.2 6.6L12 17.4l-5.8 3.2 1.2-6.6-4.9-4.6 6.6-.8z"/></svg>'
ICON_GH = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 '
           '1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 '
           '3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/></svg>')

def copy_btn(cls, status):
    return (f'<button class="btn{cls} js-copy" type="button" data-status="{status}" data-prompt="{{{{install_prompt}}}}">'
            f'{ICON_COPY}<span class="lbl">{{{{cta_copy}}}}</span></button>')

STAR_BTN = '<a class="btn alt" href="{{REPO}}">' + ICON_STAR + '<span>{{cta_star}}</span>{{STARS}}</a>'
CTAS = (('<a class="btn" href="{{TEMPLATE}}">{{cta_add}}</a>' + copy_btn(" alt", "copy-status")) if HAS_TPL
        else (copy_btn("", "copy-status") + STAR_BTN))
CTAS_END = copy_btn("", "copy-status-end") + STAR_BTN

# Por debajo de esta cifra el contador resta más que suma, así que no se muestra.
STARS_MIN = 10

def github_stars():
    """Estrellas del repositorio al generar la web (CB_STARS=off para no consultarlo, CB_STARS=123 para fijarlo)."""
    v = os.environ.get("CB_STARS", "")
    if v == "off":
        return None
    if v.isdigit():
        return int(v)
    try:
        import urllib.request
        req = urllib.request.Request("https://api.github.com/repos/" + i18n.REPO.split("github.com/")[1],
                                     headers={"User-Agent": "context-bot-build", "Accept": "application/vnd.github+json"})
        with urllib.request.urlopen(req, timeout=4) as r:
            return int(json.load(r)["stargazers_count"])
    except Exception:
        return None

def rel(target, here):
    """Ruta relativa entre dos URL del sitio (las que acaban en / son carpetas)."""
    base = here if here.endswith("/") else posixpath.dirname(here) + "/"
    r = posixpath.relpath(target, base)
    if target.endswith("/"):
        r = "./" if r == "." else r + "/"
    return r

def fill(text, ctx):
    while re.search(r"\{\{>\w+\}\}", text):
        text = re.sub(r"\{\{>(\w+)\}\}", lambda m: open(os.path.join(TPL, m.group(1) + ".html")).read().rstrip("\n"), text)
    for _ in range(3):  # los valores pueden llevar a su vez {{...}}
        text = re.sub(r"\{\{(\w+)\}\}", lambda m: str(ctx[m.group(1)]), text)
    left = re.findall(r"\{\{[^}]*\}\}", text)
    if left:
        sys.exit(f"ERROR: claves sin traducir: {sorted(set(left))}")
    return text

def page_path(url):
    return os.path.join(OUT, url.lstrip("/") + ("index.html" if url.endswith("/") else ""))

def main():
    shutil.rmtree(OUT, ignore_errors=True)
    stars = github_stars()
    print(f"Estrellas en GitHub: {stars if stars is not None else 'sin dato'}" + (" (no se muestran)" if (stars or 0) < STARS_MIN else ""))
    for lang, strings in (("en", i18n.EN), ("es", i18n.ES)):
        idx = 0 if lang == "en" else 1
        for name, (en_url, es_url, pre) in PAGES.items():
            here = (en_url, es_url)[idx]
            alt = (es_url, en_url)[idx]
            depth = here.count("/") - 1
            ctx = dict(strings)
            ctx.update(
                LANG=lang, R="../" * depth, DOMAIN=DOMAIN,
                URL=DOMAIN + here, URL_EN=DOMAIN + en_url, URL_ES=DOMAIN + es_url,
                ALT=rel(alt, here), EN_HREF=rel(en_url, here), ES_HREF=rel(es_url, here),
                EN_CUR=' aria-current="page"' if lang == "en" else "",
                ES_CUR=' aria-current="page"' if lang == "es" else "",
                L_HOME=rel(PAGES["landing"][idx], here), L_DASH=rel(PAGES["dashboard"][idx], here),
                L_PRIV=rel(PAGES["privacy"][idx], here),
                REPO=i18n.REPO, X=i18n.X, X_APP=i18n.X_APP, BMC=i18n.BMC, TEMPLATE=i18n.TEMPLATE,
                ICON_GH=ICON_GH,
                STARS=(f'<span class="stars"><span class="sr">{strings["stars_sr"]}: </span>{stars:,}</span>'.replace(",", strings["thousands"])
                       if (stars or 0) >= STARS_MIN else ""),
                HL_JSON=json.dumps(strings["HL"], ensure_ascii=False),
                COPY_OK=json.dumps(strings["copy_ok"], ensure_ascii=False), COPY_BAD=json.dumps(strings["copy_bad"], ensure_ascii=False),
                title=strings[pre + "_title"], description=strings[pre + "_description"],
                og_description=strings[pre + "_og"],
                VIDEO_JSON=json.dumps(strings["VIDEO"], ensure_ascii=False),
                CTAS=CTAS, CTAS_END=CTAS_END,
                S1_H=strings["s1_h"] if HAS_TPL else strings["s1_h_notpl"],
                S1_P=strings["s1_p"] if HAS_TPL else strings["s1_p_notpl"],
                DASH_JSON=json.dumps(strings["DASH"], ensure_ascii=False).replace("</", "<\\/"),
            )
            html = fill(open(os.path.join(TPL, name + ".html")).read(), ctx)
            dst = page_path(here)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            open(dst, "w").write(html)

    # Mapa del sitio con las dos versiones de cada página
    urls = []
    for en_url, es_url, _ in PAGES.values():
        for u in (en_url, es_url):
            urls.append(f"""  <url><loc>{DOMAIN}{u}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="{DOMAIN}{en_url}"/>
    <xhtml:link rel="alternate" hreflang="es" href="{DOMAIN}{es_url}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="{DOMAIN}{en_url}"/>
  </url>""")
    open(os.path.join(OUT, "sitemap.xml"), "w").write(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
        'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + "\n".join(urls) + "\n</urlset>\n")

    # Archivos estáticos y recursos
    st = os.path.join(ROOT, "src", "static")
    for f in os.listdir(st):
        if f == "CNAME" and "TODO" in open(os.path.join(st, f)).read():
            continue
        shutil.copy(os.path.join(st, f), OUT)
    os.makedirs(os.path.join(OUT, "assets", "js"))
    shutil.copy(os.path.join(ROOT, "src", "js", "dashboard.js"), os.path.join(OUT, "assets", "js"))
    shutil.copy(os.path.join(ROOT, "src", "js", "live.js"), os.path.join(OUT, "assets", "js"))
    for d in ("brand", "fonts"):
        shutil.copytree(os.path.join(ROOT, "assets", d), os.path.join(OUT, "assets", d))
    vdir = os.path.join(OUT, "assets", "video"); os.makedirs(vdir)
    missing = []
    for lang in ("en", "es"):
        for o in ("16x9", "9x16"):
            for f in (f"promo-{lang}-{o}.mp4", f"poster-ui-{lang}-{o}.jpg"):
                src = os.path.join(ROOT, "assets", "video", f)
                if os.path.exists(src):
                    shutil.copy(src, vdir)
                else:
                    missing.append(f)
    if missing:
        print("AVISO: faltan vídeos o pósteres en assets/video/: " + ", ".join(missing), file=sys.stderr)
    # La skill en Markdown plano: /skill.md (inglés) y /es/skill.md (español)
    shutil.copy(os.path.join(ROOT, "skills", "context-bot", "en", "SKILL.md"), os.path.join(OUT, "skill.md"))
    shutil.copy(os.path.join(ROOT, "skills", "context-bot", "SKILL.md"), os.path.join(OUT, "es", "skill.md"))
    open(os.path.join(OUT, ".nojekyll"), "w").close()

if __name__ == "__main__":
    main()
