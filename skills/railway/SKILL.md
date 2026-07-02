# Railway API Skill

## Quick Start
Railway allows you to deploy code simply by pushing to GitHub or using the CLI. The Railway Public API (GraphQL) allows programmatic management of projects, environments, and deployments.

```bash
npm install -g @railway/cli
```

## Common Workflows
### Environment Synchronization
Use the Railway CLI (`railway run`) to pull production or staging environment variables down to your local machine instantly, eliminating the need to manage `.env` files manually.

## Production Patterns
### Programmatic Deployments
Use the Railway GraphQL API to dynamically spin up new environments for Pull Requests, deploy specific images, and tear them down once the PR is merged.

## Error Recovery
GraphQL errors are returned in the `errors` array of the response. Implement exponential backoff if you encounter rate limits when rapidly provisioning multiple services.

## Security Notes
Generate Project Tokens for API access rather than Personal Tokens when automating CI/CD pipelines to restrict the blast radius to a single project.

## Performance Considerations
Railway automatically manages Nixpacks builds. If your build is slow, provide a custom `nixpacks.toml` or `Dockerfile` to aggressively cache dependencies.

## Testing Guidance
You can test deployment configurations entirely locally using `railway up --detach` linked to a sandbox project before applying changes to production.

## Troubleshooting
If a deployment fails the health check, ensure your application is binding to the correct port (Railway injects the `PORT` environment variable) and `0.0.0.0` rather than `localhost`.

## References
- [Railway API](https://docs.railway.app/reference/public-api)

## Related Skills
- [Render](/skills/render)
- [Fly.io](/skills/fly.io)
- [GitHub](/skills/github)

## Why use this skill
Use this when your agent works with **railway** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`render`](../render/SKILL.md) — related to
- [`fly.io`](../fly.io/SKILL.md) — related to
- [`github`](../github/SKILL.md) — related to

---
> **Last Verified:** 2026-07-02
