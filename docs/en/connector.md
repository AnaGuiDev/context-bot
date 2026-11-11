# Live status connector (optional)

> Unofficial project, not affiliated with Grok Bot or xAI. Context Bot works just as well **without** the connector. It's only for people who want their bots' traffic lights to show up without copying them by hand.

> **In testing, not announced (v0.3).** The connector works and you can use this guide to try it, but it hasn't been publicly launched yet.

> **The worker has to be deployed.** Publishing the website does not update `https://mcp.contextbot.app`. `delete_bot` (including `existed`), Unicode NFC bot names and the registration limits on this page live in the repository and reach the running connector only after the deploy described in [worker-deployment.md](worker-deployment.md). Until then, production may not have them.

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
| `bot_name` | `Travel` | 1–60 characters, stored as Unicode NFC |
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
| `delete_bot` | Delete one bot’s status and history, keeping other bots and access (`confirm: true`). Returns `deleted: true` and `existed` for whether a row was there. Needs the worker deploy |
| `delete_my_data` | Delete **everything** and revoke access (needs `confirm: true`) |

There's also a REST API for the dashboard: `GET /mcp/api/statuses` (add `?history=1` for history) and `DELETE /mcp/api/me`. Both use the same OAuth token.

## Deleting your data

There are three ways:

- Tell your bot "delete my Context Bot connector data" (this uses `delete_my_data`).
- In the dashboard, press **Delete my live data**.
- Message @SoyAnaDev on X.

Deletion is immediate and also revokes all your tokens.

## Registration protection

Each IP address can register 120 OAuth clients per hour. A separate cap of 1000 registrations per hour applies across every address, so rotating IPs does not remove the limit. The per-IP allowance is higher than the previous 10 because one egress — for example Grok registering MCP clients — can cover many people, and a 429 there would block real sign-ups.

Counters do not store the raw IP. They store SHA-256 of the hourly window and the IP, with no salt. That is not anonymization: if the database leaks, an IPv4 can be guessed offline for a known hour. HMAC would prevent that guess, but it needs a key that is not in the repository. No new secret is added. Reusing `GITHUB_CLIENT_SECRET` would tie this counter to rotation of that credential and would place it on the anonymous registration path, so that is not done. A key written in source would not be a secret.

Counters older than 24 hours are removed by the daily cleanup. People on the same network share that IP's allowance, not the global cap. This limit also waits for the worker deploy.
