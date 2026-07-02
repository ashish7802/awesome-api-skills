# Vercel API API Skill

## Overview
The Vercel REST API allows you to programmatically manage deployments, domains, and environment variables.

## Installation
```bash
# Standard fetch/axios is used for REST API
npm install @vercel/client
```

## Authentication
Authenticate using a Vercel Access Token sent in the `Authorization: Bearer <TOKEN>` header.

## Core Concepts
- **Deployment**: An immutable build of your project.
- **Project**: A logical grouping of deployments.
- **Aliases**: Custom domains assigned to specific deployments.

## Common Workflows
1. Call `/v13/deployments` to trigger a build.
2. Poll the deployment status.
3. Assign an alias once READY.

## Error Handling
Handle HTTP 400 for validation errors, 403 for missing permissions. Review the `error.code` string (e.g., `not_found`).

## Security
Scope your tokens carefully (Personal vs Team). Do not embed Vercel tokens in frontend apps.

## Rate Limits
Standard limit is 100 requests per 10 seconds per user.

## Best Practices
When fetching deployments, heavily utilize query parameters like `?limit=10` and `?projectId=` to reduce payload sizes.

## Troubleshooting
If a deployment triggers but immediately fails, check the framework preset settings in your project configuration.

## References
- [API Reference](https://vercel.com/docs/rest-api)

## Why use this skill
Use this when your agent works with **vercel** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- No graph relationships yet — see the knowledge graph in the docs site.

---
> **Last Verified:** 2026-07-02
