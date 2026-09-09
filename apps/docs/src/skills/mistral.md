---
title: mistral
---

# mistral

<p class="skill-meta">AI · Developer Tools</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://docs.mistral.ai/api/) |

</div>


## Graph

- **alternative to** → [openai](/skills/openai)
- **integrates with** → [langchain](/skills/langchain)

---


## Overview
Mistral AI provides frontier open and commercial AI models, featuring `mistral-large-latest`, `mistral-small-latest`, `codestral-latest` for coding, and `mistral-embed` for semantic search.

## Installation
```bash
npm install @mistralai/mistralai
pip install mistralai
```

## Authentication & Client Setup
```typescript
import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});
```

## Core API Operations

### 1. Chat Completion with Tool Calling
```typescript
const response = await client.chat.complete({
  model: 'mistral-large-latest',
  messages: [
    { role: 'user', content: 'What is the stock price of AAPL?' },
  ],
  tools: [
    {
      type: 'function',
      function: {
        name: 'getStockPrice',
        description: 'Get the current stock price for a ticker',
        parameters: {
          type: 'object',
          properties: {
            ticker: { type: 'string' },
          },
          required: ['ticker'],
        },
      },
    },
  ],
  toolChoice: 'auto',
});
```

### 2. Code Generation (Codestral)
```typescript
const codeCompletion = await client.chat.complete({
  model: 'codestral-latest',
  messages: [
    { role: 'system', content: 'You are an expert TypeScript developer.' },
    { role: 'user', content: 'Write a debounce function in TypeScript with type generics.' },
  ],
});
```

### 3. Generate Semantic Text Embeddings
```typescript
const embeddings = await client.embeddings.create({
  model: 'mistral-embed',
  inputs: ['Document chunk 1', 'Document chunk 2'],
});

console.log(embeddings.data[0].embedding.length); // 1024
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Codestral Endpoint Confusion**: Codestral has dedicated API keys and rate limits when accessed via `codestral.mistral.ai`.
- **JSON Mode Requirement**: When requesting JSON mode, the word "json" must explicitly appear in the prompt instructions.

## Production Checklist
- [ ] Structured JSON responses verified with Zod
- [ ] Safe fallback for tool calls without infinite agent loops
- [ ] Rate limits handled on embedding batch calls

---
> **Last Verified:** 2026-07-03

