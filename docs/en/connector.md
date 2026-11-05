# Live status connector (optional)

> Unofficial project, not affiliated with Grok Bot or xAI. Context Bot works just as well **without** the connector. It's only for people who want their bots' traffic lights to show up without copying them by hand.

> **In testing, not announced (v0.3).** The connector works and you can use this guide to try it, but it hasn't been publicly launched yet.

[Español](../conector.md)

## Connecting

1. Tell your bot: **"Add this MCP server: https://mcp.contextbot.app/mcp"**.
2. The Context Bot consent page opens. Press **Allow** and sign in with GitHub. Only your numeric GitHub user id is read; no repository or email permissions are requested.
3. Ask the bot to "report your status to the connector". The Context Bot template already includes this in its routine.
4. In the [dashboard](https://contextbot.app/dashboard/), press **Connect live status**. It refreshes every minute.

## What is sent (and what isn't)

Each report contains only these fields:

| Field | Example | Notes |
|---|---|---|
| `bot_name` | `Travel` | 1–60 characters |
| `colour` | `green` / `yellow` / `red` | |
| `turns` | `85` | the bot's estimate |
| `usage_share` | `0.3` | an estimate (0–1) |
| `routines_per_day` | `2` | |
| `compacted` | `true` | whether it has summarised before |
| `note` | `"ready for handoff"` | up to 140 characters, optional |

Your conversations, files and GitHub token are **never** sent. The numbers are the bot's own estimates, not official figures.

- History is deleted automatically after 90 days.
- You can have up to 20 bots.
- Up to 30 reports per hour are accepted.

## Tools

| Tool | What it does |
|---|---|
| `report_status` | Save a bot's current light |
| `get_status` | Read the latest status for one bot or all of them |
| `list_bots` | List the bots that have reported |
| `get_tips` | Tips for saving context (`en` / `es`) |
| `delete_my_data` | Delete **everything** and revoke access (needs `confirm: true`) |

There's also a REST API for the dashboard: `GET /mcp/api/statuses` (add `?history=1` for history) and `DELETE /mcp/api/me`. Both use the same OAuth token.

## Deleting your data

There are three ways:

- Tell your bot "delete my Context Bot connector data" (this uses `delete_my_data`).
- In the dashboard, press **Delete my live data**.
- Message @SoyAnaDev on X.

Deletion is immediate and also revokes all your tokens.
