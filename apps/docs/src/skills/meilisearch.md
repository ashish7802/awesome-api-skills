---
title: meilisearch
---

# meilisearch

<p class="skill-meta">Search · Databases</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-06-29 |
| **Languages** | typescript, python, go |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://github.com/meilisearch/meilisearch-js) |

</div>


## Graph

- **related to** → [typesense](/skills/typesense)
- **related to** → [algolia](/skills/algolia)

---

# Meilisearch API Skill

## Quick Start
Meilisearch is an open-source, typo-tolerant search engine optimized for developer experience.

```bash
npm install meilisearch
```

## Common Workflows
### Indexing and Searching
Add JSON documents to an index. Meilisearch automatically infers the schema. From the frontend or backend, query the index. It natively handles typos, highlighting, and sorting out of the box.

## Production Patterns
### Primary Keys
Always explicitly define the `primaryKey` when creating an index or passing documents. If omitted, Meilisearch will attempt to infer it (looking for `id`), which can lead to unpredictable behavior if your data uses UUIDs under custom field names.

## Error Recovery
Handle `MeiliSearchCommunicationError`. Indexing in Meilisearch is asynchronous. Pushing documents returns a `taskUid`. You must poll `client.waitForTask(taskUid)` if you need to guarantee the data is searchable before proceeding.

## Security Notes
Generate strict Tenant Tokens to allow frontend clients to search the database directly while enforcing security rules (e.g., restricting a user to only search documents where `owner_id = 123`).

## Performance Considerations
While Meilisearch is extremely fast for reads, pushing thousands of documents individually is slow. Always batch document uploads in arrays of up to 100,000 documents per task to maximize throughput.

## Testing Guidance
You can easily spin up a Meilisearch instance in a Docker container (`getmeili/meilisearch`) for CI/CD integration tests, destroying the container post-test.

## Troubleshooting
If specific fields aren't returning in search results, verify the `displayedAttributes` setting. If filtering fails, ensure the field is explicitly added to `filterableAttributes`.

## References
- [Meilisearch JS](https://github.com/meilisearch/meilisearch-js)

## Related Skills
- [Typesense](/skills/typesense)
- [Algolia](/skills/algolia)

## Why use this skill
Use this when your agent works with **meilisearch** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing column names or schema fields
- Using deprecated driver methods or wrong connection strings
- Omitting connection pooling or transaction boundaries

## Production checklist
- [ ] Migrations version-controlled and applied via CI
- [ ] Connection limits and pooling configured
- [ ] Backups and restore procedure documented

## Related skills
- [`typesense`](../typesense/SKILL.md) — related to
- [`algolia`](../algolia/SKILL.md) — related to

