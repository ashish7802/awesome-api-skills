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
