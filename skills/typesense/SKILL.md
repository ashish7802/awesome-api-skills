# Typesense API Skill

## Quick Start
Typesense is a RAM-based search engine built in C++. It requires explicitly defining your schema before indexing data.

```bash
npm install typesense
```

## Common Workflows
### Schema Definition
Unlike Meilisearch, Typesense requires defining a rigid schema (Collection) upfront. Define fields, their data types, and whether they are faceted. Then, upload JSON documents that strictly adhere to this schema.

## Production Patterns
### High Availability (HA)
Typesense natively supports clustering via Raft consensus. When initializing the client, pass an array of `nodes` rather than a single host. The Typesense SDK automatically load-balances reads and handles node failures.

## Error Recovery
Handle `TypesenseError`. The SDK will automatically retry requests across the cluster if a node is unresponsive. However, schema validation errors during indexing (`HTTP 400`) require application-level data sanitization.

## Security Notes
Use Scoped Search API Keys to generate temporary, restricted keys for frontend clients. Never expose the Admin API key to the frontend.

## Performance Considerations
Because Typesense holds the entire search index in RAM, monitor memory usage closely. Use the `import` endpoint (JSONL format) instead of individual `create` requests when migrating millions of records to avoid HTTP overhead.

## Testing Guidance
Run the Typesense Docker image in your test pipeline. It boots in under 1 second, making it ideal for ephemeral test environments.

## Troubleshooting
If search results are empty, verify that the fields you are searching against are explicitly defined in the schema and that `index: true` is set for those fields.

## References
- [Typesense API](https://typesense.org/docs/)

## Related Skills
- [Meilisearch](/skills/meilisearch)
- [Algolia](/skills/algolia)

## Why use this skill
Use this when your agent works with **typesense** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing column names or schema fields
- Using deprecated driver methods or wrong connection strings
- Omitting connection pooling or transaction boundaries

## Production checklist
- [ ] Migrations version-controlled and applied via CI
- [ ] Connection limits and pooling configured
- [ ] Backups and restore procedure documented

## Related skills
- [`meilisearch`](../meilisearch/SKILL.md) — related to
- [`algolia`](../algolia/SKILL.md) — related to
