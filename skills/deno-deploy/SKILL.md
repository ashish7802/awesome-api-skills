# Deno Deploy Skill

> Distributed system that runs JavaScript, TypeScript, and WebAssembly at the edge.

## Ecosystem Graph Preview

```mermaid
graph LR
  deno-deploy["deno-deploy"]:::core
  classDef core fill:#f9f,stroke:#333,stroke-width:4px;
  deno-deploy -- "alternative to" --> cloudflare-workers
  deno-deploy -- "works well with" --> hono
```

## Recommended Next Skills

- **[cloudflare-workers](/skills/cloudflare-workers)** (Score: 0.82)
  *Why: Direct relationship, Both are Cloud, Shared ecosystem (javascript), Similar network profile*
- **[hono](/skills/hono)** (Score: 0.62)
  *Why: Direct relationship, Shared ecosystem (javascript), Similar network profile*
- **[biome](/skills/biome)** (Score: 0.3)
  *Why: Both are Developer Tools, Shared ecosystem (javascript)*

## Quick Start
Deno Deploy natively executes TypeScript without any build step or compilation required. It isolates tenants using V8 isolates, providing incredible speed and security.

```bash
deloyctl deploy --project=my-project main.ts
```

## Production Patterns
### Deno KV
Use Deno KV for global, strongly consistent database storage built directly into the runtime. It requires zero configuration and provides ACID transactions.

## Architecture & Scaling
### Web Standard Modules
Deno completely ignores Node.js `node_modules` and `package.json`. You import modules directly via URLs (e.g., `import { serve } from 'https://deno.land/std/http/server.ts'`).

## Error Recovery
Deno strictly adheres to web standards. If an unhandled promise rejection occurs, the V8 isolate crashes. Always `await` and `catch` asynchronous network calls.

## Security Notes
Deno is secure by default. Even when running locally, it cannot access the disk, network, or environment variables unless you explicitly pass flags (e.g., `--allow-net`).

## References
- [Deno Deploy Docs](https://deno.com/deploy/docs)

## Why use this skill
Use this when your agent works with **deno-deploy** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Referencing CLI flags or config keys that do not exist
- Using outdated major versions of tools
- Skipping lockfile or version pinning in examples

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`cloudflare-workers`](../cloudflare-workers/SKILL.md) — alternative to
- [`hono`](../hono/SKILL.md) — works well with

---
> **Last Verified:** 2026-07-02
