---
title: OpenAI Chat
---

# OpenAI Chat

<div class="badges">
  <span class="badge version">1.0.0</span>
  <span class="badge pub">official</span>
  <span class="badge valid">✔ Validated</span>
</div>

## Overview
This skill provides complete integration for OpenAI Chat.

## Installation

```bash
awesome-api install openai-chat
```

## Supported Agents
- langchain
- crewai

## Examples
```javascript
import { execute } from '@awesome-api-skills/core';
const result = await execute('openai-chat', { prompt: 'Hello world' });
```

## Generated Registry Entry
```json
{
  "skillId": "openai-chat",
  "name": "OpenAI Chat",
  "version": "1.0.0"
}
```
