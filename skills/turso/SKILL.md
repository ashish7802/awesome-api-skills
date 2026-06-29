# Turso API Skill

## Quick Start
Turso provides a distributed SQLite experience. You can query it over HTTP or sync the entire database to a local SQLite file for ultra-low latency reads.

```bash
npm install @libsql/client
```

## Common Workflows
### Embedded Replicas
Instead of querying a remote database for every read, Turso allows you to sync an embedded replica to the file system. Writes are automatically routed to the primary node, while reads are serviced locally at sub-millisecond speeds.

## Production Patterns
### Microservice Data Isolation
Because Turso allows creating thousands of databases instantaneously, consider a multi-tenant architecture where every customer or microservice gets its own dedicated SQLite database rather than logically partitioning a monolithic database.

## Error Recovery
Handle `LibsqlError`. If your embedded replica sync fails, catch the error and fallback to querying the remote primary node directly.

## Security Notes
Generate organization-scoped API tokens for CI/CD deployments and database-scoped tokens for the application servers. Never leak full access tokens to the frontend.

## Performance Considerations
Embedded replicas require local disk access. In purely ephemeral serverless environments (like AWS Lambda), embedded replicas may be wiped between cold starts, negating their benefit. Use them primarily in persistent edge nodes or VPS deployments.

## Testing Guidance
Because Turso is compatible with SQLite, you can point your test suite to an entirely local in-memory SQLite database (`file::memory:`) to run tests at light speed without hitting network endpoints.

## Troubleshooting
If transactions fail with 'database is locked', ensure you are closing your transactions properly and not holding long-lived write locks, which bottleneck SQLite's single-writer architecture.

## References
- [Turso Documentation](https://docs.turso.tech)

## Related Skills
- [Fly.io](/skills/fly.io)
- [Render](/skills/render)
