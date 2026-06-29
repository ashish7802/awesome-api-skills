# Paddle API Skill

## Quick Start
Paddle acts as a Merchant of Record, meaning they handle sales tax (VAT, GST) calculations and remittance for you. Use the `@paddle/paddle-node` SDK to manage subscriptions and invoices.

```bash
npm install @paddle/paddle-node
```

## Common Workflows
### Subscription Creation
Typically, Paddle Checkout runs on the frontend. The backend listens for the `transaction.completed` webhook to activate the subscription in your database, bypassing manual server-side charge creation.

## Production Patterns
### Merchant of Record Compliance
Because Paddle is the MoR, you must rely on their webhook events (`subscription.activated`, `subscription.past_due`) as the absolute source of truth for billing access. Do not attempt to calculate taxes or prorations locally.

## Error Recovery
Handle `ApiError`. Common issues include invalid `price_id` values or attempting to charge a customer in an unsupported currency. Webhooks from Paddle retry automatically.

## Security Notes
Always verify incoming webhook signatures using your Paddle Webhook Secret. Ensure your backend validates that the `status` of a transaction is truly `completed` before granting entitlements.

## Performance Considerations
The Paddle API is robust but should not be called synchronously during critical read paths. Cache subscription statuses in your local database (e.g., Supabase or Neon).

## Testing Guidance
Use the Paddle Sandbox environment (`sandbox-api.paddle.com`). Trigger test webhooks via the dashboard to simulate edge cases like failed payments and cancellations.

## Troubleshooting
If webhooks are failing signature verification, ensure you are passing the raw, unmodified request body buffer to the verification function, not a parsed JSON object.

## References
- [Paddle API](https://developer.paddle.com/api-reference)

## Related Skills
- [Stripe](/skills/stripe)
- [Lemon Squeezy](/skills/lemon squeezy)

## Why use this skill
Use this when your agent works with **paddle** — structured patterns beat pasted docs and prevent common hallucinations.

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
- [`lemon squeezy`](../lemon squeezy/SKILL.md) — related to
