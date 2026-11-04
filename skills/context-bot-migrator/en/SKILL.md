---
name: context-bot-migrator
description: Moves the work of a slow, long-running bot into a fresh bot in a planned way. It takes an inventory of the old bot, writes a short structured handoff the owner reviews, creates the new bot only after an explicit OK, checks the result against a checklist, and keeps a rollback. Use it when Context Bot shows yellow or red, or when the owner asks to move, copy, migrate or restart a bot.
---

# Context Bot Migrator

A long chat costs more on every reply. Moving to a fresh bot resets that cost, but learned memory does not copy itself. This skill turns the move into five checked stages. It works with any bot and does not depend on a specific duplication tool.

Ground rules:
- Copy, never move. The old bot stays intact and hidden. Never delete it.
- Nothing irreversible without the owner's explicit OK: creating a bot, switching routines on, hiding the old bot.
- No passwords, tokens, card numbers or private keys in any file.
- Every number about size or cost is an **estimate**. Say what it is based on.
- Give each line the owner must paste into another chat in its own code block, alone.

## When to suggest it

- Context Bot light is **yellow**: the best moment. The old bot can still write a good handoff cheaply.
- Light is **red**: suggest it now. Don't start until the owner says yes.
- The owner asks directly.

## Stage 1 · Inventory of the old bot

A bot can usually list its own memory, skills, routines and connectors better than anyone else. Give the owner this prompt to paste into the **old** bot. It produces the inventory and the handoff in one turn:

```
Prepare a Context Bot migration in one reply. 1) Update STATUS.md and set the light. 2) Write /workspace/context-bot-traspasos/<bot>/TRASPASO.md using the Migrator handoff format: version, source bot, date, summary, memory facts (one per line), tasks, key files, skills, routines with schedule and on/off state, connectors with auth status, and a line confirming secrets were excluded. 3) Copy it to /workspace/context-bot-traspasos/<bot>/archive/TRASPASO-<YYYY-MM-DD>.md. 4) Reply with the counts: facts, skills, routines, connectors. Keep the whole file under about 150 lines. Do not create, change or delete anything else.
```

Replace `<bot>` with a short folder name (lowercase, no spaces). Write the counts down: they are the "before" side of Stage 4.

If the old bot can't list something (for example connector auth), mark it `unknown`. Don't guess.

## Stage 2 · The handoff file

Path: `/workspace/context-bot-traspasos/<bot>/TRASPASO.md`, readable by every bot on the shared computer. If the new bot can't read it, the owner pastes the contents into the chat.

Format (keep it short, a summary rather than a history):

```markdown
# TRASPASO
format: migrator-1
source_bot: <name> (<id if known>)
date: YYYY-MM-DD HH:MM <zone>
light_at_handoff: yellow | red

## Summary
3–5 sentences: goal, where we are, next step.

## Memory facts
- one fact per line (preferences, decisions, people/projects by role, ways of working)

## Tasks
- [in progress] ...
- [to do] ...
- [blocked] ... (why)

## Key files
- /path — what it is

## Skills
- name — installed / custom

## Routines
- name — schedule — on/off — what it does

## Connectors
- name — connected / needs auth / unknown

## Secrets
secrets_excluded: yes — no passwords, tokens, keys or card data in this file.
```

Ask the owner to read it before going on. Look for: private data they don't want shared, missing decisions or preferences, routines they no longer want.

## Stage 3 · Create the new bot (only after an explicit OK)

Ask in one sentence: "Shall I create the new bot now?" Wait for a clear yes.

Then, depending on what is available:
1. **A bot-creation tool (for example CreateAgent):** create it with the same name plus a marker (e.g. "· 2"), the same instructions, and the skills on the handoff list. Create routines **paused**.
2. **No tool:** guide the owner step by step to create the bot in the app, or to use a duplication tool if they already use one. Duplication tools often copy setup but not learned memory. The handoff covers that gap either way.

First message for the new bot (give it to the owner as a single paste line):

```
You are continuing from an earlier bot. Read /workspace/context-bot-traspasos/<bot>/TRASPASO.md, save each memory fact to your memory, create STATUS.md in green, keep all routines paused, and reply with a three-sentence summary plus your counts of facts, skills, routines and connectors.
```

This one-turn startup keeps the new chat small from the start.

## Stage 4 · Verification checklist

Compare the new bot against the "before" counts. Report each line as ✅, ⚠️ or ❌:

- [ ] Memory facts: count matches; spot-check two facts word by word.
- [ ] Skills: every listed skill is present.
- [ ] Routines: same count, same schedules, and **all paused**. They stay paused until the owner confirms, so nothing runs twice.
- [ ] Connectors: each is connected, or flagged "needs re-auth" for the owner. Sign-ins are done by the owner, never by pasting secrets.
- [ ] Three memory-only questions: the owner asks three things only the old memory would know (a preference, a decision, a person's role). All three should be right.
- [ ] STATUS.md exists in green and matches the handoff tasks.
- [ ] Optional dry run: run one routine once by hand, check its output, and leave it paused.

Anything ⚠️ or ❌: fix it from the handoff, or ask the old bot to expand that section, then check again.

When everything passes and the owner agrees: switch the new bot's routines on, pause the matching routines on the old bot, and ask before hiding the old bot.

## Stage 5 · Rollback

- The old bot is hidden, not deleted. Its chat and memory stay as they were.
- The dated archive in `archive/` keeps every handoff version.
- One-line undo for the owner: **unhide the old bot, switch its routines back on, and pause or hide the new one.**
- Offer the undo whenever the owner says the new bot feels wrong during the first days.

## Cost

- Migrating at yellow costs less than at red: the old bot's handoff turn is one of its most expensive, and it only gets pricier.
- Short handoff, one-turn startup, no replaying old history.
- If the owner asks what they save: give a rough **estimate** based on visible signs (approximate message count, compactions, large tool results). Label it as an estimate, say what it is based on, and never invent exact token or money figures.

## With Context Bot

- Read the light from `STATUS.md`. On yellow, offer the migration. On red, recommend it.
- The handoff lives at `/workspace/context-bot-traspasos/<bot>/TRASPASO.md`, the same place Context Bot uses.
- After migrating, the new bot uses Context Bot as usual, starting in green.
