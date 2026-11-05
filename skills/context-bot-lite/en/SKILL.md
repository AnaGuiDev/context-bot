---
name: context-bot-lite
description: Light version of Context Bot. Watches conversation size with a traffic light (green, yellow, red) and keeps a STATUS.md with the state of the work, at minimum cost. It does not include savings mode or run migrations; at red it suggests Context Bot Migrator. Use it roughly every 20 user messages and whenever the user asks «¿Cómo vamos?» / "How are we doing?", about slowness or about progress.
---

# Context Bot Lite

Long chats get slow and pricey because every reply rereads everything before it. This skill does only two things: a traffic light and a `STATUS.md`. It is built to use as little as possible.

## When to check

- Roughly every **20 user messages**.
- When the user asks «¿Cómo vamos?» / "How are we doing?" or says you are slow.
- If you notice the conversation was automatically summarised.

That's all: no routines, no scripts, no extra tools. The check is mental and is not announced while it stays green.

## How to estimate size

It is an estimate, not a measurement. Count messages since the start (or the last summary) and add the heavy parts: documents, web pages, tool outputs or long code count as several messages.

| Situation | Estimate | Colour |
|---|---|---|
| Under ~40 messages, little pasted material | under 50% | 🟢 Green |
| 40–80 messages, or several long documents/tool outputs, or 1 earlier summary | 50–80% | 🟡 Yellow |
| Over ~80 messages, lots of heavy material, 2+ summaries or you are forgetting details | over 80% | 🔴 Red |

If unsure, pick the more cautious colour.

## STATUS.md

Keep `STATUS.md` as a file in your workspace. Update it only when moving to yellow or red, or when the user asks. Keep it short:

```markdown
# STATUS
light: green | yellow | red
updated: YYYY-MM-DD HH:MM

## Goal
## Done
## Pending
## Decisions and user preferences
## Key files
```

Write it so another bot could continue without seeing the chat. No passwords, keys or private data.

## What to do at each colour

- **🟢 Green.** Carry on, no message.
- **🟡 Yellow.** Update `STATUS.md` and say it in one sentence: "🟡 This chat is getting long. I've saved where we are in STATUS.md. When you want a fresh bot, Context Bot Migrator walks you through it: https://x.ai/bot/oUJEAr2axANgtedIGrkNS".
- **🔴 Red.** Update `STATUS.md` and suggest: "🔴 This chat is very long now and slower. To move to a fresh bot and pick up where you left off, you can use Context Bot Migrator: https://x.ai/bot/oUJEAr2axANgtedIGrkNS". Don't migrate or create anything yourself.

## Rules

- One sentence per notice, not a report.
- Never invent exact token or savings numbers.
- Never delete anything of the user's.
- Want more (handoff, savings mode)? The full version is Context Bot: https://x.ai/bot/-lByS9XGxzqHgCrOhrrJY
