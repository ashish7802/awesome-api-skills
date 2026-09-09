# Groq API Skill

## Overview
Groq delivers real-time AI inference at hundreds of tokens per second using Language Processing Units (LPUs). Ideal for conversational agents, real-time voice loops, and streaming applications.

## Installation
```bash
npm install groq-sdk
pip install groq
```

## Authentication & Setup
```typescript
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
```

## Core API Operations

### 1. High-Speed Chat Completion Streaming
```typescript
const stream = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [
    { role: 'system', content: 'You are a responsive assistant.' },
    { role: 'user', content: 'Generate a short poem about distributed systems.' },
  ],
  stream: true,
  temperature: 0.5,
  max_tokens: 1024,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

### 2. JSON Mode Structured Generation
```typescript
const response = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [
    { role: 'system', content: 'You must respond with valid JSON.' },
    { role: 'user', content: 'Extract skills: "Node.js, PostgreSQL, Redis"' },
  ],
  response_format: { type: 'json_object' },
});

const data = JSON.parse(response.choices[0].message.content || '{}');
```

### 3. Audio Transcription (Whisper LPU)
```typescript
import fs from 'fs';

const transcription = await groq.audio.transcriptions.create({
  file: fs.createReadStream('audio.mp3'),
  model: 'whisper-large-v3-turbo',
  response_format: 'verbose_json',
});

console.log(transcription.text);
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Model Deprecations**: Groq retires preview checkpoints frequently. Use standard aliases such as `llama-3.3-70b-versatile` or `mixtral-8x7b-32768`.
- **Rate Limits on Free Tier**: The free tier has strict RPM/TPM limits. Implement retry queues with exponential backoff on 429 status codes.

## Production Verification Checklist
- [ ] Streaming connection handled with client abort signals
- [ ] Audio files stay under the 25MB request limit
- [ ] Fallback models configured in case of provider rate-limiting

---
> **Last Verified:** 2026-07-03
