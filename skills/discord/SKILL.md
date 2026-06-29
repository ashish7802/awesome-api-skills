# Discord API Skill

## Overview
The Discord API allows you to build bots, automate servers, and manage webhooks. This skill focuses on the `discord.js` library for bot integration.

## Installation
```bash
npm install discord.js
pip install discord.py
```

## Authentication
Bots authenticate using a Bot Token provided in the `Authorization: Bot <token>` header (handled automatically by the SDK).

## Core Concepts
- **Guild**: A Discord server.
- **Intents**: WebSocket subscription flags defining what events the bot receives.
- **Slash Commands**: Application commands registered to Discord.

## Common Workflows
1. Initialize `Client` with Intents.
2. Login using `client.login(TOKEN)`.
3. Listen to `interactionCreate` to handle Slash Commands.

## Error Handling
Handle `DiscordAPIError`. Code 50013 indicates 'Missing Permissions'. Code 10008 indicates 'Unknown Message'.

## Security
Never commit your Bot Token. If leaked, Discord will automatically reset it, crashing your application.

## Rate Limits
Global rate limits are 50 requests per second. Route-specific limits exist (e.g., renaming channels is highly restricted).

## Best Practices
Always use Slash Commands (`interactionCreate`) rather than parsing text messages (`messageCreate`). Text message intent is restricted.

## Troubleshooting
If your bot stops receiving events, verify that the required Privileged Intents (like Guild Members) are enabled in the Discord Developer Portal.

## References
- [API Reference](https://discord.com/developers/docs/intro)

## Why use this skill
Use this when your agent works with **discord** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`express`](../express/SKILL.md) — integrates with
- [`fastapi`](../fastapi/SKILL.md) — integrates with
