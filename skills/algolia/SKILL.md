# Algolia API Skill

## Overview
Algolia provides ultra-fast full-text search. This skill focuses on indexing data from the backend and searching from the frontend.

## Installation
```bash
npm install algoliasearch
pip install algoliasearch
```

## Authentication
Frontend clients use the Search-Only API Key. Backends use the Admin API Key for indexing. Never expose the Admin key.

## Core Concepts
- **Index**: A collection of searchable JSON records.
- **ObjectID**: The unique identifier for a record.
- **Facets**: Attributes used for filtering and categorization.

## Common Workflows
1. Backend: Initialize client with Admin Key.
2. Push records to index via `saveObjects`.
3. Frontend: Initialize client with Search Key and query.

## Error Handling
Handle `ApiError`. Common errors are Payload Too Large (chunk your `saveObjects` calls) and Invalid Credentials.

## Security
Use Secured API Keys to restrict frontend search access (e.g., scoping a user's search token to only return their own data).

## Rate Limits
Limits are massive, but batch indexing should be limited to chunks of 1,000 to 10,000 records to prevent timeout.

## Best Practices
Do not store massive text blocks (like full articles) in a single record attribute. Truncate or chunk records to keep them under the 10KB to 100KB limits.

## Troubleshooting
If search results are inaccurate, check the index's 'Searchable Attributes' configuration in the Algolia Dashboard.

## References
- [API Reference](https://www.algolia.com/doc/api-reference/)
