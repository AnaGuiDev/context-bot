<!-- TODO(PLACEHOLDER): domain and repository URL. See PLACEHOLDERS.md -->
# 🚦 Control de Contexto

**Keep your bot fast, even when the chat gets long.**

A free, open-source kit so long conversations with Grok Bot don't get slow and expensive. *The project is written in Spanish; this is a short English summary.*

**[🌐 Website](https://TODO-DOMINIO/) · [📊 Try the dashboard with sample data](https://TODO-DOMINIO/dashboard/?demo) · [Español](README.md)**

<a href="assets/video/promo-16x9.mp4"><img src="assets/video/promo.gif" alt="Control de Contexto promo video" width="820"></a>

## What it does

Your bot estimates how big the conversation is, keeps a `STATUS.md` file with where you are, and gives you a traffic light:

- 🟢 **Green:** all good.
- 🟡 **Yellow:** the chat is getting heavy. Summarise into `STATUS.md` and work from there.
- 🔴 **Red:** slow and costly. Write a handoff file and move to a fresh bot.

When a bot is duplicated, its learned memory is not copied. So the bot writes a **handoff file** (`TRASPASO.md`) with its preferences, decisions, status, key files and routines (never passwords). The new bot reads it on its first turn and saves the facts to its own memory.

## What's inside

- [Skill](skills/control-de-contexto/SKILL.md) for your bot (in Spanish).
- [Dashboard](dashboard/index.html): one HTML file, no server, data stays in your browser. Includes a routine review that flags routines worth pausing or slowing down.
- [Tips to use less](docs/tips-ahorro.md), each with a source.
- A static website ready to deploy: `bash scripts/build-site.sh` → `dist/`. See [docs/publicar.md](docs/publicar.md).

## Privacy

No cookies, no tracking. The dashboard uses `localStorage` only.

## Licence

[MIT](LICENSE) © 2026 Ana Gui

> Unofficial community project. Not affiliated with Grok Bot or xAI.
