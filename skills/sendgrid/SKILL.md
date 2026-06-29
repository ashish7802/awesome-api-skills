# SendGrid API Skill

## Overview
SendGrid handles transactional and marketing email delivery. This skill focuses on the `@sendgrid/mail` SDK and dynamic templates.

## Installation
```bash
npm install @sendgrid/mail
pip install sendgrid
```

## Authentication
Use a SendGrid API Key. Restrict API key permissions to 'Mail Send' only for production application servers.

## Core Concepts
- **Dynamic Templates**: Handlebars-like syntax for transactional emails.
- **Personalizations**: Allows sending to multiple recipients with unique template data per recipient.

## Common Workflows
1. Set API Key.
2. Construct message object with `template_id` and `dynamic_template_data`.
3. Call `sgMail.send(msg)`.

## Error Handling
Handle HTTP 401 (Invalid Key) and HTTP 403 (Domain not authenticated). Output `error.response.body.errors` for detailed validation messages.

## Security
Ensure Sender Authentication (Domain Authentication / SPF / DKIM) is configured; otherwise emails will go to spam.

## Rate Limits
SendGrid limits depend on the plan, typically supporting thousands of requests per second.

## Best Practices
Do not use `to` arrays for bulk mailing unless you want recipients to see each other. Use multiple `personalizations` instead.

## Troubleshooting
If emails aren't arriving, check the Activity Feed in the SendGrid dashboard for bounces or drops.

## References
- [API Reference](https://docs.sendgrid.com/api-reference)

## Why use this skill
Use this when your agent works with **sendgrid** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`twilio`](../twilio/SKILL.md) — related to
