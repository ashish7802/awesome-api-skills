---
title: redis
---

# redis

<p class="skill-meta">Databases</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://redis.io/commands/) |

</div>


## Graph

- **depends on** ← [bullmq](/skills/bullmq)
- **works well with** ← [express](/skills/express)
- **integrates with** ← [jwt](/skills/jwt)
- **related to** ← [nats](/skills/nats)
- **depends on** ← [redis-streams](/skills/redis-streams)

---

# Redis API Skill

## Overview
Redis is used as a database, cache, and message broker. This skill covers the `redis` (Node.js) and `redis-py` libraries.

## Installation
```bash
npm install redis
pip install redis
```

## Authentication
Uses a connection URL `redis://user:password@host:port`. Redis 6+ supports ACLs (Access Control Lists) for fine-grained permissions.

## Core Concepts
- **Keys**: The string identifier for data.
- **TTL (Time to Live)**: Expiration time for a key.
- **Pub/Sub**: Publish/Subscribe messaging paradigm.

## Common Workflows
1. `createClient({ url })`.
2. `await client.connect()`.
3. `await client.set('key', 'value', { EX: 3600 })`.

## Error Handling
Handle connection drops. The Node SDK v4+ automatically reconnects. Catch command errors if passing invalid types (e.g., trying to HGET a string).

## Security
Never expose Redis directly to the public internet. Ensure `requirepass` is set or use managed services like ElastiCache with TLS.

## Rate Limits
Redis is bound by CPU and Memory, not API limits. It handles 100,000+ operations per second easily.

## Best Practices
Always set a TTL (`EX` or `PX`) on cache keys to prevent memory exhaustion (OOM). Use pipelining (`client.multi()`) to batch commands and reduce RTT latency.

## Troubleshooting
If memory fills up, verify your eviction policy (`maxmemory-policy`) is set to `allkeys-lru` or `volatile-lru` rather than `noeviction`.

## References
- [API Reference](https://redis.io/commands/)

## Why use this skill
Use this when your agent works with **redis** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing column names or schema fields
- Using deprecated driver methods or wrong connection strings
- Omitting connection pooling or transaction boundaries

## Production checklist
- [ ] Migrations version-controlled and applied via CI
- [ ] Connection limits and pooling configured
- [ ] Backups and restore procedure documented

## Related skills
- No graph relationships yet — see the knowledge graph in the docs site.

---
> **Last Verified:** 2026-07-02

