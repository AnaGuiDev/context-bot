# Tips for using less

Ways to make your weekly Grok Bot allowance last longer. We only include tips backed by official documentation or by answers from the Cursor team on their forum, or that follow directly from what they say. Sources checked on 3 November 2026; they may change.

> Unofficial community project. Always check the current documentation.

## What the sources say (in short)

- Usage is measured in **agent steps and tokens**, not in number of messages. Longer or bigger tasks use more. ([Plans and billing](https://cursor.com/help/grok-bot/plans))
- **Every reply rereads the bot's whole conversation**, so each turn costs roughly as much as the chat is long. It only summarises itself near the limit, and there's no compact button. (Team answer on the [Cursor forum](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540); see also [this thread](https://forum.cursor.com/t/grok-bot-prune-compact-an-agent-s-context-without-creating-a-new-bot/168333))
- **Every routine run uses some allowance.** An hourly routine, or a Slack trigger in a busy channel, can use a week's allowance in a day. ([Routines](https://cursor.com/help/grok-bot/routines), [xAI docs](https://docs.x.ai/grok-bot/skills-routines-and-automations))

## Verified tips

### 1. 🤐 Don't reply "ok" or "thanks" to every message
Each message you send makes the bot reply, and each reply rereads the whole conversation. A lone "ok" costs almost as much as a real question. If you don't need an answer, don't write.
*Follows from:* [forum, team answer](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540) + [Plans and billing](https://cursor.com/help/grok-bot/plans).

### 2. 📦 Batch several requests into one message
For the same reason, three messages mean three rereads of the conversation. Send one list in a single message instead.
*Follows from:* [forum, team answer](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540).

### 3. ⏸️ Pause routines you don't need
A routine that doesn't run doesn't use anything. Pausing (rather than deleting) lets you switch it back on later.
*Source:* [Routines](https://cursor.com/help/grok-bot/routines).

### 4. 🕰️ Run routines less often and narrow their triggers
Go from "every hour" to "weekdays at 9", and limit Slack triggers to one channel and one specific keyword.
*Source:* [Routines](https://cursor.com/help/grok-bot/routines), [xAI docs](https://docs.x.ai/grok-bot/skills-routines-and-automations).

### 5. 🧪 Careful with "Test"
Testing a routine does the real work and uses allowance just like a normal run.
*Source:* [Routines](https://cursor.com/help/grok-bot/routines).

### 6. 🚚 When the chat gets very long, move to a duplicated bot
Ask for a handoff summary, duplicate the bot and start fresh with that summary. **Note:** according to the team, the copy keeps the name, instructions, skills and routines, but **not** the conversation or the learned memory. Hide the old bot rather than deleting it.
*Source:* [forum, team answer](https://forum.cursor.com/t/trim-the-fat-in-a-chat/171653), [another answer](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540).

### 7. 🪪 Put standing instructions in the bot's profile, not in the chat
Whatever you put in *Edit Profile* survives duplication and doesn't need repeating in the conversation.
*Source:* [forum, team answer](https://forum.cursor.com/t/grok-bot-context-window-size-and-token-accumulation-logic-in-pro/171540).

### 8. 🎯 Start with small tasks and watch your usage
Scope the task tightly, see how much it uses, then widen it. Check your usage before long jobs.
*Source:* [Plans and billing](https://cursor.com/help/grok-bot/plans).

### 9. 🛠️ Savings mode: turn repeated tasks into scripts
Your bot notes each finished task in one line, a small script counts the repeats (no bot usage), and about once a week the bot reads a 10-line summary. It also reviews its routines by reading only their saved prompt text. If something repeats or a routine is mostly mechanical, it proposes one script you can run on demand or with cron. Say "savings mode now" to check anytime. Nothing changes without your OK. These are suggestions; the saving depends on the case.
*Follows from:* [Plans and billing](https://cursor.com/help/grok-bot/plans) (usage is agent steps and tokens) and [Routines](https://cursor.com/help/grok-bot/routines).

Tips we haven't been able to confirm yet are listed (in Spanish) in [tips-pendientes.md](../tips-pendientes.md).
