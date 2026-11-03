# Issues iniciales («good first issue»)

Borradores para abrir **a mano** cuando el repositorio sea público. No están publicados. Cópialos tal cual en *New issue* y ponles las etiquetas indicadas. Están pensados para que alguien nuevo pueda colaborar en una tarde, sin conocer todo el proyecto.

Etiquetas que conviene crear antes: `good first issue`, `help wanted`, `docs`, `i18n`, `dashboard`, `skill`.

Con GitHub CLI (cuando toque, no antes):

```bash
gh issue create --repo AnaGuiDev/context-bot --title "…" --body-file cuerpo.md --label "good first issue,docs"
```

---

## 1. Docs: captura de pantalla del panel en la guía de instalación

**Etiquetas:** `good first issue`, `docs`

**Title:** Add a dashboard screenshot to the installation guide · Añadir una captura del panel a la guía de instalación

**Body:**

> The installation guides ([EN](../docs/en/installation.md) · [ES](../docs/instalacion.md)) explain how to paste `STATUS.md` into the dashboard, but they show no picture of it.
>
> **Task:** open <https://contextbot.app/dashboard/?demo>, take a screenshot (around 1200 px wide, PNG, no personal data), save it under `assets/` and link it from both guides.
>
> **Done when:** both guides show the image with a short alt text in their own language.
>
> Las guías de instalación no tienen ninguna imagen del panel. Haz una captura del modo demo, guárdala en `assets/` y enlázala desde las dos guías con su texto alternativo.

## 2. i18n: revisar el inglés de la skill

**Etiquetas:** `good first issue`, `i18n`, `skill`

**Title:** Proofread the English skill · Revisar el inglés de la skill

**Body:**

> [`skills/context-bot/en/SKILL.md`](../skills/context-bot/en/SKILL.md) is a translation of the Spanish skill. A native speaker's read would help.
>
> **Task:** fix anything that sounds unnatural. Keep the meaning, the headings and the colour thresholds exactly as they are, so both versions behave the same.
>
> **Done when:** a PR with only wording changes, and a note of anything that seemed unclear in the original.

## 3. Panel: atajo de teclado para pegar el estado

**Etiquetas:** `good first issue`, `dashboard`

**Title:** Dashboard: focus the paste box with a keyboard shortcut · Panel: atajo de teclado para pegar

**Body:**

> Pressing `/` on the dashboard should move focus to the box where you paste `STATUS.md`, unless you are already typing in a field.
>
> **Task:** add the shortcut in the dashboard script, mention it in the help text in both languages (`src/i18n.py`) and rebuild with `bash scripts/build-site.sh`.
>
> **Done when:** it works with the keyboard only, does not trigger inside inputs, and the help text shows it in EN and ES.

## 4. Trucos: un truco nuevo con su fuente

**Etiquetas:** `good first issue`, `docs`, `help wanted`

**Title:** Add a sourced tip for using less · Añadir un truco con fuente para gastar menos

**Body:**

> The tips in [`docs/tips-ahorro.md`](tips-ahorro.md) and [`docs/en/tips.md`](en/tips.md) all link to a source. We'd like more.
>
> **Task:** add one tip in both files. It must link to official documentation or to something you can reproduce. No made-up figures.
>
> **Done when:** the tip appears in both languages with its link, and `python3 worker/gen-tips.py` still runs.

## 5. Accesibilidad: revisar el contraste del semáforo

**Etiquetas:** `good first issue`, `dashboard`

**Title:** Check colour contrast of the traffic light · Revisar el contraste del semáforo

**Body:**

> The green, yellow and red badges must be readable for everyone, including people with colour blindness.
>
> **Task:** check the contrast of the text on each badge (for example with the browser's dev tools), aim for WCAG AA, and make sure the colour is never the only cue (the word "green / verde" etc. should always be visible).
>
> **Done when:** a PR with any CSS fixes and a short note of the contrast ratios you measured.
