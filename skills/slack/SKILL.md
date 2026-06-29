# Slack API Skill

## Overview
Slack APIs enable custom apps, bots, and slash commands. This skill covers the `@slack/web-api` and `@slack/bolt` frameworks.

## Installation
```bash
npm install @slack/bolt
pip install slack_bolt
```

## Authentication
Uses Bot User OAuth Tokens (`xoxb-`) for sending messages, and Signing Secrets to verify incoming requests from Slack.

## Core Concepts
- **Block Kit**: A JSON-based UI framework for building rich messages.
- **Events API**: Webhooks for real-time Slack activity.
- **Conversations**: Channels, DMs, or Private Groups.

## Common Workflows
1. Initialize Bolt `App` with token and signing secret.
2. Use `app.message()` to listen to text.
3. Use `app.client.chat.postMessage` to send messages.

## Error Handling
Catch `WebAPIPlatformError`. Check `error.data.error` (e.g., `channel_not_found`, `not_in_channel`).

## Security
You MUST verify the signature of incoming Slack requests using your Signing Secret. The Bolt framework does this automatically.

## Rate Limits
Tier 1 endpoints are 1 request per second. Tier 4 endpoints (like chat.postMessage) are 1 request per second per channel.

## Best Practices
Use Block Kit Builder to design UIs. Store state in your database rather than trying to pass complex state through Slack modal `private_metadata`.

## Troubleshooting
If your app can't post to a channel, ensure you have invited the bot to the channel first.

## References
- [API Reference](https://api.slack.com/apis)

## Why use this skill
Use this when your agent works with **slack** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`github-actions`](../github-actions/SKILL.md) — integrates with
- [`sentry`](../sentry/SKILL.md) — integrates with
