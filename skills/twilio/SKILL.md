# Twilio API Skill

## Overview
Twilio provides programmable communication tools. This skill details the SMS and Voice APIs, emphasizing webhooks for incoming messages and TwiML for call routing.

## Installation
```bash
npm install twilio
pip install twilio
```

## Authentication
Authenticate using Account SID and Auth Token. Keep these strictly server-side.

## Core Concepts
- **TwiML**: XML-based language that instructs Twilio on how to handle calls and SMS.
- **Message SID**: Unique identifier for tracking message delivery status.

## Common Workflows
1. Instantiate Twilio client.
2. Call `messages.create` with `to`, `from`, and `body`.
3. Poll or use status webhooks to confirm delivery.

## Error Handling
Handle the `TwilioRestException`. Code 21211 means 'Invalid 'To' Phone Number'. Handle gracefully in the UI.

## Security
Validate incoming webhooks using `twilio.validateRequest` to ensure requests actually originated from Twilio.

## Rate Limits
Standard SMS throughput is 1 message per second per long code. Toll-free and short codes have higher limits.

## Best Practices
Use Messaging Services instead of hardcoded numbers to automatically handle compliance, opt-outs, and sender ID rotation.

## Troubleshooting
If international SMS fails, check your Geo-Permissions in the Twilio Console.

## References
- [API Reference](https://www.twilio.com/docs/api)

## Why use this skill
Use this when your agent works with **twilio** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`sendgrid`](../sendgrid/SKILL.md) — related to

---
> **Last Verified:** 2026-07-02
