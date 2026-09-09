# Qdrant Vector Database API Skill

## Overview
Qdrant is a production-grade vector similarity search engine with extended payload-based filtering, hybrid search (dense + sparse vectors), and multi-tenant collection partitioning.

## Installation
```bash
npm install @qdrant/js-client-rest
pip install qdrant-client
```

## Authentication
Connect using API keys for Qdrant Cloud or direct endpoint URLs for self-hosted instances.

```typescript
import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
  url: process.env.QDRANT_URL || 'http://localhost:6333',
  apiKey: process.env.QDRANT_API_KEY,
});
```

## Core API Operations

### 1. Create Collection
```typescript
await client.createCollection('knowledge-base', {
  vectors: {
    size: 1536, // Match embedding model dimension
    distance: 'Cosine',
  },
  optimizers_config: {
    default_segment_number: 2,
  },
  replication_factor: 2,
});
```

### 2. Upsert Vector Points with Metadata Payload
```typescript
await client.upsert('knowledge-base', {
  wait: true,
  points: [
    {
      id: 'doc-uuid-101',
      vector: [0.012, -0.043, 0.089 /* 1536 dimensions */],
      payload: {
        document_id: 'doc-101',
        title: 'Qdrant Architecture Overview',
        tenant_id: 'team_alpha',
        tags: ['vector-db', 'ai'],
        created_at: Date.now(),
      },
    },
  ],
});
```

### 3. Vector Similarity Search with Payload Filtering
```typescript
const searchResults = await client.search('knowledge-base', {
  vector: queryEmbeddingVector,
  limit: 5,
  filter: {
    must: [
      { key: 'tenant_id', match: { value: 'team_alpha' } },
      { key: 'tags', match: { any: ['ai'] } },
    ],
  },
  with_payload: true,
  score_threshold: 0.75,
});
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Dimension Mismatches**: Do not assume 1536 dimensions; verify if the embedding model outputs 768, 1536, or 3072 dimensions.
- **Unindexed Payload Filters**: Queries with `filter` on non-indexed payload fields trigger full collection scans on large datasets. Always call `createPayloadIndex`.
- **Client Bundling**: Never instantiate `QdrantClient` with write API keys in client-side React/Vue components.

## Production Verification Checklist
- [ ] Collection vector distance metric matches the embedding model (Cosine for normalized embeddings, Dot/Euclid otherwise)
- [ ] Multi-tenant isolation verified with tenant filtering rules
- [ ] Write operations set `wait: true` or handle async acknowledgement
- [ ] Payload indexes created for frequently filtered attributes

---
> **Last Verified:** 2026-07-03
