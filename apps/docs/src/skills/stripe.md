---
title: stripe
---

# stripe

<p class="skill-meta">Payments · Commerce</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://stripe.com/docs/api) |

</div>


## Graph

_No graph edges for this skill._

---

# Stripe API Skill

## Overview
Stripe provides APIs for payment processing, billing, subscriptions, and financial management. This skill focuses on the Stripe Node.js and Python SDKs, emphasizing PCI-compliant flows like Checkout Sessions and Webhook signatures.

## Installation
```bash
npm install stripe
pip install stripe
```

## Authentication
Stripe uses Bearer token authentication via secret keys (e.g., `sk_test_...` or `sk_live_...`). Never expose the secret key in client-side code. Use restricted keys with minimal scope where possible.

## Core Concepts
- **PaymentIntent**: Tracks the lifecycle of a customer checkout process.
- **Checkout Session**: A hosted Stripe page for secure payment collection.
- **Webhook**: Asynchronous HTTP callbacks for events like `payment_intent.succeeded`.

## Common Workflows
1. Create a Checkout Session on the backend.
2. Redirect the user to the `url` returned.
3. Handle the `checkout.session.completed` event via Webhook.

## Error Handling
Stripe returns standard HTTP status codes. Inspect the `StripeError` object for `type` (e.g., `card_error`, `api_error`) and `code` (e.g., `insufficient_funds`). Implement exponential backoff for `429 Too Many Requests`.

## Security
Always verify webhook signatures using `stripe.webhooks.constructEvent` to prevent replay attacks and spoofing. Ensure TLS is enforced for all API traffic.

## Rate Limits
Standard API rate limits are 100 read/write operations per second in live mode. Test mode is limited to 25 operations per second.

## Best Practices
Use idempotency keys (`Idempotency-Key` header) for all POST requests to safely retry network failures without duplicate charges.

## Troubleshooting
If a webhook fails signature validation, ensure you are using the raw body buffer (in Express, use `express.raw({type: 'application/json'})`) rather than a parsed JSON body.

## References
- [API Reference](https://stripe.com/docs/api)

## Why use this skill
Use this when your agent works with **stripe** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing webhook event names not in the vendor catalog
- Using secret keys in client-side or browser code
- Skipping signature verification on webhook payloads

## Production checklist
- [ ] Webhook signatures verified on raw request body
- [ ] Idempotency keys on mutating requests
- [ ] Test and live keys isolated by environment

## Related skills
- No graph relationships yet — see the knowledge graph in the docs site.

---
> **Last Verified:** 2026-07-02

