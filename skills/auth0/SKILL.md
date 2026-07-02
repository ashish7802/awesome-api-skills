# Auth0 API Skill

## Overview
Auth0 provides Authentication as a Service. This skill focuses on the Management API for backend operations (users, roles, permissions).

## Installation
```bash
npm install auth0
pip install auth0-python
```

## Authentication
Authenticate against the Management API using an OAuth2 Machine-to-Machine (M2M) token fetched from your tenant's `/oauth/token` endpoint.

## Core Concepts
- **Tenant**: Your isolated Auth0 instance.
- **Connection**: A source of users (e.g., Database, Google OAuth).
- **Rules/Actions**: Serverless functions triggered during authentication.

## Common Workflows
1. Obtain a Management API Token (cache this).
2. Initialize `ManagementClient`.
3. Perform actions like `client.users.update({ id }, data)`.

## Error Handling
Catch API errors. Watch for HTTP 429 (Rate Limit Exceeded) and HTTP 400 (Validation Error, such as invalid password strength).

## Security
Management API tokens have massive power. Ensure they are scoped strictly to the resources they need (e.g., `read:users` rather than `update:users` if only reading).

## Rate Limits
Limits depend on your subscription tier. The Management API is strictly rate-limited; heavily cache user profiles in your own database.

## Best Practices
Do not call the Management API on every user login. Use Auth0 Actions to inject custom claims into the ID Token instead.

## Troubleshooting
If M2M token generation fails, verify that your Machine-to-Machine application is authorized to access the Auth0 Management API resource server.

## References
- [API Reference](https://auth0.com/docs/api/management/v2)

## Why use this skill
Use this when your agent works with **auth0** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`oauth2`](../oauth2/SKILL.md) — implements
- [`openid-connect`](../openid-connect/SKILL.md) — implements
- [`nextjs`](../nextjs/SKILL.md) — integrates with

---
> **Last Verified:** 2026-07-02
