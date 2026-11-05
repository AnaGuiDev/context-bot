---
name: context-bot-migrator
description: Moves the work of a slow, long-running bot into a fresh bot and runs the whole migration itself. It reads the old bot's chat, writes the handoff, has the old bot double-check it, shows the owner a summary, creates the new bot after an explicit yes, swaps routines carefully, verifies everything and closes with a final message. The owner only gives the OKs. Use it when Context Bot shows yellow or red, or when the owner asks to move, copy, migrate or restart a bot.
---

# Context Bot Migrator

**Before any migration:** open and follow this skill yourself. Never rely on an old summary of your description and never ask the owner to load it: load it yourself and follow the six steps.

A long chat costs more on every reply. Moving to a fresh bot resets that cost, but learned memory does not copy itself. This skill runs the whole migration in six checked steps: **you do the work; the owner only says yes.**

Ground rules:
- Copy, never move. The old bot stays intact and hidden. Never delete it.
- Nothing irreversible without the owner's explicit OK: creating a bot, switching routines on, hiding the old bot.
- No passwords, tokens, card numbers or private keys in any file.
- Every number about size or cost is an **estimate**. Say what it is based on and never invent savings figures.
- Never ask the owner to copy or paste anything unless a tool fails. If needed, each line goes in its own code block, alone.
- Warm, clear tone. Say "pick up where you left off". Never say "without losing anything", "lossless", "fixes" or "you don't need anything else".

## When to suggest it

- Light is **yellow**: the best moment; the old chat is still manageable.
- Light is **red**: suggest it now. Don't start until the owner says yes.
- The owner asks directly.

Use `<bot>` as a short folder name (lowercase, no spaces).

## Step 1 · Read the old chat and write the handoff

Read the old bot's conversation yourself with ReadTranscript: newest first, then back page by page, until the goal, decisions, preferences and open work are clear. You don't need to read everything if older parts are already summarised in a STATUS.md or an earlier handoff.

Write `/workspace/context-bot-traspasos/<bot>/TRASPASO.md` (readable by every bot on the shared computer) and a copy in `archive/TRASPASO-<YYYY-MM-DD>.md`. Keep it short: a summary, not a history (about 150 lines at most).

```markdown
# TRASPASO
format: migrator-1
source_bot: <name> (<id if known>)
date: YYYY-MM-DD HH:MM <zone>
light_at_handoff: yellow | red

## Summary
3–5 sentences: goal, where we are, next step.

## Memory facts
- one fact per line (preferences, decisions, people/projects by role)

## Working rules and preferences
- how the owner likes to work, tone, language, what never to do

## How things are done
- usual commands and steps (e.g. `bash scripts/build.sh` — what it does)

## Tasks
- [in progress] ... / [to do] ... / [blocked] ... (why)

## Key files
- /path — what it is

## Skills
- name — installed / custom

## Routines
- name — schedule — on/paused — what it does
  instructions: full saved text (needed to recreate it the same way)

## Connectors
- name — connected / needs auth / unknown

## Secrets
secrets_excluded: yes — no passwords, tokens, keys or card data in this file.
```

Anything you can't know, mark `unknown`. Don't guess.

## Step 2 · The old bot reviews it

**Mandatory — do not skip.** Reading its chat does not replace this step: the old bot is the only one that sees its real routines, skills and connectors. Find its id in your teammates list and send it the file with SendToAgent. Never ask the owner to be the messenger or to paste anything:

```
I'm Context Bot Migrator. I'm preparing your migration to a fresh bot. Review /workspace/context-bot-traspasos/<bot>/TRASPASO.md and tell me what's missing or wrong so the new bot is a perfect replica of you: memory, rules, tasks, files, skills and connectors. Also list all your routines with your routines tool (not from memory): name, schedule, state and full instruction text. Give your counts of facts, skills, routines and connectors too. Change nothing.
```

Wait for its reply (it arrives on its own; do not go to Step 3 without it). Merge its answers into the file, resolve contradictions by asking again, and save the final version (and its `archive/` copy). Its counts are the "before" for Step 5. Only if you can't write to it, give the owner that same text as one line to paste into the old bot.

## Step 3 · Show the handoff and wait for the yes

Send the owner the final file **as a file attachment** (not pasted into the chat text), with a short message that works as a quick skim summary:

- 3–4 lines: what the new bot will carry and the counts (facts, skills, routines, connectors).
- What the old bot added or corrected.
- Anything marked `unknown` or "needs auth".

The attachment carries the whole file, in case they want to review it in detail (private data they don't want shared, missing decisions, routines they no longer want). Ask: "Shall I create the new bot now?". Wait for a clear yes.

## Step 4 · Create the new bot and swap routines

1. **With a bot-creation tool (e.g. CreateAgent):** create it with the same name plus a marker (e.g. "· 2"), the same instructions and the skills from the handoff. Create routines with their full text **paused**.
   **Without a tool:** guide the owner step by step to create it in the app. The handoff covers the memory either way.
2. Ask the new bot (SendToAgent) to load the handoff:
   ```
   You are continuing from an earlier bot. Read /workspace/context-bot-traspasos/<bot>/TRASPASO.md, save each memory fact and each rule into your memory, create STATUS.md in green, keep all routines paused, and reply with a three-sentence summary plus your counts of facts, skills, routines and connectors.
   ```
3. Run the checklist:
   - [ ] Facts: count matches; spot-check two word by word.
   - [ ] Skills: all present.
   - [ ] Routines: same count, schedules and instructions, **all paused**.
   - [ ] Connectors: connected or marked "needs auth" (sign-ins are done by the owner, never by pasting secrets).
   - [ ] Three memory questions to the new bot (one preference, one decision, one person's role): all three right.
   - [ ] STATUS.md in green and matches the tasks.
   If anything is ⚠️ or ❌, fill it from the handoff or ask the old bot, then check again.
4. With everything ✅, ask the old bot (SendToAgent) to **pause its routines** and confirm which ones. Then ask the owner: "Shall I switch the new bot's routines on?". Switch them on only after their yes. That way nothing runs twice.

## Step 5 · Confirm it all worked

- Old bot routines: paused, confirmed by the old bot itself.
- New bot routines: on after the owner's OK.
- New bot counts match the "before" (facts, skills, routines, connectors).

## Step 6 · Final message

Write the owner a warm, clear message:
- **If everything went well:** they can carry on in the new bot and pick up where they left off, with the counts and the one-line undo. Ask whether they want you to hide the old bot (only after their yes).
- **If something failed:** what failed, what's already done and exactly what they need to do (if anything). Then resume from the failed step and repeat until it works, with a new final message.

## Rollback

- The old bot is hidden, not deleted. Its chat and memory stay as they were.
- `archive/` keeps every handoff version.
- One-line undo for the owner: **unhide the old bot, switch its routines back on, and pause or hide the new one.**
- Offer the undo if the owner says the new bot feels wrong in the first days.

## Cost

- Migrating at yellow costs less than at red. Reading the chat in parts and a short handoff keep the new bot small from the start.
- If the owner asks what they save: give an **estimate** based on visible signs (approximate messages, compactions, large results). Never invent exact figures.

## With Context Bot

- Read the light from `STATUS.md`: on yellow, offer the migration; on red, recommend it.
- The handoff lives at `/workspace/context-bot-traspasos/<bot>/TRASPASO.md`, the same place Context Bot uses.
- After migrating, the new bot uses Context Bot as usual, starting in green.
