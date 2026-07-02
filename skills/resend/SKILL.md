# Resend API Skill

## Quick Start
Resend focuses on developer experience, bypassing legacy SMTP complexity. It inherently supports React Email for component-driven templating.

```bash
npm install resend react-email
```

## Common Workflows
### Transactional Emails
Trigger confirmation emails immediately after Stripe webhooks or Clerk user creations. Combine Resend with React Email to construct type-safe, cross-client compatible email components.

## Production Patterns
### Batch Sending
When notifying thousands of users (e.g., product updates), do not iterate `resend.emails.send()`. Instead, construct an array of payload objects and utilize `resend.batch.send()` to drastically reduce API latency and HTTP overhead.

## Error Recovery
Handle `ResendError`. If sending fails due to HTTP 429 (Rate Limit), implement a dead-letter queue (DLQ) in your architecture (via SQS or Redis) to automatically retry the payload. Watch for bounce events via Webhooks.

## Security Notes
Enforce Domain Authentication (DKIM/SPF/DMARC) in the Resend dashboard immediately. Unverified domains will land in spam or be outright rejected by Gmail and Outlook. Rotate API keys if exposed, as they possess sending authority.

## Performance Considerations
HTML payloads can become large. Do not attach files larger than 10MB directly; instead, upload large attachments to an S3 bucket and provide a presigned URL within the email body.

## Testing Guidance
Use the `resend.emails.send` endpoint with a verified testing domain or route traffic to a local mailcatcher during CI/CD. Do not blast real emails to mock users.

## Troubleshooting
If emails mysteriously drop, check the Resend Dashboard 'Logs' tab. Statuses like 'Bounced' usually indicate a hard rejection by the receiving mail server. Ensure your `from` domain matches the authenticated domain.

## References
- [API Reference](https://resend.com/docs/api-reference)

## Related Skills
- [React-Email](/skills/react-email)
- [Stripe](/skills/stripe)
- [Clerk](/skills/clerk)

## Why use this skill
Use this when your agent works with **resend** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`react-email`](../react-email/SKILL.md) — related to
- [`stripe`](../stripe/SKILL.md) — related to
- [`clerk`](../clerk/SKILL.md) — related to

---
> **Last Verified:** 2026-07-02
