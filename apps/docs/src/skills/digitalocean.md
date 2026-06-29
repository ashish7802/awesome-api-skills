---
title: digitalocean
---

# digitalocean

<p class="skill-meta">Cloud</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-06-29 |
| **Languages** | typescript, python, go |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://docs.digitalocean.com/reference/api/) |

</div>


## Graph

- **related to** → [aws s3](/skills/aws s3)
- **related to** → [render](/skills/render)

---

# DigitalOcean API Skill

## Quick Start
DigitalOcean provides Droplets (VPS), Managed Databases, and App Platform. The official API allows full programmatic control over your cloud infrastructure.

```bash
npm install doctl
```

## Common Workflows
### Programmatic Backups and Snapshots
Automate Droplet snapshots before performing major system upgrades. Call the Actions API to trigger a snapshot, poll the Action ID for completion, and proceed with the upgrade.

## Production Patterns
### Floating IPs
For high availability, associate a Floating IP with your primary Droplet. If the primary goes down, use the API to immediately reassign the Floating IP to your standby Droplet without waiting for DNS propagation.

## Error Recovery
Handle HTTP 404s when polling Action endpoints to ensure the Action hasn't been purged. For HTTP 429 (Rate Limit), inspect the `RateLimit-Reset` header to calculate the exact wait time before retrying.

## Security Notes
Restrict API tokens by generating them with explicitly narrowed scopes (e.g., read-only). Use VPCs to isolate backend database Droplets from public internet exposure.

## Performance Considerations
Creating Droplets takes ~60 seconds. Do not block web threads waiting for Droplet creation; handle infrastructure provisioning asynchronously via background workers (e.g., Redis queues).

## Testing Guidance
Do not run E2E tests against live production Droplets. Use the API to spawn a temporary Droplet, run tests, and immediately destroy it to save costs.

## Troubleshooting
If SSH fails after creating a Droplet via API, ensure you passed the correct `ssh_keys` array (using SSH Key IDs) in the creation payload.

## References
- [DigitalOcean API](https://docs.digitalocean.com/reference/api/)

## Related Skills
- [AWS S3](/skills/aws s3)
- [Render](/skills/render)

## Why use this skill
Use this when your agent works with **digitalocean** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`aws s3`](../aws s3/SKILL.md) — related to
- [`render`](../render/SKILL.md) — related to

