# Render API Skill

## Quick Start
Render offers Web Services, Static Sites, and managed PostgreSQL/Redis. The Render REST API allows you to automate infrastructure scaling, deploys, and service creation.

```bash
  # Standard fetch/axios is used for REST API
```

## Common Workflows
### Blue/Green Deployments
While Render handles zero-downtime deploys natively, you can use the REST API to explicitly create a staging Web Service, wait for it to report `live`, and then update custom routing rules or swap DNS.

## Production Patterns
### Auto-Scaling
While Render supports native auto-scaling, you can implement custom metric-driven scaling by monitoring Datadog metrics and calling the Render API `PATCH /services/{serviceId}` to dynamically adjust instances.

## Error Recovery
Handle HTTP 422 for configuration validation errors and HTTP 429 for rate limits. Monitor the `deployId` status endpoint and rollback manually if the status transitions to `build_failed`.

## Security Notes
Render API tokens are highly privileged. Use Infrastructure as Code (like Terraform with the Render provider) to manage production configurations safely rather than raw API calls where possible.

## Performance Considerations
API responses containing lists of services or deploys are paginated. Always respect the `cursor` in the query parameters to fetch complete datasets.

## Testing Guidance
Use the Preview Environments feature integrated with GitHub rather than manually creating transient services via the API for testing.

## Troubleshooting
If a Web Service deploys but is unreachable, verify the 'Start Command' is correct and that the app binds to `0.0.0.0`.

## References
- [Render API](https://docs.render.com/api)

## Related Skills
- [Railway](/skills/railway)
- [Fly.io](/skills/fly.io)

## Why use this skill
Use this when your agent works with **render** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`railway`](../railway/SKILL.md) — related to
- [`fly.io`](../fly.io/SKILL.md) — related to

---
> **Last Verified:** 2026-07-02
