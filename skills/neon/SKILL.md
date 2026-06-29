# Neon API Skill

## Quick Start
Neon separates compute and storage, allowing instant database branching and autoscaling. For most Node.js applications, use the `@neondatabase/serverless` driver over standard `pg` to leverage WebSocket connections, which bypass serverless environment connection limits.

```bash
npm install @neondatabase/serverless
```

## Common Workflows
### Instant Branching
Neon allows you to create isolated database branches for preview environments. In Vercel or GitHub Actions, trigger the Neon API to branch your primary DB instantly before running integration tests, then delete the branch upon PR merge.

## Production Patterns
### Connection Pooling vs WebSockets
In traditional long-running servers (like Express on EC2), standard connection pooling with `pg` is acceptable. In Edge environments (Cloudflare Workers, Vercel Edge), always utilize the Neon WebSocket driver to eliminate connection exhaustion.

## Error Recovery
Handle standard PostgreSQL error codes (e.g., `23505` for Unique Violation). If encountering connection timeouts (`ETIMEDOUT`) during cold starts in serverless functions, implement a retry wrapper using an exponential backoff strategy (e.g., `async-retry` package).

## Security Notes
Never expose your raw Neon connection string in client-facing applications. Restrict database access by explicitly binding to static IP ranges where possible, though serverless environments may require `0.0.0.0/0` with strict password enforcement.

## Performance Considerations
Neon's compute scales down to zero when inactive. The first query after scale-to-zero will experience a 'cold start' latency (typically 500ms-1s). To mitigate this for user-facing routes, implement keep-alive cron jobs or utilize read replicas for globally distributed edge applications.

## Testing Guidance
Do not mock the database. Instead, integrate Neon API calls into your test setup phase to instantly provision an exact clone of your production schema, run tests against it, and destroy the branch in the teardown phase.

## Troubleshooting
If queries inexplicably hang in Edge environments, verify you are not attempting to use standard TCP connections. Ensure `neonConfig.fetchConnectionCache = true` is set for the serverless driver to reuse connections effectively.

## References
- [Neon API Docs](https://neon.tech/docs/manage/api-reference)

## Related Skills
- [Vercel](/skills/vercel)
- [Supabase](/skills/supabase)
