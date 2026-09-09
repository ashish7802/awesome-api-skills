---
title: deepseek
---

# deepseek

<p class="skill-meta">AI · Machine Learning</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://platform.deepseek.com/api-docs) |

</div>


## Graph

- **alternative to** → [openai](/skills/openai)
- **integrates with** → [langchain](/skills/langchain)

---


## Overview
DeepSeek provides state-of-the-art open reasoning and conversational language models via an OpenAI-compatible REST API. Key models include `deepseek-chat` (DeepSeek-V3) and `deepseek-reasoner` (DeepSeek-R1).

## Installation
```bash
npm install openai
pip install openai
```

## Authentication & Client Setup
```typescript
import OpenAI from 'openai';

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});
```

## Core API Operations

### 1. General Conversational Chat (DeepSeek-V3)
```typescript
const response = await deepseek.chat.completions.create({
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: 'You are an expert software architect.' },
    { role: 'user', content: 'Explain transaction isolation levels in PostgreSQL.' },
  ],
  temperature: 0.7,
  max_tokens: 2048,
});

console.log(response.choices[0].message.content);
```

### 2. Deep Reasoning Stream (DeepSeek-R1 with Chain-of-Thought)
```typescript
const stream = await deepseek.chat.completions.create({
  model: 'deepseek-reasoner',
  messages: [
    { role: 'user', content: 'Prove that the square root of 2 is irrational.' },
  ],
  stream: true,
});

for await (const chunk of stream) {
  // Reasoning chain tokens
  const reasoning = (chunk.choices[0]?.delta as any)?.reasoning_content;
  if (reasoning) {
    process.stdout.write(reasoning);
  }
  // Final output content tokens
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
```

### 3. Structured JSON Output
```typescript
const response = await deepseek.chat.completions.create({
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: 'Extract entities and output valid JSON.' },
    { role: 'user', content: 'John bought 3 apples from Whole Foods for $4.50' },
  ],
  response_format: { type: 'json_object' },
});
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Custom SDK Hallucination**: There is no official `@deepseek/sdk` npm package. Always use the official `openai` package with `baseURL: 'https://api.deepseek.com'`.
- **Reasoning Content Ingestion**: On `deepseek-reasoner`, reasoning thoughts arrive under `delta.reasoning_content`, not `delta.content`.
- **System Prompt Restrictions**: `deepseek-reasoner` discourages heavy system prompt steering that constrains reasoning chains.

## Production Verification Checklist
- [ ] `baseURL` is explicitly set to `https://api.deepseek.com`
- [ ] Fallback error handling for HTTP 429 and rate-limiting exponential backoff
- [ ] UI provides distinct tabs or accordions for reasoning thoughts vs final response

---
> **Last Verified:** 2026-07-03

