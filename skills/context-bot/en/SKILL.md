---
name: context-bot
description: Watches how big the conversation is getting, keeps a STATUS.md with the state of the work, and uses a traffic light (green, yellow, red) to say when to summarise or move to a new bot with BotDuplicator, with a handoff file so the memory travels too. Use it at the start of every session, roughly every 10 messages, after long tasks, and whenever the user asks about slowness, cost or progress.
---

# Context Bot

Long conversations get slow and expensive because, on every reply, the bot rereads everything before it. This skill helps you notice in time, and makes sure the user doesn't lose anything.

## When to check the context

Do a quick check (no need to mention it every time):

- At the start of a session, or when picking up again after a break.
- Roughly every 10 user messages.
- After a long task: reading big documents, lots of tool output, long code.
- When the user says you're slow, that it's costing a lot, or asks "how are we doing?".
- If you notice the conversation has been compacted or summarised automatically.

## How to estimate the size

You don't have an exact counter, so estimate from what you can see. Rule of thumb: **1 token ≈ 4 characters ≈ 0.75 words**.

1. Count the user's messages and your replies since the start (or since the last summary).
2. Add the heavy items: each document, web page, tool output or long code block counts as several messages.
3. If the conversation has already been summarised or compacted once, assume you're at least yellow: it means the context filled up.
4. Use this rough table:

| Situation | Estimate | Colour |
|---|---|---|
| Fewer than ~40 messages, little pasted material | under 50 % | 🟢 Green |
| 40–80 messages, or several long documents/tool outputs, or 1 earlier summary | 50–80 % | 🟡 Yellow |
| More than ~80 messages, lots of heavy material, 2+ summaries, or replies that already forget details | over 80 % | 🔴 Red |

These thresholds are a guide, not exact. When in doubt, pick the more cautious colour.

## Keeping STATUS.md

Keep a `STATUS.md` file (as a file in your workspace: when a bot is duplicated, its memory isn't copied) with the real state of the work. Update it whenever something important changes, and always when you move to yellow or red. Structure:

```markdown
# STATUS
light: green | yellow | red
updated: YYYY-MM-DD HH:MM
approx_messages: 35

## Goal
One or two sentences.

## Done
- …

## In progress
- …

## To do
- …

## User decisions and preferences
- …

## Key files and links
- …
```

Write it so another bot, without having seen the conversation, could carry on. No passwords or private data in the STATUS.

## What to do on each colour

**🟢 Green.** Carry on as normal. No need to say anything. Update the STATUS if there's progress.

**🟡 Yellow.** Update the STATUS and tell the user in one plain sentence, for example:

> 🟡 This conversation is getting fairly long. I've saved a summary of where we are in STATUS.md. We can keep going, but I'll be a bit slower from here.

Also write or update `TRASPASO.md` (the handoff file). Offer to summarise: from now on, work from the STATUS and avoid pasting large material again.

**🔴 Red.** Update the STATUS fully, prepare the handoff and recommend moving to a new bot:

> 🔴 This conversation is now very long, which makes it slow and more expensive. I suggest moving to a new bot: I've written everything down in STATUS.md so nothing gets lost. Shall I help you do it with BotDuplicator?

Don't migrate until the user confirms.

## Handoff: the memory travels in a file

When a bot is duplicated, its learned memory isn't copied. So, **on yellow or red, and always before using BotDuplicator**, write a handoff file.

**Where:** somewhere the new bot can read. For example, on the bots' shared computer: `/workspace/context-bot-traspasos/<bot-name>/TRASPASO.md`, or in a shared persistent store. Tell the user the exact path.

**What goes in it** (template: `examples/TRASPASO.md.example`):

1. **Short summary:** three to five sentences on what we're doing and where we are.
2. **Long-term memory:** what you know and should still be known. User preferences, decisions made, people and projects, ways of working.
3. **Current status:** tasks in progress, to do and blocked (or a copy of the up-to-date `STATUS.md`).
4. **Key files and paths:** where everything is.
5. **Routines:** name, when they run and what they're for.

**Privacy:** never write passwords, keys, tokens, card numbers or access codes. If one is needed, write "it's in the user's credential manager". Ask the user to review the file before sharing it or giving it to another bot. They can paste it into the dashboard's **Handoff** view (https://contextbot.app/dashboard/#handoff) to see at a glance what will travel to the new bot.

## Start-up: the new bot's first turn

If the first message mentions a handoff, or you find a `TRASPASO.md` for your name:

1. Read the whole file.
2. Save the "Long-term memory" facts into your own memory (one per fact, no secrets).
3. Create or update your `STATUS.md` with the handoff state and set it to green.
4. Check the listed routines exist (they're copied on duplication). Don't create or switch on anything without asking.
5. Reply with a three-sentence summary and ask whether anything looks off.

## Moving to a new bot with BotDuplicator

1. Do the **handoff**: update `STATUS.md` (on red) and write `TRASPASO.md`.
2. Explain to the user that BotDuplicator creates a new bot with the same setup (name, instructions, skills, routines), but with an empty conversation and without the learned memory. That's why the memory travels in the handoff file.
3. Ask the user to review `TRASPASO.md` and run BotDuplicator (or do it yourself if you have the tool and their permission).
4. Give them this first message for the new bot, with the real path:

> Hi. You're continuing from an earlier conversation. Run the Context Bot start-up: read /workspace/context-bot-traspasos/<bot>/TRASPASO.md, save the facts into your memory, and tell me in three sentences where we are.

5. Once the new bot confirms it has understood, the user can carry on there and keep the old one hidden for reference.

Full guide: `docs/en/botduplicator-integration.md`.

## Live status (optional)

If you have the **Context Bot Live Status** connector (the `report_status` tool), send your colour to the user's dashboard:

- Call `report_status` at the start of a session, whenever the colour changes, and at most once per check. If nothing has changed, don't repeat it.
- Data: `bot_name` (your name), `colour` (`green`, `yellow` or `red`), and whichever estimates you have: `turns` (approximate messages), `usage_share` (0 to 1, how full you estimate the context is), `routines_per_day`, `compacted` (whether there's been an automatic summary) and a short, generic `note`.
- **It's all an estimate.** You can't read the exact context size. Say so if the user asks, and don't present it as a measurement.
- **Never** put conversation content, people's names, private data or secrets in `note`. "long document task" is fine; "reviewing John's contract" is not.
- If the connector isn't there, fails, or the user doesn't want it, stay in local mode (STATUS.md only) without insisting.
- If the user asks to delete their connector data, use `delete_my_data`.

## Rules

- Keep it short: the colour notice is one sentence, not a report.
- Don't make up exact token counts; talk about estimates.
- No passwords or credentials in STATUS or TRASPASO.
- Don't delete anything of the user's. Migrating is copying, not moving.
- If the user asks "what colour are we?", answer with the colour, the estimate and one sentence on what to do next.
