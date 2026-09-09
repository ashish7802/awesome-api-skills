# Cohere API Skill

## Overview
Cohere provides industry-leading semantic search embeddings (Embed v3), document reranking (Rerank v3), and conversational reasoning with citations (Command R+).

## Installation
```bash
npm install cohere-ai
pip install cohere
```

## Authentication & Client Setup
```typescript
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
```

## Core API Operations

### 1. Embed v3 with Mandatory inputType
```typescript
// When embedding documents into vector storage:
const docEmbeddings = await cohere.embed({
  model: 'embed-english-v3.0',
  texts: ['PostgreSQL handles ACID transactions', 'Redis is an in-memory cache'],
  inputType: 'search_document', // Required for Embed v3
});

// When embedding user search query:
const queryEmbedding = await cohere.embed({
  model: 'embed-english-v3.0',
  texts: ['how does Postgres ensure data integrity?'],
  inputType: 'search_query', // Required for Embed v3
});
```

### 2. Rerank Document Candidates (RAG Optimization)
```typescript
const reranked = await cohere.rerank({
  model: 'rerank-english-v3.0',
  query: 'How to configure SSL certificates in Nginx?',
  documents: [
    'Nginx is an HTTP and reverse proxy server.',
    'To configure SSL in Nginx, add ssl_certificate and ssl_certificate_key directives in the server block.',
    'Apache HTTP server uses SSLCertificateFile.',
  ],
  topN: 2,
});

console.log(reranked.results);
```

### 3. Command R+ Chat with Citations
```typescript
const response = await cohere.chat({
  model: 'command-r-plus',
  message: 'Explain zero-knowledge rollups.',
  documents: [
    { title: 'ZK Rollups', snippet: 'ZK-rollups bundle transactions into a single cryptographic proof.' },
  ],
});

console.log(response.text);
console.log(response.citations);
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Missing inputType**: Failing to pass `inputType: 'search_document'` or `'search_query'` will result in a 400 validation error in Embed v3.
- **Rerank Format**: Ensure `documents` passed to `rerank` are either strings or objects with a `text` property.

## Production Verification Checklist
- [ ] `inputType` verified across indexing and query pipelines
- [ ] Cohere Rerank layer integrated after initial vector search
- [ ] Citations mapped to source document IDs in UI

---
> **Last Verified:** 2026-07-03
