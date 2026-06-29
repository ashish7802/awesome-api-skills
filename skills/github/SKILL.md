# GitHub REST API API Skill

## Overview
The GitHub REST API (v3) allows deep integration with Git data, pull requests, and GitHub Actions. This skill emphasizes the Octokit SDK.

## Installation
```bash
npm install octokit
pip install PyGithub
```

## Authentication
Use Personal Access Tokens (Classic or Fine-grained) passed as Bearer tokens. Fine-grained PATs are highly recommended for least-privilege access.

## Core Concepts
- **Octokit**: The official SDK.
- **Refs**: Git references (branches/tags).
- **Checks**: Status reports for commits (used by CI).

## Common Workflows
1. Authenticate Octokit.
2. Call `octokit.rest.pulls.create` to open a PR.
3. Request reviewers via `octokit.rest.pulls.requestReviewers`.

## Error Handling
Handle `HttpError`. Status `404` often indicates missing permissions (due to token scope) rather than a truly missing resource.

## Security
Never store PATs in source code. Use GitHub Apps for server-to-server integrations rather than service accounts.

## Rate Limits
Authenticated requests are limited to 5,000 per hour. Search API is limited to 30 requests per minute.

## Best Practices
Use GraphQL for deeply nested data retrieval to save REST calls. Use the `If-None-Match` header to utilize conditional requests (saves rate limits).

## Troubleshooting
If Actions fail to trigger via API, ensure your token has the `workflow` scope.

## References
- [API Reference](https://docs.github.com/en/rest)

## Why use this skill
Use this when your agent works with **github** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Referencing CLI flags or config keys that do not exist
- Using outdated major versions of tools
- Skipping lockfile or version pinning in examples

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- No graph relationships yet — see the knowledge graph in the docs site.
