# Sentry API Skill

## Overview
Sentry tracks exceptions, traces, and crashes. This skill covers the `@sentry/node` integration for backend error capturing and the Sentry REST API for release management.

## Installation
```bash
npm install @sentry/node @sentry/profiling-node
pip install sentry-sdk
```

## Authentication
Client SDKs use a DSN (Data Source Name). The REST API uses a Bearer token generated from the Sentry Auth token settings.

## Core Concepts
- **DSN**: The ingestion endpoint URL.
- **Release**: A version of your code attached to events for regression tracking.
- **Transaction**: A logical grouping of spans for performance tracing.

## Common Workflows
1. Call `Sentry.init({ dsn })` early in the application lifecycle.
2. Wrap controllers or use framework middleware.
3. Call `Sentry.captureException(error)` for handled exceptions.

## Error Handling
The Sentry SDK fails silently on network errors so it does not crash your application.

## Security
Use the `beforeSend` hook to scrub PII (Passwords, SSNs, Auth Tokens) before the payload leaves your server.

## Rate Limits
Event ingestion is limited by your organization's quota. Exceeding it results in dropped events (HTTP 429).

## Best Practices
Always set the `release` and `environment` tags during `Sentry.init` to enable accurate issue tracking across deployments.

## Troubleshooting
If source maps aren't working, ensure the `@sentry/cli` or Webpack plugin uploaded the artifacts for the exact `release` string matching your deployed code.

## References
- [API Reference](https://docs.sentry.io/api/)
