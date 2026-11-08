#!/usr/bin/env python3
"""Genera la web estática bilingüe en dist/ a partir de src/.

  /                 inglés (por defecto)     /es/                 español
  /dashboard/       panel en inglés          /es/dashboard/       panel en español
  /privacy.html     privacidad (inglés)      /es/privacidad.html  privacidad (español)
"""
import json, os, posixpath, re, shutil, sys
from html import escape
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
# Mientras la plantilla del bot no tenga enlace real (TEMPLATE en src/i18n.py), la web cuenta la instalación con el prompt.
# Con enlace (scripts/rellenar-placeholders.sh --template, o CB_TEMPLATE=https://… para probar) cuenta la historia
# de instalación: prompt para el bot actual como acción principal; plantilla para un bot nuevo como alternativa.
#   - Textos: una clave «x_tpl» en src/i18n.py sustituye a «x» cuando hay plantilla.
#   - Plantillas HTML: {{#TPL}}…{{/TPL}} solo sale con plantilla; {{^TPL}}…{{/TPL}}, solo sin ella.
TEMPLATE = os.environ.get("CB_TEMPLATE") or i18n.TEMPLATE
HAS_TPL = TEMPLATE.startswith("https://")
if HAS_TPL and not re.fullmatch(r"https://[A-Za-z0-9./?=_%&~+-]+", TEMPLATE):
    sys.exit(f"ERROR: enlace de plantilla no válido: {TEMPLATE}")
COPY_BTN = ('<button class="btn{cls} copy-install" type="button" data-status="{status}" '
            'data-prompt="{{{{install_prompt}}}}">{{{{cta_copy}}}}</button>')
STAR_BTN = '<a class="btn alt" href="{{REPO}}">{{STAR}}{{cta_star}}{{STARS}}</a>'

def ctas(status):
    if HAS_TPL:
        return COPY_BTN.format(cls="", status=status) + '<a class="btn alt" href="{{TEMPLATE}}">{{cta_add}}</a>'
    return COPY_BTN.format(cls="", status=status) + STAR_BTN

def texts(d):
    """Elige la variante de cada texto: «x_tpl» si hay plantilla, «x» si no. Entra también en los diccionarios anidados."""
    out = {}
    for k, v in d.items():
        if k.endswith("_tpl"):
            if k[:-4] not in d:
                sys.exit(f"ERROR: «{k}» no tiene texto base «{k[:-4]}»")
            continue
        v = d.get(k + "_tpl", v) if HAS_TPL else v
        out[k] = texts(v) if isinstance(v, dict) else v
    return out

def keys(d, pre=""):
    return {pre + k for k in d} | {x for k, v in d.items() if isinstance(v, dict) for x in keys(v, pre + k + ".")}

def conditionals(text):
    text = re.sub(r"\{\{#TPL\}\}(.*?)\{\{/TPL\}\}", lambda m: m.group(1) if HAS_TPL else "", text, flags=re.S)
    return re.sub(r"\{\{\^TPL\}\}(.*?)\{\{/TPL\}\}", lambda m: "" if HAS_TPL else m.group(1), text, flags=re.S)

STAR = ('<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.6l2.9 6 6.6.8-4.9 4.6 1.3 6.5'
        'L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z"/></svg>')
STARS_MIN = 10  # por debajo no se enseña el número: un «★ 3» resta más de lo que suma

def star_count():
    """Estrellas del repositorio en el momento de generar la web. Sin red (o con CB_OFFLINE=1) no se muestra nada."""
    if os.environ.get("CB_STARS", "").isdigit():
        return int(os.environ["CB_STARS"])
    if os.environ.get("CB_OFFLINE"):
        return 0
    import urllib.request
    api = i18n.REPO.replace("https://github.com/", "https://api.github.com/repos/")
    try:
        req = urllib.request.Request(api, headers={"Accept": "application/vnd.github+json", "User-Agent": "context-bot-build"})
        with urllib.request.urlopen(req, timeout=4) as r:
            return int(json.load(r).get("stargazers_count", 0))
    except Exception:
        return 0

def stars_label(n):
    if n < STARS_MIN:
        return ""
    txt = f"{n / 1000:.1f}k".replace(".0k", "k") if n >= 1000 else str(n)
    return f' <span class="stars">· {txt}</span>'

def json_ld(strings, lang, url):
    data = {
        "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Context Bot",
        "url": url, "description": strings["landing_description"], "inLanguage": lang,
        "applicationCategory": "ProductivityApplication", "operatingSystem": "Web",
        "isAccessibleForFree": True, "license": "https://opensource.org/licenses/MIT",
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
        "image": f"{DOMAIN}/assets/brand/{strings['og_image']}",
        "author": {"@type": "Person", "name": "Ana Gui", "url": i18n.X, "sameAs": ["https://github.com/AnaGuiDev", i18n.X]},
        "sameAs": [i18n.REPO, i18n.X_PROJECT],
    }
    return '<script type="application/ld+json">' + json.dumps(data, ensure_ascii=False).replace("</", "<\\/") + "</script>"

def rel(target, here):
    """Ruta relativa entre dos URL del sitio (las que acaban en / son carpetas)."""
    base = here if here.endswith("/") else posixpath.dirname(here) + "/"
    r = posixpath.relpath(target, base)
    if target.endswith("/"):
        r = "./" if r == "." else r + "/"
    return r

def fill(text, ctx):
    text = re.sub(r"\{\{>(\w+)\}\}", lambda m: open(os.path.join(TPL, m.group(1) + ".html")).read().rstrip("\n"), text)
    text = conditionals(text)
    for _ in range(3):  # los valores pueden llevar a su vez {{...}}
        text = re.sub(r"\{\{(\w+)\}\}", lambda m: str(ctx[m.group(1)]), text)
    left = re.findall(r"\{\{[^}]*\}\}", text)
    if left:
        sys.exit(f"ERROR: claves sin traducir: {sorted(set(left))}")
    return text

def page_path(url):
    return os.path.join(OUT, url.lstrip("/") + ("index.html" if url.endswith("/") else ""))

def main():
    diff = keys(i18n.EN) ^ keys(i18n.ES)
    if diff:
        sys.exit(f"ERROR: claves que solo están en un idioma: {sorted(diff)}")
    shutil.rmtree(OUT, ignore_errors=True)
    stars = stars_label(star_count())
    for lang, strings in (("en", texts(i18n.EN)), ("es", texts(i18n.ES))):
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
                REPO=i18n.REPO, X=i18n.X, XP=i18n.X_PROJECT, BMC=i18n.BMC, TEMPLATE=escape(TEMPLATE), MIGRATOR_TEMPLATE=escape(i18n.MIGRATOR_TEMPLATE), LITE_TEMPLATE=escape(i18n.LITE_TEMPLATE),
                STAR=STAR, STARS=stars,
                COPY_OK=json.dumps(strings["copy_ok"], ensure_ascii=False), COPY_BAD=json.dumps(strings["copy_bad"], ensure_ascii=False),
                title=strings[pre + "_title"], description=strings[pre + "_description"],
                og_title=strings.get(pre + "_og_title", strings[pre + "_title"]),
                og_description=strings[pre + "_og"],
                JSONLD=json_ld(strings, lang, DOMAIN + here) if name == "landing" else "",
                VIDEO_JSON=json.dumps(strings["VIDEO"], ensure_ascii=False),
                CTAS=ctas("copy-status"), CTAS_END=ctas("copy-status-end"),
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
        shutil.copytree(os.path.join(ROOT, "assets", d), os.path.join(OUT, "assets", d), ignore=shutil.ignore_patterns("*.html"))
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
    # Script del modo ahorro: /savings-scan.sh
    shutil.copy(os.path.join(ROOT, "skills", "context-bot", "scripts", "savings-scan.sh"), os.path.join(OUT, "savings-scan.sh"))
    open(os.path.join(OUT, ".nojekyll"), "w").close()

if __name__ == "__main__":
    main()
