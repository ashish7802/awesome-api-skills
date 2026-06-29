# PostHog API Skill

## Quick Start
PostHog provides complete product analytics. The Node.js SDK allows you to capture events, identify users, and evaluate feature flags from your backend.

```bash
npm install posthog-node
```

## Common Workflows
### User Identification and Events
When a user signs up, call `posthog.identify()` to map their internal DB ID to their analytics profile. Then, call `posthog.capture()` for key backend actions (e.g., 'Subscription Created').

## Production Patterns
### Feature Flag Evaluation
Evaluate feature flags on the backend before returning UI states. Use `posthog.getFeatureFlag(flagKey, distinctId)` to gate beta features securely. Local evaluation can dramatically speed up flag checks without hitting the API.

## Error Recovery
The `posthog-node` SDK batches events and flushes them asynchronously. Ensure you call `await posthog.shutdown()` during your application's graceful shutdown sequence, or you will lose pending events.

## Security Notes
Do not log PII (Passwords, SSNs, raw financial data) to PostHog. Scrub payloads before capture. Utilize PostHog's proxy capabilities to bypass ad-blockers securely.

## Performance Considerations
Backend feature flag evaluation requires a network round-trip unless you configure Local Evaluation, which periodically syncs flag definitions and evaluates them entirely in-memory.

## Testing Guidance
Disable PostHog in unit tests by passing a dummy API key and setting `enable: false` in the client configuration, or mock the `posthog` module entirely.

## Troubleshooting
If events are missing in the dashboard, verify that you are flushing the queue before the serverless function (e.g., AWS Lambda) terminates. Standard asynchronous event capture will be killed instantly in Lambda.

## References
- [PostHog Node SDK](https://posthog.com/docs/libraries/node)

## Related Skills
- [Mixpanel](/skills/mixpanel)
