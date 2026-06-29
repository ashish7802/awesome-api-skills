# Mixpanel API Skill

## Quick Start
Mixpanel tracks user behavior across platforms. Use the official Node.js SDK to accurately record server-side events, avoiding client-side ad-blocker discrepancies.

```bash
npm install mixpanel
```

## Common Workflows
### Server-Side Tracking
Track revenue events or highly secure state changes (e.g., Account Upgrades) exclusively on the backend via `mixpanel.track()`. Frontend tracking is unreliable for billing metrics.

## Production Patterns
### User Profiles
Keep user traits updated via `mixpanel.people.set()`. Synchronize fields like 'Plan Type', 'Lifetime Value', and 'Last Login' to enable powerful cohort analysis in the Mixpanel dashboard.

## Error Recovery
Handle network failures when sending batch events. If using the HTTP API directly rather than the SDK, implement robust exponential backoff. The Node SDK fails silently on network errors by default to prevent crashing.

## Security Notes
Mixpanel relies on a Project Token. Server-side integrations should also utilize the API Secret for administrative actions (like bulk deletions). Never expose the API Secret to clients.

## Performance Considerations
Use `mixpanel.track_batch()` if you are importing historical data or processing thousands of events in a chron job to avoid rate limits and reduce network latency.

## Testing Guidance
Initialize the SDK with a separate test Project Token for your staging environment to prevent test events from corrupting your production analytics data.

## Troubleshooting
If events appear in Mixpanel with the wrong chronological order, ensure you are passing the exact UNIX timestamp in the properties payload if events are heavily delayed.

## References
- [Mixpanel Node SDK](https://developer.mixpanel.com/docs/nodejs)

## Related Skills
- [PostHog](/skills/posthog)
