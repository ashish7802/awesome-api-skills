---
title: trigger-dev
---

# trigger-dev

<p class="skill-meta">Developer Tools · Serverless · Workflows</p>


<div class="trust-panel">
  <div class="trust-header">
    <div class="trust-badge">
      <span class="pulse-dot"></span>
      <span>validated</span>
    </div>
    <span class="trust-version">Schema v1.0.0</span>
  </div>
  <div class="trust-grid">
    <div class="trust-item">
      <span class="trust-label">Maintainer</span>
      <span class="trust-val">Awesome API Skills Team</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Last Verified</span>
      <span class="trust-val">2026-07-03</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Languages</span>
      <span class="trust-val">typescript</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Supported Agents</span>
      <span class="trust-val">cursor, claude-code, cline, continue</span>
    </div>
  </div>
  <div class="trust-doc-link"><a href="https://trigger.dev/docs" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **works well with** → [nextjs](/skills/nextjs)
- **alternative to** → [inngest](/skills/inngest)

---


## Overview
Trigger.dev v3 is a full-featured background jobs platform for TypeScript, enabling long-running tasks (hours), AI generation pipelines, chunked batch jobs, and crons without serverless timeout limits.

## Installation
```bash
npm install @trigger.dev/sdk@latest
```

## Configuration
```typescript
// trigger.config.ts
import { defineConfig } from '@trigger.dev/sdk/v3';

export default defineConfig({
  project: 'proj_myproject123',
  runtime: 'node',
  maxDuration: 3600, // 1 hour max execution
});
```

## Task Definition (v3)
```typescript
// src/trigger/video-processor.ts
import { task, logger } from '@trigger.dev/sdk/v3';

export const processVideoTask = task({
  id: 'process-video-task',
  retry: {
    maxAttempts: 3,
  },
  run: async (payload: { videoUrl: string; quality: '1080p' | '4k' }) => {
    logger.info('Starting video encoding', { url: payload.videoUrl });

    // Execute long-running processing without timeout constraints
    const resultUrl = await encodeVideo(payload.videoUrl, payload.quality);

    logger.info('Video encoding completed', { resultUrl });
    return { success: true, resultUrl };
  },
});
```

## Triggering Tasks from Application Backend
```typescript
import { tasks } from '@trigger.dev/sdk/v3';
import { processVideoTask } from '@/trigger/video-processor';

// Trigger async job
const handle = await tasks.trigger<typeof processVideoTask>(
  'process-video-task',
  {
    videoUrl: 'https://storage.example.com/raw.mp4',
    quality: '1080p',
  }
);

console.log('Task run ID:', handle.id);
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **v2 vs v3 Architecture**: Trigger.dev v3 eliminated HTTP webhook roundtrips and runs direct Node worker processes. Do not use legacy `client.defineJob()`. Use `task({ id, run })`.
- **Logging**: Use `logger.info()` from `@trigger.dev/sdk/v3` to stream real-time logs to the Trigger.dev dashboard.

## Production Verification Checklist
- [ ] `trigger.config.ts` specifies active project reference
- [ ] Deployments sync tasks via `npx trigger.dev@latest deploy`
- [ ] Task payload types validated with TypeScript

---
> **Last Verified:** 2026-07-03

