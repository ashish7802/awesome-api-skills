---
title: fly
---

# fly

<p class="skill-meta">Cloud · DevOps</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python, go |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://fly.io/docs/machines/api/) |

</div>


## Graph

_No graph edges for this skill._

---

# Fly.io API Skill

## Quick Start
Fly.io transforms Docker containers into microVMs running globally. The Machines API allows you to programmatically spawn, pause, and destroy VMs in milliseconds.

```bash
# Fly Machines API operates over standard HTTP REST
```

## Common Workflows
### Fast Machine Provisioning
Instead of scaling via traditional auto-scalers, use the Fly Machines API to launch a new microVM the moment a user requests a heavy workload (e.g., video rendering) and immediately destroy it once the workload completes.

## Production Patterns
### Global Anycast
Fly automatically routes HTTP traffic to the nearest microVM via Anycast. Ensure your database (e.g., Turso or a Fly Postgres read-replica) is also positioned in the same region to avoid cross-country latency penalties.

## Error Recovery
Handle HTTP 503 errors if attempting to start a Machine in a region experiencing hardware capacity constraints. Always implement a fallback region (e.g., `sjc` falling back to `lax`).

## Security Notes
Machines can communicate with each other over an encrypted private IPv6 network (6PN). Do not expose internal microservices to the public internet; restrict their `services` block in the `fly.toml`.

## Performance Considerations
Machines boot incredibly fast (often <300ms), but your application runtime (e.g., a heavy JVM or massive Node.js payload) will dictate the actual cold start time. Optimize your Docker images aggressively.

## Testing Guidance
You can interact with the Fly Machines API locally by utilizing `fly proxy`, which forwards traffic to your private Fly network without exposing it to the public internet.

## Troubleshooting
If a Machine exits immediately after booting, check the logs (`fly logs -m <machine_id>`); this is almost always caused by an application crash (e.g., missing environment variables) rather than a Fly infrastructure issue.

## References
- [Machines API Docs](https://fly.io/docs/machines/api/)

## Related Skills
- [Turso](/skills/turso)
- [Render](/skills/render)

## Why use this skill
Use this when your agent works with **fly** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`turso`](../turso/SKILL.md) — related to
- [`render`](../render/SKILL.md) — related to

---
> **Last Verified:** 2026-07-02

