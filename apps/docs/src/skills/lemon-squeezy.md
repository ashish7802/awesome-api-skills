---
title: lemon-squeezy
---

# lemon-squeezy

<p class="skill-meta">Payments · Finance</p>


<div class="trust-panel">
  <div class="trust-header">
    <div class="trust-badge">
      <span class="pulse-dot"></span>
      <span>validated</span>
    </div>
    <span class="trust-version">Schema v1.0.0</span>
  </div>
  <div class="trust-grid">
    <div class="trust-item">
      <span class="trust-label">Maintainer</span>
      <span class="trust-val">Awesome API Skills Team</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Last Verified</span>
      <span class="trust-val">2026-07-02</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Languages</span>
      <span class="trust-val">typescript, python, go</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Supported Agents</span>
      <span class="trust-val">cursor, claude-code, cline, continue</span>
    </div>
  </div>
  <div class="trust-doc-link"><a href="https://docs.lemonsqueezy.com/api" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **related to** → [paddle](/skills/paddle)
- **related to** → [stripe](/skills/stripe)

---


## Quick Start
Lemon Squeezy simplifies global tax compliance and recurring billing. The official `@lemonsqueezy/lemonsqueezy.js` SDK handles interactions cleanly.

```bash
npm install @lemonsqueezy/lemonsqueezy.js
```

## Common Workflows
### License Key Management
Lemon Squeezy uniquely offers built-in License Key generation for desktop apps. You can programmatically generate, activate, and validate license keys associated with a purchase.

## Production Patterns
### Syncing Orders
Use webhooks (`order_created`, `subscription_created`) to sync order data. When a user buys your SaaS, parse the `custom_data` object in the webhook payload (which should contain your internal `user_id`) to map the purchase.

## Error Recovery
Handle rate limit errors (HTTP 429). The API is heavily cached but mutations are strictly limited. Catch generic HTTP errors using `try/catch` and inspect the `error` property returned by the SDK.

## Security Notes
Webhook signatures in Lemon Squeezy use HMAC SHA256. Verify the `X-Signature` header against the raw request body using Node's `crypto` module to prevent spoofed payments.

## Performance Considerations
Do not query the Lemon Squeezy API on every page load to check subscription status. Rely entirely on your database, which should be continually updated by incoming webhooks.

## Testing Guidance
Lemon Squeezy provides a dedicated Test Mode. Use their test credit cards to simulate successful and failed subscription renewals.

## Troubleshooting
If `custom_data` is missing in webhooks, ensure your frontend checkout URL explicitly appended the `?checkout[custom][user_id]=123` parameter during initialization.

## References
- [Lemon Squeezy API](https://docs.lemonsqueezy.com/api)

## Related Skills
- [Paddle](/skills/paddle)
- [Stripe](/skills/stripe)

## Why use this skill
Use this when your agent works with **lemon-squeezy** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing webhook event names not in the vendor catalog
- Using secret keys in client-side or browser code
- Skipping signature verification on webhook payloads

## Production checklist
- [ ] Webhook signatures verified on raw request body
- [ ] Idempotency keys on mutating requests
- [ ] Test and live keys isolated by environment

## Related skills
- [`paddle`](../paddle/SKILL.md) — related to
- [`stripe`](../stripe/SKILL.md) — related to

---
> **Last Verified:** 2026-07-02

