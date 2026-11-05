# Installation

No coding needed. It takes a minute or two.

## 1. Give your bot the skill

**Easiest: a ready-made bot.** Open the [Context Bot template](https://x.ai/bot/-lByS9XGxzqHgCrOhrrJY) and add it in Grok Bot. You get a new bot with the skill and its instructions already in place. Then chat as usual: it checks the light as the chat grows.

**Already have a bot? Paste this prompt** into its chat instead:

```text
Install the skill at https://contextbot.app/skill.md into my skill library, save it exactly as written, then confirm.
```

Your bot saves the skill ([readable here](../../skills/context-bot/en/SKILL.md)) and confirms. Check it's there by asking: "What color are we on?"

## 2. Open the dashboard

1. Go to [contextbot.app/dashboard/](https://contextbot.app/dashboard/). If you'd rather use it offline, download the repository, run `bash scripts/build-site.sh` and double-click `dist/dashboard/index.html`.
2. It needs no account and no server.
3. Add your bots and paste their `STATUS.md` (or pick the colour yourself) to see the traffic light.
4. When a bot is yellow or red, press **Handoff** on its card. You'll see what moves to the new bot (memory, tasks, files and routines), and you can copy or download the `TRASPASO.md`. You can also paste in a `TRASPASO.md` your bot gave you to check it.

Your data is stored only in your browser (`localStorage`). If you clear your browser data, it goes too.

## 3. (Optional) Coordinator bot

If you have several bots, create one that watches over all of them using the prompt in [`prompts/bot-coordinador.md`](../../prompts/bot-coordinador.md) (in Spanish; ask the bot to reply in English).

## When the light turns red

Use [Context Bot Migrator](migrator.md) ([template](https://x.ai/bot/oUJEAr2axANgtedIGrkNS)).
