# Context Bot Migrator

**[➕ Add Context Bot Migrator](https://x.ai/bot/oUJEAr2axANgtedIGrkNS)** · ready-made template in Grok Bot.

An optional companion skill (`skills/context-bot-migrator/`) for moving a long, slow bot into a fresh one in a planned way. It works with any bot and does not need a specific duplication tool.

**Six steps**
1. **It reads the old chat:** the Migrator reads the old bot's conversation itself (ReadTranscript) and writes a short, structured `TRASPASO.md` in `/workspace/context-bot-traspasos/<bot>/`, with a dated copy in `archive/` and a "secrets excluded" line.
2. **The old bot double-checks it:** it sends the file over SendToAgent (required). The old bot adds anything missing and lists its real routines, with schedules.
3. **You see it:** you get the handoff as an attached file, with a short summary on top. Nothing is created until you say yes.
4. **New bot:** created with routines paused and checked against a list. Then it asks the old bot to pause its routines, and the new ones switch on after your second yes.
5. **It checks everything matches:** counts before and after (memory, skills, routines and schedules), and connectors flagged for re-auth.
6. **Final message:** it confirms the result. Rollback: the old bot is hidden, never deleted. To undo: unhide the old bot, switch its routines back on, and pause or hide the new one.

Only if the bot-to-bot tool fails does the Migrator give you a line to paste into the old bot as a fallback.

**Cost:** migrate at yellow when you can, and keep the handoff and the startup short. Any savings figure is an estimate.

A handoff file is a summary, so details can be missed. The checklist is there to catch them. For a first conversation, install `skills/getting-started-migrator/` as well.
