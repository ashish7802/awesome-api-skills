# Weaviate Vector Database API Skill

## Overview
Weaviate is an open-source AI vector search engine designed for scalable semantic search, multi-modal embeddings, and Retrieval-Augmented Generation (RAG).

## Installation
```bash
npm install weaviate-client
pip install weaviate-client
```

## Connecting to Weaviate
```typescript
import weaviate, { type WeaviateClient } from 'weaviate-client';

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_URL!,
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY!,
    },
  }
);
```

## Core API Operations

### 1. Create Collection with Vectorizer
```typescript
const articles = await client.collections.create({
  name: 'Article',
  vectorizers: weaviate.configure.vectorizer.text2vecOpenAI({
    model: 'text-embedding-3-small',
  }),
  generative: weaviate.configure.generative.openAI(),
});
```

### 2. Hybrid Search (Vector + BM25 Keyword)
```typescript
const myCollection = client.collections.get('Article');

const response = await myCollection.query.hybrid('neural search and indexing', {
  limit: 5,
  alpha: 0.75, // 0.75 vector, 0.25 keyword BM25
  returnProperties: ['title', 'content', 'category'],
});

for (const obj of response.objects) {
  console.log(obj.properties.title, 'Score:', obj.metadata?.score);
}
```

### 3. Generative Search (RAG in single query)
```typescript
const ragResponse = await myCollection.generate.nearText('distributed vector database', {
  singlePrompt: 'Summarize key benefits of {title} in two sentences.',
  limit: 3,
});
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **v3 Collections API**: Modern `weaviate-client` uses `client.collections.get('Name')` instead of `client.graphql.get()`.
- **Alpha Parameter**: In `hybrid` queries, `alpha=0` performs pure BM25 search, `alpha=1` performs pure vector search, and `alpha=0.5` balances both equally.

## Production Verification Checklist
- [ ] Connect credentials validated against Weaviate Cloud cluster
- [ ] Hybrid search alpha tuned for domain terminology
- [ ] API key headers passed for text2vec/generative providers

---
> **Last Verified:** 2026-07-03
