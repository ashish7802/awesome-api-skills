---
title: plaid
---

# plaid

<p class="skill-meta">Payments · Finance</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://plaid.com/docs/api/) |

</div>


## Graph

- **works well with** → [stripe](/skills/stripe)

---

# Plaid API Skill

## Overview
Plaid connects users' bank accounts to apps. This skill focuses on Plaid Link flow and the `plaid-node` SDK to extract transaction data.

## Installation
```bash
npm install plaid
pip install plaid-python
```

## Authentication
Requires three keys: `client_id`, `secret`, and `environment` (sandbox, development, production). Secrets must never reach the client.

## Core Concepts
- **Link Token**: A short-lived token to initialize the client-side Plaid Link UI.
- **Public Token**: Returned by Plaid Link, exchanged for an Access Token.
- **Access Token**: The permanent token representing a connected bank item.

## Common Workflows
1. Create Link Token (Server).
2. User completes Plaid Link (Client).
3. Exchange Public Token for Access Token (Server).
4. Fetch Transactions (Server).

## Error Handling
Handle `PlaidError`. Pay close attention to `ITEM_LOGIN_REQUIRED`; it means the bank forces the user to re-authenticate via Plaid Link (Update mode).

## Security
Store Access Tokens securely (encrypted at rest). Treat them with the same sensitivity as a user password.

## Rate Limits
Transactions endpoints are heavily rate-limited to prevent abuse on banking infrastructure. Fetch data asynchronously using Plaid Webhooks instead of polling.

## Best Practices
Rely exclusively on Webhooks (e.g., `SYNC_UPDATES_AVAILABLE`) to know when to call the Transactions Sync API.

## Troubleshooting
If transactions are missing, ensure you are using the `/transactions/sync` endpoint (Cursor-based) rather than the legacy `/transactions/get` endpoint.

## References
- [API Reference](https://plaid.com/docs/api/)

## Why use this skill
Use this when your agent works with **plaid** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing webhook event names not in the vendor catalog
- Using secret keys in client-side or browser code
- Skipping signature verification on webhook payloads

## Production checklist
- [ ] Webhook signatures verified on raw request body
- [ ] Idempotency keys on mutating requests
- [ ] Test and live keys isolated by environment

## Related skills
- [`stripe`](../stripe/SKILL.md) — works well with

---
> **Last Verified:** 2026-07-02

