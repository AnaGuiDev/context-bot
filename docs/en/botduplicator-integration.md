# Moving to a new bot with BotDuplicator

When the light turns 🔴 red, the easiest thing is to carry on in a new bot: same setup, a clean and fast conversation. Here's how to do it and pick up where you left off. (The recommended path is [Context Bot Migrator](migrator.md); this guide is the BotDuplicator alternative.)

> BotDuplicator is a third-party tool for duplicating bots. Context Bot isn't affiliated with it, or with Grok Bot or xAI.

## Before you start

Ask your current bot:

> Do the Context Bot handoff: update STATUS.md to red and write TRASPASO.md in /workspace/context-bot-traspasos/<bot-name>/ with your long-term memory, current status, key files and routines.

**Check the file before you go on.** Make sure there are no passwords, keys or private details you don't want to share. If something important is missing (a decision, a file, one of your preferences), ask the bot to add it. Template: [`examples/TRASPASO.md.example`](../../examples/TRASPASO.md.example).

**Tip:** paste the file into the dashboard's [Handoff view](https://contextbot.app/dashboard/#handoff) and press **Visualise**. You'll see the memory, tasks, files and routines that will move to the new bot, group by group, so gaps stand out.

## Step by step

1. **Duplicate the bot.** Use BotDuplicator on your current bot. The new bot keeps the name, instructions, skills and routines, but starts with an empty conversation and, according to the Cursor team, **without the learned memory** ([source](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540)). That's why **the memory travels in the handoff file**.
2. **Make sure the new bot can read the handoff.** Your account's bots share the same computer, so the new bot can see a path like `/workspace/context-bot-traspasos/...`. If not, paste the contents of `TRASPASO.md` into your first message.
3. **First message to the new bot:**

   > Hi. You're continuing from an earlier conversation. Run the Context Bot start-up: read /workspace/context-bot-traspasos/<bot>/TRASPASO.md, save the facts to your memory and tell me in three sentences where we are.

4. **Check it.** Ask something it could only know from the memory (one of your preferences). If it matches, you're done. If not, fill in what's missing.
5. **Hide the old bot, don't delete it.** Deleting is permanent and removes the conversation and memory.
6. **Update the dashboard.** Add the new bot on green and mark the old one as archived (or remove it from the list).

## Common problems

- **The new bot can't find the handoff:** paste the contents of TRASPASO.md straight into the chat.
- **The new bot doesn't remember a preference:** ask it to save it to memory, and add it to the handoff for next time.
- **It's missing context:** ask the old bot to expand the missing section and pass it to the new one.
- **I don't want to duplicate:** you can also create a bot from scratch, give it the skill and paste in the STATUS. That works just as well.

> Prefer a guided, checked migration? See the optional [Context Bot Migrator](migrator.md).
