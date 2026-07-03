# Xquik API Skill

## Quick Start

Xquik provides REST APIs and SDKs for X/Twitter data workflows: tweet lookup, search, user profiles, communities, lists, trends, media, monitors, webhooks, and write actions.

```bash
npm install x-twitter-scraper@0.3.3
pip install x-twitter-scraper==0.4.1
```

## Common Workflows

### Read X/Twitter Data

Use the public OpenAPI spec to choose the endpoint for tweet search, tweet lookup, user lookup, follower checks, trends, communities, lists, or media workflows. Preserve IDs as strings and store capture timestamps with any research output.

### Monitor Accounts And Keywords

Use monitor endpoints when the integration needs repeated account or keyword tracking. Route downstream notifications through webhooks and keep delivery handlers idempotent.

### Build Analytics Dashboards

Normalize tweet, user, trend, community, and monitor records before inserting them into analytics tables. Keep pagination cursors with the captured batch so jobs can resume without duplicating rows.

## Production Patterns

Use the official OpenAPI spec as the source of truth for endpoint paths, request bodies, and response contracts. Prefer the generated SDK for the target language when available, and keep any raw HTTP client behind a narrow adapter.

For paginated endpoints, persist `next_cursor` or the endpoint-specific cursor field with the job state. Retry transient 429 and 5xx responses with exponential backoff and a maximum retry budget.

## Error Recovery

Handle structured API errors by status code and response body. Treat 401 and 403 as credential or permission issues, 429 as a rate-limit signal, and 5xx responses as transient service failures that may be retried.

## Security Notes

Store API keys in environment variables or an approved credential store. Do not print keys in logs, test output, traces, or issue comments. Redact authorization headers before persisting request diagnostics.

## Testing Guidance

Use fixture JSON for parser and normalization tests. For live smoke tests, call a low-impact read endpoint with a scoped key from the runtime environment and assert response shape rather than full payload values.

## Troubleshooting

If requests fail, verify the base URL, authentication header, endpoint path, pagination cursor, and selected response contract. Re-check the public OpenAPI spec before assuming an endpoint has changed.

## References

- [API Reference](https://docs.xquik.com)
- [OpenAPI Spec](https://xquik.com/openapi.json)
- [MCP Manifest](https://xquik.com/.well-known/mcp.json)
- [TypeScript SDK](https://github.com/Xquik-dev/x-twitter-scraper-typescript)
- [Python SDK](https://github.com/Xquik-dev/x-twitter-scraper-python)

## Related Skills

- [OpenAPI](/skills/openapi)
- [GitHub](/skills/github)
- [PostgreSQL](/skills/postgresql)
- [Playwright](/skills/playwright)

## Why Use This Skill

Use this when your agent works with **Xquik** and needs source-backed X/Twitter API integration guidance instead of guessing endpoint names, cursor behavior, or response fields.

## AI Pitfalls

- Inventing endpoint paths instead of checking the OpenAPI spec
- Treating numeric X/Twitter IDs as numbers instead of strings
- Dropping pagination cursors during batch jobs
- Logging API keys or authorization headers during debugging

## Production Checklist

- [ ] API keys come from environment variables or approved credential storage
- [ ] Pagination cursors are persisted for resumable jobs
- [ ] 429 and 5xx responses use bounded retries
- [ ] Test fixtures cover parser and normalization logic
- [ ] Public docs and OpenAPI are checked before changing endpoint assumptions

## Related Skills

- [`github`](../github/SKILL.md) - related to
- [`postgresql`](../postgresql/SKILL.md) - works well with
- [`playwright`](../playwright/SKILL.md) - works well with

---
> **Last Verified:** 2026-07-03
