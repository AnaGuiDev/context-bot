# Context Bot Migrator

An optional companion skill (`skills/context-bot-migrator/`) for moving a long, slow bot into a fresh one in a planned way. It works with any bot and does not need a specific duplication tool.

**Five stages**
1. **Inventory:** one paste line makes the old bot list its memory facts, skills, routines (with schedules) and connectors (with auth status), and write the handoff.
2. **Handoff:** a short, structured `TRASPASO.md` in `/workspace/context-bot-traspasos/<bot>/`, with a dated copy in `archive/` and a "secrets excluded" line. You review it.
3. **New bot:** created only after your explicit OK, with a bot-creation tool if one is available. Otherwise you get step-by-step guidance (a duplication tool is optional). Routines start paused.
4. **Verification:** the counts before and after are compared, skills and schedules are checked, connectors are flagged for re-auth, you ask three memory-only questions, and you can do an optional dry run of one routine.
5. **Rollback:** the old bot is hidden, never deleted. To undo: unhide the old bot, switch its routines back on, and pause or hide the new one.

**Cost:** migrate at yellow when you can, and keep the handoff and the startup short. Any savings figure is an estimate.

A handoff file is a summary, so details can be missed. The checklist is there to catch them. For a first conversation, install `skills/getting-started-migrator/` as well.
