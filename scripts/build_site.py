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

def rel(target, here):
    """Ruta relativa entre dos URL del sitio (las que acaban en / son carpetas)."""
    base = here if here.endswith("/") else posixpath.dirname(here) + "/"
    r = posixpath.relpath(target, base)
    if target.endswith("/"):
        r = "./" if r == "." else r + "/"
    return r

def fill(text, ctx):
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
                REPO=i18n.REPO, X=i18n.X, BMC=i18n.BMC, TEMPLATE=i18n.TEMPLATE,
                COPY_OK=json.dumps(strings["copy_ok"], ensure_ascii=False), COPY_BAD=json.dumps(strings["copy_bad"], ensure_ascii=False),
                title=strings[pre + "_title"], description=strings[pre + "_description"],
                og_description=strings[pre + "_og"],
                VIDEO_JSON=json.dumps(strings["VIDEO"], ensure_ascii=False),
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
            for f in (f"promo-{lang}-{o}.mp4", f"poster-{lang}-{o}.jpg"):
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
