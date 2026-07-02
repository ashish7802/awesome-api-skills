# Shopify Admin API API Skill

## Overview
The Shopify Admin API allows you to manage products, orders, and customers. This skill focuses on the GraphQL API using the `@shopify/shopify-api` package.

## Installation
```bash
npm install @shopify/shopify-api
```

## Authentication
Custom apps use an Admin API Access Token (`X-Shopify-Access-Token` header). Public apps use OAuth 2.0.

## Core Concepts
- **Global ID (GID)**: GraphQL identifier (e.g., `gid://shopify/Product/123`).
- **Bulk Operations**: Used to extract massive datasets efficiently.
- **Webhooks**: Subscriptions to store events.

## Common Workflows
1. Initialize Shopify client with credentials.
2. Construct a GraphQL query.
3. Call `client.graphql(query, variables)`.

## Error Handling
Handle `userErrors` inside the GraphQL payload. Unlike REST, GraphQL often returns HTTP 200 even if the mutation fails; check the payload fields.

## Security
Validate all incoming Shopify Webhooks using the HMAC signature (`X-Shopify-Hmac-Sha256`).

## Rate Limits
GraphQL uses a Calculated Query Cost limit (50 points/sec). Complex queries cost more.

## Best Practices
Use GraphQL instead of REST. REST is slower and prone to over-fetching. Use Bulk Operations for exports larger than 250 items.

## Troubleshooting
If you receive 'Access denied' on a valid query, verify your Admin API Token was generated with the correct Access Scopes (e.g., `write_products`).

## References
- [API Reference](https://shopify.dev/docs/api/admin-graphql)

## Why use this skill
Use this when your agent works with **shopify** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Mixing test and live API keys in the same code path
- Retrying POST requests without idempotency keys
- Hardcoding currency or amount formats incorrectly

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`nextjs`](../nextjs/SKILL.md) — integrates with
- [`stripe`](../stripe/SKILL.md) — works well with

---
> **Last Verified:** 2026-07-02
