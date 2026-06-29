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
