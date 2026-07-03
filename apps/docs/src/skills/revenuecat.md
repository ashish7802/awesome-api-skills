---
title: revenuecat
---

# revenuecat

<p class="skill-meta">Payments · Finance</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python, go |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://www.revenuecat.com/docs/api-v1) |

</div>


## Graph

_No graph edges for this skill._

---

# RevenueCat API Skill

## Quick Start
RevenueCat manages mobile in-app purchases (Apple/Google) seamlessly. The REST API allows your backend to verify user subscription status and grant entitlements.

```bash
  # Standard fetch/axios is used for REST API
```

## Common Workflows
### Entitlement Verification
When a user accesses a premium feature, your backend queries the RevenueCat API (`/v1/subscribers/{app_user_id}`) to check if the 'Pro' entitlement is active.

## Production Patterns
### Webhooks
Do not constantly poll the Subscriber API. Configure RevenueCat Webhooks to push `INITIAL_PURCHASE`, `RENEWAL`, and `CANCELLATION` events to your backend. Sync this status to your local database (e.g., PostgreSQL).

## Error Recovery
Handle HTTP 404 if the `app_user_id` does not exist in RevenueCat yet. Webhooks include retry logic; ensure your webhook handler is idempotent.

## Security Notes
Use the `X-RevenueCat-Authorization` header with your secret API key for backend calls. Verify webhook signatures using the shared secret to prevent malicious payload injection.

## Performance Considerations
Calling the Subscriber API on every single premium request adds latency. Cache the entitlement status locally in your database or Redis, and invalidate the cache when a webhook is received.

## Testing Guidance
RevenueCat provides a sandbox environment. Use sandbox API keys and trigger test webhooks directly from the RevenueCat dashboard.

## Troubleshooting
If entitlements aren't active, verify the user's `app_user_id` matches the exact string initialized in the iOS/Android client SDK.

## References
- [RevenueCat API](https://www.revenuecat.com/docs/api-v1)

## Related Skills
- [Stripe](/skills/stripe)
- [Paddle](/skills/paddle)

## Why use this skill
Use this when your agent works with **revenuecat** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing webhook event names not in the vendor catalog
- Using secret keys in client-side or browser code
- Skipping signature verification on webhook payloads

## Production checklist
- [ ] Webhook signatures verified on raw request body
- [ ] Idempotency keys on mutating requests
- [ ] Test and live keys isolated by environment

## Related skills
- [`stripe`](../stripe/SKILL.md) — related to
- [`paddle`](../paddle/SKILL.md) — related to

---
> **Last Verified:** 2026-07-02

