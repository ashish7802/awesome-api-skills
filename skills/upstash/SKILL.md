# Upstash API Skill

## Quick Start
Upstash provides serverless Redis and Kafka via REST APIs, making it uniquely compatible with Edge environments where raw TCP connections are restricted.

```bash
npm install @upstash/redis
```

## Common Workflows
### Rate Limiting at the Edge
Utilize Upstash Redis in Cloudflare Workers or Vercel Edge to track IP addresses. Implement a sliding window algorithm to protect expensive downstream APIs (like OpenAI) from abuse.

## Production Patterns
### REST vs TCP
In serverless/edge environments, always use `@upstash/redis` (REST HTTP wrapper). In long-running containers (EC2, ECS), you may use standard `ioredis` connecting to the Upstash TCP endpoint for lower latency.

## Error Recovery
Upstash HTTP API retries automatically under the hood via the `@upstash/redis` SDK. Ensure your logic handles missing keys gracefully (Redis returns `null` for cache misses).

## Security Notes
Keep the UPSTASH_REDIS_REST_TOKEN secure. Avoid storing highly sensitive PII in Redis without application-level encryption, as it is primarily a fast caching layer.

## Performance Considerations
REST overhead adds ~10-20ms of latency compared to raw TCP. For extremely high-throughput data pipelines, consider Upstash Kafka instead of Redis Pub/Sub to guarantee message durability.

## Testing Guidance
Use a separate Upstash database for integration tests, or mock the REST endpoints using generic JSON responses.

## Troubleshooting
If data disappears unexpectedly, ensure you are not hitting the memory limit of your free tier, which triggers the LRU (Least Recently Used) eviction policy.

## References
- [Redis API Docs](https://docs.upstash.com/redis)

## Related Skills
- [Vercel](/skills/vercel)
- [Cloudflare](/skills/cloudflare)
- [OpenAI](/skills/openai)

## Why use this skill
Use this when your agent works with **upstash** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing column names or schema fields
- Using deprecated driver methods or wrong connection strings
- Omitting connection pooling or transaction boundaries

## Production checklist
- [ ] Migrations version-controlled and applied via CI
- [ ] Connection limits and pooling configured
- [ ] Backups and restore procedure documented

## Related skills
- [`vercel`](../vercel/SKILL.md) — related to
- [`cloudflare`](../cloudflare/SKILL.md) — related to
- [`openai`](../openai/SKILL.md) — related to
