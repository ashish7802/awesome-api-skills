# Okta API Skill

## Overview
The Okta API manages workforce and customer identities. This skill covers the `@okta/okta-sdk-nodejs` library for backend lifecycle management.

## Installation
```bash
npm install @okta/okta-sdk-nodejs
pip install okta
```

## Authentication
Use an SSWS (Secure Socket Web Server) API Token provided in the `Authorization: SSWS <token>` header.

## Core Concepts
- **User**: An identity in the Universal Directory.
- **Group**: Logical collection of users.
- **Application**: An integration (SAML/OIDC) users can access.

## Common Workflows
1. Instantiate `Client`.
2. Fetch a user via `client.getUser(id)`.
3. Modify profile attributes and call `user.update()`.

## Error Handling
Handle `OktaApiError`. Pay attention to the `errorCauses` array for specific field validation failures during user creation.

## Security
SSWS Tokens are long-lived and bypass MFA. Store them in secure vaults (e.g., AWS Secrets Manager) and rotate them regularly.

## Rate Limits
Limits are concurrent and per-endpoint. Core endpoints (like `/api/v1/users`) have high limits, while search endpoints have strict limits.

## Best Practices
Use pagination for querying users (`collection.each()`) to avoid loading millions of records into memory.

## Troubleshooting
If a user is locked out, ensure you are calling the `/api/v1/users/{id}/lifecycle/unlock` endpoint correctly.

## References
- [API Reference](https://developer.okta.com/docs/reference/)

## Why use this skill
Use this when your agent works with **okta** — structured patterns beat pasted docs and prevent common hallucinations.

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
