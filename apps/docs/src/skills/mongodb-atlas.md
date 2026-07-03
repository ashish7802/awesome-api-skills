---
title: mongodb-atlas
---

# mongodb-atlas

<p class="skill-meta">Databases · Cloud</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://www.mongodb.com/docs/atlas/reference/api-resources/) |

</div>


## Graph

- **integrates with** → [prisma](/skills/prisma)

---

# MongoDB Atlas API Skill

## Overview
The Atlas Administration API allows you to programmatically manage clusters, database users, and network peering.

## Installation
```bash
  # Standard fetch/axios is used for REST API
```

## Authentication
Atlas uses HTTP Digest Authentication. You must generate Programmatic API Keys (Public and Private keys).

## Core Concepts
- **Project**: A logical grouping of clusters.
- **Cluster**: A MongoDB deployment.
- **IP Access List**: Network security firewall rules.

## Common Workflows
1. Generate API Keys in the Atlas UI.
2. Perform an HTTP Digest Auth request.
3. Provision or scale a cluster.

## Error Handling
Handle HTTP 401 for Auth failures. For HTTP 400s, parse the `detail` property in the JSON response to understand the specific validation error.

## Security
Restrict Programmatic API keys to specific IP addresses. Assign the 'Project Read Only' role unless mutation is explicitly required.

## Rate Limits
Atlas API is limited to 100 requests per minute per project.

## Best Practices
Automate IP Access List management if your deployment environment (like GitHub Actions) uses dynamic IP ranges.

## Troubleshooting
If requests fail with 401 Unauthorized, ensure your HTTP client properly implements the Digest Auth handshake (which requires two round trips).

## References
- [API Reference](https://www.mongodb.com/docs/atlas/reference/api-resources/)

## Why use this skill
Use this when your agent works with **mongodb-atlas** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing column names or schema fields
- Using deprecated driver methods or wrong connection strings
- Omitting connection pooling or transaction boundaries

## Production checklist
- [ ] Migrations version-controlled and applied via CI
- [ ] Connection limits and pooling configured
- [ ] Backups and restore procedure documented

## Related skills
- [`prisma`](../prisma/SKILL.md) — integrates with

---
> **Last Verified:** 2026-07-02

