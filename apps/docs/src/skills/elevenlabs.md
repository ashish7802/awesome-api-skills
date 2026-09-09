---
title: elevenlabs
---

# elevenlabs

<p class="skill-meta">AI · Audio · Media</p>


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
      <span class="trust-val">typescript, python</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Supported Agents</span>
      <span class="trust-val">cursor, claude-code, cline, continue</span>
    </div>
  </div>
  <div class="trust-doc-link"><a href="https://elevenlabs.io/docs/api-reference" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **works well with** → [openai](/skills/openai)
- **works well with** → [nextjs](/skills/nextjs)

---


## Overview
ElevenLabs provides state-of-the-art realistic text-to-speech (TTS), low-latency audio streaming, custom voice generation, and conversational AI agents.

## Installation
```bash
npm install elevenlabs
pip install elevenlabs
```

## Authentication & Setup
```typescript
import { ElevenLabsClient } from 'elevenlabs';

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});
```

## Core API Operations

### 1. Streaming Text-to-Speech
```typescript
import { Readable } from 'stream';

const audioStream = await elevenlabs.generate({
  voice: 'Rachel',
  text: 'Welcome to the Awesome API Skills directory. Ready to build something remarkable?',
  model_id: 'eleven_multilingual_v2',
  stream: true,
});

// Stream audio chunks directly to client HTTP response
audioStream.pipe(response);
```

### 2. List Available Voices
```typescript
const voices = await elevenlabs.voices.getAll();
for (const voice of voices.voices) {
  console.log(`${voice.name} (${voice.voice_id}) - Category: ${voice.category}`);
}
```

### 3. Voice Settings Tuning
```typescript
const audio = await elevenlabs.generate({
  voice: 'Adam',
  text: 'Engineers who master their tools shape the future.',
  voice_settings: {
    stability: 0.75,
    similarity_boost: 0.85,
    style: 0.2,
    use_speaker_boost: true,
  },
});
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Latency Optimization**: Do not await full MP3 buffers for interactive assistants; always use `stream: true` with `eleven_turbo_v2_5` for sub-300ms time-to-first-byte.
- **Character Usage**: Track character consumption in billing pipelines to prevent quota exhaustion.

## Production Verification Checklist
- [ ] Streaming audio verified with chunked Transfer-Encoding
- [ ] Fallback voice configured if requested voiceId is unavailable
- [ ] Rate limits and character budget monitored

---
> **Last Verified:** 2026-07-03

