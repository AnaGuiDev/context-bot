---
name: context-bot
description: Watches how big the conversation is getting, keeps a STATUS.md with the state of the work, and uses a traffic light (green, yellow, red) to say when to summarise or move to a new bot with Context Bot Migrator, with a handoff file so the memory travels too. Includes a savings mode: it logs each task and, once a week, a script counts repeats; it also reviews its routines' prompt text, to propose turning mechanical work into a script. Use it at the start of every session, roughly every 10 messages, after long tasks, and whenever the user asks about slowness, cost, savings mode or progress.
---

# Context Bot

Long conversations get slow and expensive because, on every reply, the bot rereads everything before it. This skill helps you notice in time, so the user can pick up where they left off.

## When to check the context

Do a quick check (no need to mention it every time):

- At the start of a session, or when picking up again after a break.
- Roughly every 10 user messages.
- After a long task: reading big documents, lots of tool output, long code.
- When the user says you're slow, that it's costing a lot, or asks "How are we doing?" («¿Cómo vamos?»).
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

Keep a `STATUS.md` file (as a file in your workspace: when you move to a new bot, its memory isn't copied) with the real state of the work. Update it whenever something important changes, and always when you move to yellow or red. Structure:

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

> 🟡 This conversation is getting fairly long. I've saved a summary of where we are in STATUS.md. We can keep going, but I'll be a bit slower from here. When you want to move to a fresh bot, Context Bot Migrator walks you through it: https://x.ai/bot/oUJEAr2axANgtedIGrkNS

Also write or update `TRASPASO.md` (the handoff file). Offer to summarise: from now on, work from the STATUS and avoid pasting large material again.

**🔴 Red.** Update the STATUS fully, prepare the handoff and recommend moving to a new bot:

> 🔴 This conversation is now very long, which makes it slow and more expensive. I suggest moving to a new bot: I've written down where we are in STATUS.md so you can pick up where you left off. Shall I help you do it with Context Bot Migrator? https://x.ai/bot/oUJEAr2axANgtedIGrkNS

Don't migrate until the user confirms.

## Handoff: the memory travels in a file

When you move to a new bot, its learned memory isn't copied. So, **on yellow or red, and always before migrating**, write a handoff file.

**Where:** somewhere the new bot can read. For example, on the bots' shared computer: `/workspace/context-bot-traspasos/<bot-name>/TRASPASO.md`, or in a shared persistent store. Tell the user the exact path.

**What goes in it** (template: `examples/TRASPASO.md.example`):

1. **Short summary:** three to five sentences on what we're doing and where we are.
2. **Long-term memory:** what you know and should still be known. User preferences, decisions made, people and projects, ways of working.
3. **Current status:** tasks in progress, to do and blocked (or a copy of the up-to-date `STATUS.md`).
4. **Key files and paths:** where everything is.
5. **Routines:** name, when they run and what they're for.

**Privacy:** never write passwords, keys, tokens, card numbers or access codes. If one is needed, write "it's in the user's credential manager". Ask the user to review the file before sharing it or giving it to another bot. If they want, they can paste it (optional) into the dashboard's **Handoff** view (https://contextbot.app/dashboard/#handoff) to see at a glance what will travel to the new bot.

## Start-up: the new bot's first turn

If the first message mentions a handoff, or you find a `TRASPASO.md` for your name:

1. Read the whole file.
2. Save the "Long-term memory" facts into your own memory (one per fact, no secrets).
3. Create or update your `STATUS.md` with the handoff state and set it to green.
4. Check the listed routines exist (if the setup was copied they'll be there; Context Bot Migrator leaves them paused). Don't create or switch on anything without asking.
5. Reply with a three-sentence summary and ask whether anything looks off.

## Moving to a new bot with Context Bot Migrator

1. Do the **handoff**: update `STATUS.md` (on red) and write `TRASPASO.md`. The handoff is sent **as a file attachment** (not pasted into the chat).
2. Offer Context Bot Migrator (template: https://x.ai/bot/oUJEAr2axANgtedIGrkNS): it reads this chat itself and talks to you via SendToAgent, so the owner never copies messages between bots. It walks them to a new bot with the same setup (name, instructions, skills, routines), but with an empty conversation and without the learned memory. That's why the memory travels in the handoff file.
3. When the Migrator contacts you via SendToAgent, answer fully (handoff review, routines list, etc.) and, once the new bot is verified, pause your routines if it asks.
4. Once the new bot confirms it has understood, the user can carry on there and keep the old one hidden for reference.

Full guide: `docs/en/migrator.md`.

## Savings mode: repeated tasks and routines that could be scripts

It looks at two things, both cheaply: **(a) tasks the user asks for often** and **(b) your routines**. For (a): **you note tasks as you go, a script does the counting, and you only read a 10-line summary**. Never re-read the chat history for this. These are **savings suggestions**: the real saving depends on each case and can't be guaranteed.

**1. Note each task when you finish it**

Every time you finish a task the user asked for (in chat or in a routine run), append **one** short line to `/workspace/context-bot/tareas.log`:

```
2026-11-04 | csv-convert | sales CSV to xlsx for report
```

- Format: `date (YYYY-MM-DD) | key | 3-8 word note`.
- The key is short, lowercase, hyphenated, and **always the same for the same task** (`csv-convert`, `web-check`, `git-push`, `daily-report`, `site-backup`). Reuse existing keys.
- No private data, people's names or secrets in the note. Create the folder if it doesn't exist.
- Only note your own tasks. **Never read other bots' chats.**

**2. The script counts, not you**

`savings-scan.sh` (at `https://contextbot.app/savings-scan.sh`, installed to `/workspace/context-bot/savings-scan.sh`) reads the log with no bot usage and prints at most 10 lines with the keys repeated 3 or more times in the last 30 days. It is read-only. Install it the first time it's needed, and tell the user.

**3. When to look**

- During the size check you already do, **at most once a week**: run `bash /workspace/context-bot/savings-scan.sh` and read only its output. Don't create a new routine for this.
- When the user says "savings mode now": run it right away.
- If nothing repeats, say nothing (or, if they asked, "Nothing repeated yet").

**3b. Also review your routines (cheaply)**

In the same weekly check (or on "savings mode now"), go through your routines reading **only each routine's saved prompt text** (its instructions and schedule), without opening its runs or outputs. Mark the deterministic parts (fetching data, reports from files, backups, conversions, checks). A frequent routine that is mostly mechanical steps is a good candidate: the script would do that part and the routine would only run it and summarise. If you already reviewed a routine and its text hasn't changed, skip it.

**4. If something repeats or a routine is mechanical, propose ONE script**

Pick the clearest repeated task (from the log) or routine part that is **deterministic and repeatable** (fetching data, reports from files, backups, format conversions, checks) and propose a single script:

- what it would do and how it would run: **on demand** ("run daily-report") or with **cron** on the box;
- the estimated benefit in qualitative terms (high, medium, low) and why, e.g. "you asked for it 6 times this month and the steps never change". **Don't invent numbers** for savings, tokens or money;
- what stays with you: judgement, writing, surprises and deciding what to do with the result.

If the task needs judgement or is writing for people, say so and don't propose it.

**Savings mode rules**

- **Never create, change or delete scripts, cron jobs or routines without the user's explicit confirmation.** One proposal at a time.
- Before changing anything, save a backup (e.g. in `/workspace/backups/` with the date) and explain how to roll back.
- Keep scripts in `/workspace/scripts/`, with a comment at the top saying what they do, and list them in `/workspace/scripts/INDEX.md` (name, what it does, how it runs, date).
- Run the script once in front of the user before scheduling it.
- No passwords or tokens in scripts or in the log.
- Note in STATUS.md, under "Decisions", what moved to a script and where the backup is.

## Rules

- Keep it short: the colour notice is one sentence, not a report.
- Don't make up exact token counts; talk about estimates.
- No passwords or credentials in STATUS or TRASPASO.
- Don't delete anything of the user's. Migrating is copying, not moving.
- If the user asks "How are we doing?" (in Spanish: «¿Cómo vamos?»), answer with the colour, the estimate and one sentence on what to do next.
