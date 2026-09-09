---
title: replicate
---

# replicate

<p class="skill-meta">AI · Media · Machine Learning</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://replicate.com/docs/reference/http) |

</div>


## Graph

- **works well with** → [nextjs](/skills/nextjs)
- **works well with** → [aws-s3](/skills/aws-s3)

---


## Overview
Replicate lets developers run open-source AI models in the cloud through a unified API. Run models for image generation (Flux, Stable Diffusion), video synthesis, voice, and multimodal reasoning.

## Installation
```bash
npm install replicate
pip install replicate
```

## Authentication & Setup
```typescript
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
```

## Core API Operations

### 1. Run Image Generation Model (Flux.1 Schnell)
```typescript
const output = await replicate.run(
  'black-forest-labs/flux-schnell',
  {
    input: {
      prompt: 'A futuristic cybernetic library with glowing neon data conduits',
      aspect_ratio: '16:9',
      num_outputs: 1,
    },
  }
);

console.log('Generated image URL:', output);
```

### 2. Asynchronous Prediction with Webhooks
```typescript
const prediction = await replicate.predictions.create({
  model: 'black-forest-labs/flux-dev',
  input: {
    prompt: 'Hyper-realistic macro photography of a mechanical bumblebee',
  },
  webhook: 'https://api.myapp.com/api/webhooks/replicate',
  webhook_events_filter: ['completed'],
});

console.log('Prediction started:', prediction.id);
```

### 3. Stream Model Output
```typescript
for await (const event of replicate.stream('meta/meta-llama-3-70b-instruct', {
  input: {
    prompt: 'Write a comprehensive guide to database indexing.',
  },
})) {
  process.stdout.write(event.toString());
}
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Temporary Asset URLs**: Output image/video URLs returned by Replicate expire after a period of time. Always download and persist them in your own object store (S3, Cloudflare R2).
- **GPU Cold Boots**: Handle cold start delays gracefully in UI with progress polling.

## Production Verification Checklist
- [ ] Output assets transferred to private persistent object storage
- [ ] Webhook signatures verified on completion callbacks
- [ ] Client timeouts configured to allow for GPU allocation

---
> **Last Verified:** 2026-07-03

