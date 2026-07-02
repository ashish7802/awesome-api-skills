# Convex API Skill

## Quick Start
Convex manages your database, server functions, and client state. You write server functions in TypeScript, and Convex automatically syncs the results to your React frontend via WebSockets.

```bash
npm install convex
```

## Common Workflows
### Realtime Queries
Write a `query` function in your `convex/` folder. In your React component, use `useQuery(api.messages.list)`. Convex handles the WebSocket subscription; if the database changes, the React component automatically re-renders.

## Production Patterns
### Mutations and Actions
Use `mutation` functions for deterministic database writes. Use `action` functions (which can call third-party APIs like OpenAI or Stripe) for non-deterministic side effects. Actions can subsequently call mutations to update the database.

## Error Recovery
Convex automatically retries deterministic queries and mutations if they fail due to transient database locks. Actions are NOT retried automatically; handle HTTP failures explicitly within your action code.

## Security Notes
Enforce authorization directly within your Convex query and mutation functions by verifying the `ctx.auth` object before reading or writing data.

## Performance Considerations
Because queries are strictly deterministic, Convex caches their results transparently. Avoid fetching massive data sets; utilize pagination patterns or explicit `limit` clauses.

## Testing Guidance
Use the `convex-test` library to write unit tests for your backend functions, passing in mock authentication states to verify your row-level security logic.

## Troubleshooting
If a mutation throws a non-deterministic error (e.g., `Math.random()` or `fetch()`), Convex will reject it. Move side-effects into `action` functions.

## References
- [Convex Docs](https://docs.convex.dev/home)

## Related Skills
- [Clerk](/skills/clerk)
- [Vercel](/skills/vercel)

## Why use this skill
Use this when your agent works with **convex** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing column names or schema fields
- Using deprecated driver methods or wrong connection strings
- Omitting connection pooling or transaction boundaries

## Production checklist
- [ ] Migrations version-controlled and applied via CI
- [ ] Connection limits and pooling configured
- [ ] Backups and restore procedure documented

## Related skills
- [`clerk`](../clerk/SKILL.md) — related to
- [`vercel`](../vercel/SKILL.md) — related to

---
> **Last Verified:** 2026-07-02
