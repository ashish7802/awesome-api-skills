const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../../');
const skillsDir = path.join(repoRoot, 'skills');
const graphPath = path.join(repoRoot, 'registry/graph.json');

const newSkills = [
  {
    id: 'qdrant',
    meta: {
      name: 'qdrant',
      version: '1.0.0',
      description: 'Vector similarity search engine and database for production AI embeddings and RAG pipelines.',
      categories: ['AI', 'Databases', 'Search'],
      languages: ['typescript', 'python', 'rust'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: {
        'API Reference': 'https://qdrant.tech/documentation/',
        'TypeScript SDK': 'https://github.com/qdrant/qdrant-js',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://qdrant.tech/documentation/',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Inserting vector dimensions that mismatch collection vector parameters (e.g., 1536 vs 3072)',
        'Forgetting to create payload indexes on filter fields before running large filtered searches',
        'Passing integer IDs as strings or UUIDs when collection expects a specific ID format',
      ],
      checklist: [
        'Collection vector size matches the exact embedding model output dimensions',
        'Payload fields used in filter queries are indexed with createPayloadIndex',
        'QDRANT_URL and QDRANT_API_KEY are configured in server-side environment variables',
      ],
    },
    skillMd: `# Qdrant Vector Database API Skill

## Overview
Qdrant is a production-grade vector similarity search engine with extended payload-based filtering, hybrid search (dense + sparse vectors), and multi-tenant collection partitioning.

## Installation
\`\`\`bash
npm install @qdrant/js-client-rest
pip install qdrant-client
\`\`\`

## Authentication
Connect using API keys for Qdrant Cloud or direct endpoint URLs for self-hosted instances.

\`\`\`typescript
import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
  url: process.env.QDRANT_URL || 'http://localhost:6333',
  apiKey: process.env.QDRANT_API_KEY,
});
\`\`\`

## Core API Operations

### 1. Create Collection
\`\`\`typescript
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
\`\`\`

### 2. Upsert Vector Points with Metadata Payload
\`\`\`typescript
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
\`\`\`

### 3. Vector Similarity Search with Payload Filtering
\`\`\`typescript
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
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Dimension Mismatches**: Do not assume 1536 dimensions; verify if the embedding model outputs 768, 1536, or 3072 dimensions.
- **Unindexed Payload Filters**: Queries with \`filter\` on non-indexed payload fields trigger full collection scans on large datasets. Always call \`createPayloadIndex\`.
- **Client Bundling**: Never instantiate \`QdrantClient\` with write API keys in client-side React/Vue components.

## Production Verification Checklist
- [ ] Collection vector distance metric matches the embedding model (Cosine for normalized embeddings, Dot/Euclid otherwise)
- [ ] Multi-tenant isolation verified with tenant filtering rules
- [ ] Write operations set \`wait: true\` or handle async acknowledgement
- [ ] Payload indexes created for frequently filtered attributes

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'deepseek',
    meta: {
      name: 'deepseek',
      version: '1.0.0',
      description: 'DeepSeek frontier reasoning (R1) and general chat (V3) models with OpenAI-compatible API endpoints.',
      categories: ['AI', 'Machine Learning'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://platform.deepseek.com/api-docs',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://platform.deepseek.com/api-docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Omitting baseURL: "https://api.deepseek.com" when using the standard openai SDK client',
        'Confusing reasoning model "deepseek-reasoner" (which includes reasoning_content) with "deepseek-chat"',
        'Setting temperature too high on deepseek-reasoner (recommended: 0.6 or default)',
      ],
      checklist: [
        'Client sets baseURL: "https://api.deepseek.com"',
        'DEEPSEEK_API_KEY loaded securely in server environment variables',
        'Streaming handler separates delta.reasoning_content from delta.content on deepseek-reasoner',
      ],
    },
    skillMd: `# DeepSeek API Skill

## Overview
DeepSeek provides state-of-the-art open reasoning and conversational language models via an OpenAI-compatible REST API. Key models include \`deepseek-chat\` (DeepSeek-V3) and \`deepseek-reasoner\` (DeepSeek-R1).

## Installation
\`\`\`bash
npm install openai
pip install openai
\`\`\`

## Authentication & Client Setup
\`\`\`typescript
import OpenAI from 'openai';

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});
\`\`\`

## Core API Operations

### 1. General Conversational Chat (DeepSeek-V3)
\`\`\`typescript
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
\`\`\`

### 2. Deep Reasoning Stream (DeepSeek-R1 with Chain-of-Thought)
\`\`\`typescript
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
\`\`\`

### 3. Structured JSON Output
\`\`\`typescript
const response = await deepseek.chat.completions.create({
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: 'Extract entities and output valid JSON.' },
    { role: 'user', content: 'John bought 3 apples from Whole Foods for $4.50' },
  ],
  response_format: { type: 'json_object' },
});
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Custom SDK Hallucination**: There is no official \`@deepseek/sdk\` npm package. Always use the official \`openai\` package with \`baseURL: 'https://api.deepseek.com'\`.
- **Reasoning Content Ingestion**: On \`deepseek-reasoner\`, reasoning thoughts arrive under \`delta.reasoning_content\`, not \`delta.content\`.
- **System Prompt Restrictions**: \`deepseek-reasoner\` discourages heavy system prompt steering that constrains reasoning chains.

## Production Verification Checklist
- [ ] \`baseURL\` is explicitly set to \`https://api.deepseek.com\`
- [ ] Fallback error handling for HTTP 429 and rate-limiting exponential backoff
- [ ] UI provides distinct tabs or accordions for reasoning thoughts vs final response

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'groq',
    meta: {
      name: 'groq',
      version: '1.0.0',
      description: 'Ultra-low latency inference engine powered by Groq LPU chips for real-time AI and voice pipelines.',
      categories: ['AI', 'Performance', 'Machine Learning'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://console.groq.com/docs/quickstart',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://console.groq.com/docs/quickstart',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using deprecated model names like llama3-8b-8192 instead of modern llama-3.3-70b-versatile',
        'Not handling streaming backpressure when processing high token generation rates (500+ tok/s)',
        'Hardcoding GROQ_API_KEY in frontend client code',
      ],
      checklist: [
        'Using groq-sdk or OpenAI client with baseURL: "https://api.groq.com/openai/v1"',
        'GROQ_API_KEY loaded securely in backend environment',
        'Model ID verified against current Groq production catalog',
      ],
    },
    skillMd: `# Groq API Skill

## Overview
Groq delivers real-time AI inference at hundreds of tokens per second using Language Processing Units (LPUs). Ideal for conversational agents, real-time voice loops, and streaming applications.

## Installation
\`\`\`bash
npm install groq-sdk
pip install groq
\`\`\`

## Authentication & Setup
\`\`\`typescript
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
\`\`\`

## Core API Operations

### 1. High-Speed Chat Completion Streaming
\`\`\`typescript
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
\`\`\`

### 2. JSON Mode Structured Generation
\`\`\`typescript
const response = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [
    { role: 'system', content: 'You must respond with valid JSON.' },
    { role: 'user', content: 'Extract skills: "Node.js, PostgreSQL, Redis"' },
  ],
  response_format: { type: 'json_object' },
});

const data = JSON.parse(response.choices[0].message.content || '{}');
\`\`\`

### 3. Audio Transcription (Whisper LPU)
\`\`\`typescript
import fs from 'fs';

const transcription = await groq.audio.transcriptions.create({
  file: fs.createReadStream('audio.mp3'),
  model: 'whisper-large-v3-turbo',
  response_format: 'verbose_json',
});

console.log(transcription.text);
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Model Deprecations**: Groq retires preview checkpoints frequently. Use standard aliases such as \`llama-3.3-70b-versatile\` or \`mixtral-8x7b-32768\`.
- **Rate Limits on Free Tier**: The free tier has strict RPM/TPM limits. Implement retry queues with exponential backoff on 429 status codes.

## Production Verification Checklist
- [ ] Streaming connection handled with client abort signals
- [ ] Audio files stay under the 25MB request limit
- [ ] Fallback models configured in case of provider rate-limiting

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'mistral',
    meta: {
      name: 'mistral',
      version: '1.0.0',
      description: 'Mistral AI API for frontier multilingual models, Codestral code generation, and embeddings.',
      categories: ['AI', 'Developer Tools'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: {
        'API Reference': 'https://docs.mistral.ai/api/',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://docs.mistral.ai/api/',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using legacy @mistralai/mistralai SDK syntax instead of the modern client methods',
        'Confusing Codestral endpoint (codestral.mistral.ai) with general chat endpoint (api.mistral.ai)',
        'Passing unformatted tool definitions to mistral function calling',
      ],
      checklist: [
        'MISTRAL_API_KEY initialized via Mistral client',
        'Using mistral-large-latest or codestral-latest models',
        'Tool calls properly formatted with function schemas',
      ],
    },
    skillMd: `# Mistral AI API Skill

## Overview
Mistral AI provides frontier open and commercial AI models, featuring \`mistral-large-latest\`, \`mistral-small-latest\`, \`codestral-latest\` for coding, and \`mistral-embed\` for semantic search.

## Installation
\`\`\`bash
npm install @mistralai/mistralai
pip install mistralai
\`\`\`

## Authentication & Client Setup
\`\`\`typescript
import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});
\`\`\`

## Core API Operations

### 1. Chat Completion with Tool Calling
\`\`\`typescript
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
\`\`\`

### 2. Code Generation (Codestral)
\`\`\`typescript
const codeCompletion = await client.chat.complete({
  model: 'codestral-latest',
  messages: [
    { role: 'system', content: 'You are an expert TypeScript developer.' },
    { role: 'user', content: 'Write a debounce function in TypeScript with type generics.' },
  ],
});
\`\`\`

### 3. Generate Semantic Text Embeddings
\`\`\`typescript
const embeddings = await client.embeddings.create({
  model: 'mistral-embed',
  inputs: ['Document chunk 1', 'Document chunk 2'],
});

console.log(embeddings.data[0].embedding.length); // 1024
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Codestral Endpoint Confusion**: Codestral has dedicated API keys and rate limits when accessed via \`codestral.mistral.ai\`.
- **JSON Mode Requirement**: When requesting JSON mode, the word "json" must explicitly appear in the prompt instructions.

## Production Checklist
- [ ] Structured JSON responses verified with Zod
- [ ] Safe fallback for tool calls without infinite agent loops
- [ ] Rate limits handled on embedding batch calls

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'cohere',
    meta: {
      name: 'cohere',
      version: '1.0.0',
      description: 'Enterprise AI platform for high-accuracy multilingual Embeddings (v3), Rerank, and Command R+ models.',
      categories: ['AI', 'Search', 'Machine Learning'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://docs.cohere.com/reference/about',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://docs.cohere.com/reference/about',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Omitting required inputType on Embed v3 ("search_document" vs "search_query")',
        'Not leveraging cohere.rerank() on RAG candidate sets for dramatic precision boosts',
        'Confusing command-r with command-r-plus model identifiers',
      ],
      checklist: [
        'Embeddings specify inputType: "search_document" when indexing and "search_query" when searching',
        'Rerank endpoint utilized for reordering top-k semantic search results',
        'COHERE_API_KEY stored securely on the backend',
      ],
    },
    skillMd: `# Cohere API Skill

## Overview
Cohere provides industry-leading semantic search embeddings (Embed v3), document reranking (Rerank v3), and conversational reasoning with citations (Command R+).

## Installation
\`\`\`bash
npm install cohere-ai
pip install cohere
\`\`\`

## Authentication & Client Setup
\`\`\`typescript
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
\`\`\`

## Core API Operations

### 1. Embed v3 with Mandatory inputType
\`\`\`typescript
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
\`\`\`

### 2. Rerank Document Candidates (RAG Optimization)
\`\`\`typescript
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
\`\`\`

### 3. Command R+ Chat with Citations
\`\`\`typescript
const response = await cohere.chat({
  model: 'command-r-plus',
  message: 'Explain zero-knowledge rollups.',
  documents: [
    { title: 'ZK Rollups', snippet: 'ZK-rollups bundle transactions into a single cryptographic proof.' },
  ],
});

console.log(response.text);
console.log(response.citations);
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Missing inputType**: Failing to pass \`inputType: 'search_document'\` or \`'search_query'\` will result in a 400 validation error in Embed v3.
- **Rerank Format**: Ensure \`documents\` passed to \`rerank\` are either strings or objects with a \`text\` property.

## Production Verification Checklist
- [ ] \`inputType\` verified across indexing and query pipelines
- [ ] Cohere Rerank layer integrated after initial vector search
- [ ] Citations mapped to source document IDs in UI

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'elevenlabs',
    meta: {
      name: 'elevenlabs',
      version: '1.0.0',
      description: 'Realistic AI voice synthesis, text-to-speech, voice cloning, and real-time conversational audio APIs.',
      categories: ['AI', 'Audio', 'Media'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://elevenlabs.io/docs/api-reference',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://elevenlabs.io/docs/api-reference',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Buffering entire audio files before playing instead of streaming audio chunks to the player',
        'Hardcoding voiceId values that may not exist on other workspaces or accounts',
        'Exposing ELEVENLABS_API_KEY in frontend browser code',
      ],
      checklist: [
        'Stream TTS audio directly via HTTP chunked response or WebSockets',
        'ELEVENLABS_API_KEY stored securely in backend server environment',
        'Voice IDs loaded dynamically via client.voices.getAll()',
      ],
    },
    skillMd: `# ElevenLabs API Skill

## Overview
ElevenLabs provides state-of-the-art realistic text-to-speech (TTS), low-latency audio streaming, custom voice generation, and conversational AI agents.

## Installation
\`\`\`bash
npm install elevenlabs
pip install elevenlabs
\`\`\`

## Authentication & Setup
\`\`\`typescript
import { ElevenLabsClient } from 'elevenlabs';

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});
\`\`\`

## Core API Operations

### 1. Streaming Text-to-Speech
\`\`\`typescript
import { Readable } from 'stream';

const audioStream = await elevenlabs.generate({
  voice: 'Rachel',
  text: 'Welcome to the Awesome API Skills directory. Ready to build something remarkable?',
  model_id: 'eleven_multilingual_v2',
  stream: true,
});

// Stream audio chunks directly to client HTTP response
audioStream.pipe(response);
\`\`\`

### 2. List Available Voices
\`\`\`typescript
const voices = await elevenlabs.voices.getAll();
for (const voice of voices.voices) {
  console.log(\`\${voice.name} (\${voice.voice_id}) - Category: \${voice.category}\`);
}
\`\`\`

### 3. Voice Settings Tuning
\`\`\`typescript
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
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Latency Optimization**: Do not await full MP3 buffers for interactive assistants; always use \`stream: true\` with \`eleven_turbo_v2_5\` for sub-300ms time-to-first-byte.
- **Character Usage**: Track character consumption in billing pipelines to prevent quota exhaustion.

## Production Verification Checklist
- [ ] Streaming audio verified with chunked Transfer-Encoding
- [ ] Fallback voice configured if requested voiceId is unavailable
- [ ] Rate limits and character budget monitored

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'replicate',
    meta: {
      name: 'replicate',
      version: '1.0.0',
      description: 'Cloud API for running open-source machine learning models (Flux, SDXL, Llama, Whisper) with a few lines of code.',
      categories: ['AI', 'Media', 'Machine Learning'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://replicate.com/docs/reference/http',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://replicate.com/docs/reference/http',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Blocking synchronous web requests waiting for cold-booting GPU model predictions',
        'Not configuring webhooks for asynchronous long-running predictions (>30 seconds)',
        'Hardcoding version hashes that may be superseded by official owner/model slugs',
      ],
      checklist: [
        'REPLICATE_API_TOKEN loaded in server environment',
        'Async workflows use webhook callbacks or replicate.predictions.create() with polling',
        'Generated media URLs downloaded and stored in persistent S3/GCS buckets',
      ],
    },
    skillMd: `# Replicate API Skill

## Overview
Replicate lets developers run open-source AI models in the cloud through a unified API. Run models for image generation (Flux, Stable Diffusion), video synthesis, voice, and multimodal reasoning.

## Installation
\`\`\`bash
npm install replicate
pip install replicate
\`\`\`

## Authentication & Setup
\`\`\`typescript
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
\`\`\`

## Core API Operations

### 1. Run Image Generation Model (Flux.1 Schnell)
\`\`\`typescript
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
\`\`\`

### 2. Asynchronous Prediction with Webhooks
\`\`\`typescript
const prediction = await replicate.predictions.create({
  model: 'black-forest-labs/flux-dev',
  input: {
    prompt: 'Hyper-realistic macro photography of a mechanical bumblebee',
  },
  webhook: 'https://api.myapp.com/api/webhooks/replicate',
  webhook_events_filter: ['completed'],
});

console.log('Prediction started:', prediction.id);
\`\`\`

### 3. Stream Model Output
\`\`\`typescript
for await (const event of replicate.stream('meta/meta-llama-3-70b-instruct', {
  input: {
    prompt: 'Write a comprehensive guide to database indexing.',
  },
})) {
  process.stdout.write(event.toString());
}
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Temporary Asset URLs**: Output image/video URLs returned by Replicate expire after a period of time. Always download and persist them in your own object store (S3, Cloudflare R2).
- **GPU Cold Boots**: Handle cold start delays gracefully in UI with progress polling.

## Production Verification Checklist
- [ ] Output assets transferred to private persistent object storage
- [ ] Webhook signatures verified on completion callbacks
- [ ] Client timeouts configured to allow for GPU allocation

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'svix',
    meta: {
      name: 'svix',
      version: '1.0.0',
      description: 'Enterprise webhook sending service and cryptographic signature verification standard.',
      categories: ['Developer Tools', 'Security', 'Communications'],
      languages: ['typescript', 'python', 'go'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://docs.svix.com',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://docs.svix.com',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Attempting to verify webhook signatures against parsed JSON objects instead of raw string bodies',
        'Missing required headers: svix-id, svix-timestamp, svix-signature',
        'Not handling replay attack protection (timestamp drift validation)',
      ],
      checklist: [
        'Webhook headers passed exactly: svix-id, svix-timestamp, svix-signature',
        'Webhook secret starts with whsec_ and is retrieved from environment variables',
        'Verification runs on the raw, unparsed request payload string',
      ],
    },
    skillMd: `# Svix Webhooks API Skill

## Overview
Svix is the industry standard for sending and verifying webhooks reliably, used by Clerk, Brex, Resend, and thousands of platforms.

## Installation
\`\`\`bash
npm install svix
pip install svix
\`\`\`

## Verifying Inbound Webhooks
To verify a webhook received from Svix or a service that uses standard Svix signatures (like Clerk or Resend):

\`\`\`typescript
import { Webhook } from 'svix';

export async function verifyIncomingWebhook(
  rawBody: string,
  headers: Record<string, string>
) {
  const secret = process.env.WEBHOOK_SECRET!;
  const wh = new Webhook(secret);

  const payload = wh.verify(rawBody, {
    'svix-id': headers['svix-id'],
    'svix-timestamp': headers['svix-timestamp'],
    'svix-signature': headers['svix-signature'],
  });

  return payload;
}
\`\`\`

## Sending Outbound Webhooks via Svix API
\`\`\`typescript
import { Svix } from 'svix';

const svix = new Svix(process.env.SVIX_AUTH_TOKEN!);

// Create an application for a tenant
const app = await svix.application.create({
  name: 'Customer Org 42',
  uid: 'org_42',
});

// Send an event message
await svix.message.create('org_42', {
  eventType: 'invoice.created',
  payload: {
    id: 'inv_9981',
    amount: 5000,
    currency: 'USD',
  },
});
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Raw Body Requirement**: Passing a JSON-parsed object to \`wh.verify\` fails cryptographic verification. Always pass the exact raw body string or buffer.
- **Header Casing**: Svix headers are lowercase: \`svix-id\`, \`svix-timestamp\`, \`svix-signature\`.

## Production Verification Checklist
- [ ] Express / Next.js route handler configures raw body reader
- [ ] Webhook secret verified against environment (whsec_...)
- [ ] Svix timestamp tolerance checked (default 5 minutes)

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'inngest',
    meta: {
      name: 'inngest',
      version: '1.0.0',
      description: 'Event-driven durable execution engine for background jobs, workflows, and step functions without queues.',
      categories: ['Developer Tools', 'Serverless', 'Workflows'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: {
        'API Reference': 'https://www.inngest.com/docs',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://www.inngest.com/docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Executing non-deterministic operations (e.g. Math.random(), Date.now()) outside step.run() blocks',
        'Not returning serializable JSON data from step.run() calls',
        'Forgetting to export serve() handler from the API route (e.g., /api/inngest)',
      ],
      checklist: [
        'API handler exposed at /api/inngest with serve({ client: inngest, functions: [...] })',
        'All side-effects and external API calls wrapped in step.run()',
        'INNGEST_SIGNING_KEY and INNGEST_EVENT_KEY set in production',
      ],
    },
    skillMd: `# Inngest API Skill

## Overview
Inngest is a developer-first platform for writing durable background jobs, scheduled tasks, and complex multi-step workflows directly in your codebase.

## Installation
\`\`\`bash
npm install inngest
\`\`\`

## Client & Workflow Definition
\`\`\`typescript
import { Inngest } from 'inngest';

export const inngest = new Inngest({ id: 'my-saas-app' });

// Define a multi-step durable workflow
export const onboardUserWorkflow = inngest.createFunction(
  { id: 'onboard-user', retries: 3 },
  { event: 'app/user.signup' },
  async ({ event, step }) => {
    // Step 1: Create Stripe customer
    const customer = await step.run('create-stripe-customer', async () => {
      return { customerId: 'cus_123', email: event.data.email };
    });

    // Step 2: Sleep for 3 days without keeping server active
    await step.sleep('wait-for-trial', '3 days');

    // Step 3: Send check-in email
    await step.run('send-checkin-email', async () => {
      console.log('Sending follow up email to', customer.email);
      return { sent: true };
    });

    return { completed: true };
  }
);
\`\`\`

## Next.js / Framework Route Setup
\`\`\`typescript
// app/api/inngest/route.ts
import { serve } from 'inngest/next';
import { inngest, onboardUserWorkflow } from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [onboardUserWorkflow],
});
\`\`\`

## Sending Events
\`\`\`typescript
await inngest.send({
  name: 'app/user.signup',
  data: {
    userId: 'usr_456',
    email: 'alex@example.com',
  },
});
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Step Code Execution**: Inngest re-executes function code between steps to memoize results. Code outside \`step.run()\` will run multiple times. Put all side-effects inside \`step.run()\`.
- **Serialization**: Return values from \`step.run()\` must be JSON-serializable (no raw socket handles or circular references).

## Production Verification Checklist
- [ ] \`serve()\` endpoint is publicly reachable or routed via Inngest Dev Server
- [ ] Side-effects wrapped inside \`step.run()\`
- [ ] Concurrency and rate limit keys configured for external API calls

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'trigger-dev',
    meta: {
      name: 'trigger-dev',
      version: '1.0.0',
      description: 'Background jobs and long-running tasks platform for TypeScript with zero server timeouts.',
      categories: ['Developer Tools', 'Serverless', 'Workflows'],
      languages: ['typescript'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: {
        'API Reference': 'https://trigger.dev/docs',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://trigger.dev/docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using v2 syntax instead of Trigger.dev v3 task() definitions',
        'Running heavy tasks inside Next.js serverless functions instead of delegating to trigger.dev tasks',
        'Missing trigger.config.ts in the project root',
      ],
      checklist: [
        'trigger.config.ts configured with project ID and runtime settings',
        'Tasks defined with task({ id: "...", run: async (payload) => { ... } })',
        'TRIGGER_SECRET_KEY set in deployment environment',
      ],
    },
    skillMd: `# Trigger.dev v3 API Skill

## Overview
Trigger.dev v3 is a full-featured background jobs platform for TypeScript, enabling long-running tasks (hours), AI generation pipelines, chunked batch jobs, and crons without serverless timeout limits.

## Installation
\`\`\`bash
npm install @trigger.dev/sdk@latest
\`\`\`

## Configuration
\`\`\`typescript
// trigger.config.ts
import { defineConfig } from '@trigger.dev/sdk/v3';

export default defineConfig({
  project: 'proj_myproject123',
  runtime: 'node',
  maxDuration: 3600, // 1 hour max execution
});
\`\`\`

## Task Definition (v3)
\`\`\`typescript
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
\`\`\`

## Triggering Tasks from Application Backend
\`\`\`typescript
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
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **v2 vs v3 Architecture**: Trigger.dev v3 eliminated HTTP webhook roundtrips and runs direct Node worker processes. Do not use legacy \`client.defineJob()\`. Use \`task({ id, run })\`.
- **Logging**: Use \`logger.info()\` from \`@trigger.dev/sdk/v3\` to stream real-time logs to the Trigger.dev dashboard.

## Production Verification Checklist
- [ ] \`trigger.config.ts\` specifies active project reference
- [ ] Deployments sync tasks via \`npx trigger.dev@latest deploy\`
- [ ] Task payload types validated with TypeScript

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'unkey',
    meta: {
      name: 'unkey',
      version: '1.0.0',
      description: 'Open-source API key management, validation, and distributed edge rate limiting infrastructure.',
      categories: ['Security', 'Developer Tools', 'Serverless'],
      languages: ['typescript', 'python', 'go'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: {
        'API Reference': 'https://www.unkey.com/docs',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://www.unkey.com/docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Validating API keys with database queries instead of sub-10ms edge caching via unkey.keys.verify()',
        'Forgetting to check result.data.valid on key verification',
        'Not configuring rate limit overrides per API tier',
      ],
      checklist: [
        'UNKEY_ROOT_KEY loaded on secure server or edge middleware',
        'Key verification checks result.data.valid and handles result.error',
        'Global edge rate limits enabled with Ratelimit module',
      ],
    },
    skillMd: `# Unkey API Key & Rate Limiting Skill

## Overview
Unkey is high-performance infrastructure for minting, revoking, validating API keys, and enforcing distributed rate limits at the edge with global sub-10ms response times.

## Installation
\`\`\`bash
npm install @unkey/api @unkey/ratelimit
\`\`\`

## Verifying an Inbound API Key
\`\`\`typescript
import { verifyKey } from '@unkey/api';

export async function authenticateApiKey(apiKeyValue: string) {
  const { result, error } = await verifyKey({
    key: apiKeyValue,
    apiId: process.env.UNKEY_API_ID!,
  });

  if (error) {
    console.error('Unkey verification failed:', error);
    return { authenticated: false };
  }

  if (!result.valid) {
    return { authenticated: false, reason: result.code };
  }

  return {
    authenticated: true,
    ownerId: result.ownerId,
    meta: result.meta,
  };
}
\`\`\`

## Creating a New Customer API Key
\`\`\`typescript
import { Unkey } from '@unkey/api';

const unkey = new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY! });

const created = await unkey.keys.create({
  apiId: process.env.UNKEY_API_ID!,
  prefix: 'acme',
  ownerId: 'user_9921',
  name: 'Production Worker Key',
  ratelimit: {
    type: 'fast',
    limit: 100,
    duration: 60000, // 100 requests per minute
  },
  meta: {
    tier: 'enterprise',
  },
});

console.log('Customer API Key:', created.result?.key);
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Plaintext Key Security**: The plaintext API key is only returned once upon creation. Store hash or instruct user to copy immediately.
- **Root Key vs Client Verification**: Key creation requires \`UNKEY_ROOT_KEY\`. Verification only requires \`apiId\`.

## Production Verification Checklist
- [ ] API keys verified on edge runtime before handler execution
- [ ] Rate limit exhaustion returns HTTP 429 Too Many Requests
- [ ] Key prefixes utilized to simplify customer debugging (e.g. \`pk_live_...\`)

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'novu',
    meta: {
      name: 'novu',
      version: '1.0.0',
      description: 'Unified notification infrastructure for email, SMS, push, Chat (Slack/Discord), and in-app feeds.',
      categories: ['Communications', 'Developer Tools'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://docs.novu.co',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://docs.novu.co',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Triggering notifications with missing subscriber object credentials',
        'Not configuring channel provider fallback keys in Novu dashboard',
        'Hardcoding email templates in application code rather than Novu workflow layouts',
      ],
      checklist: [
        'NOVU_SECRET_KEY loaded in server environment',
        'Subscribers identified with consistent subscriberId',
        'Trigger workflow slugs verified against Novu console',
      ],
    },
    skillMd: `# Novu Notification Platform API Skill

## Overview
Novu provides an open-source, full-stack notification infrastructure. Route and coordinate multi-channel notifications (In-app inbox, Email via Resend/SendGrid, SMS via Twilio, Push via FCM, and Slack/Discord).

## Installation
\`\`\`bash
npm install @novu/node
\`\`\`

## Initialization & Triggering Notification Workflows
\`\`\`typescript
import { Novu } from '@novu/node';

const novu = new Novu(process.env.NOVU_SECRET_KEY!);

// Trigger a workflow across all configured channels
await novu.trigger('comment-mention-workflow', {
  to: {
    subscriberId: 'usr_87612',
    email: 'sarah@example.com',
    phone: '+15550199283',
    firstName: 'Sarah',
  },
  payload: {
    authorName: 'David',
    commentSnippet: 'Can you review this pull request before deploying?',
    documentUrl: 'https://app.example.com/docs/42',
  },
});
\`\`\`

## Managing Subscriber Preferences
\`\`\`typescript
// Update subscriber channel preferences
await novu.subscribers.updatePreference('usr_87612', 'comment-mention-workflow', {
  channel: {
    type: 'email',
    enabled: true,
  },
});
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Workflow Slugs**: The workflow identifier must match the exact workflow ID configured in your Novu organization.
- **Client vs Server SDK**: Never use \`@novu/node\` on client-side React apps; use \`@novu/notification-center\` for in-app UI widgets.

## Production Verification Checklist
- [ ] In-app notification center mounted on frontend
- [ ] Email/SMS providers configured and connected in Novu integrations tab
- [ ] Subscriber IDs correspond to primary user database IDs

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'postmark',
    meta: {
      name: 'postmark',
      version: '1.0.0',
      description: 'High-deliverability transactional email service with detailed delivery metrics and inbound webhooks.',
      categories: ['Email', 'Communications'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://postmarkapp.com/developer',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://postmarkapp.com/developer',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using account tokens instead of server API tokens for sending messages',
        'Sending emails from unverified sender signatures or domains',
        'Forgetting to attach MessageStream parameter for broadcast vs transactional streams',
      ],
      checklist: [
        'POSTMARK_SERVER_API_TOKEN configured in backend environment',
        'From address matches verified domain with DKIM/SPF passing',
        'Batch emails use sendEmailBatch for bulk delivery',
      ],
    },
    skillMd: `# Postmark Transactional Email API Skill

## Overview
Postmark specializes in lightning-fast transactional email delivery with industry-leading inbox placement, detailed bounce classification, and templating.

## Installation
\`\`\`bash
npm install postmark
\`\`\`

## Setup & Sending Emails
\`\`\`typescript
import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_SERVER_API_TOKEN!);

// Send single transactional email
await client.sendEmail({
  From: 'support@myverifieddomain.com',
  To: 'user@example.com',
  Subject: 'Password Reset Request',
  HtmlBody: '<p>Click <a href="https://example.com/reset">here</a> to reset your password.</p>',
  TextBody: 'Visit https://example.com/reset to reset your password.',
  MessageStream: 'outbound',
});
\`\`\`

## Sending via Postmark Template
\`\`\`typescript
await client.sendEmailWithTemplate({
  From: 'notifications@myverifieddomain.com',
  To: 'customer@example.com',
  TemplateAlias: 'welcome-email',
  TemplateModel: {
    name: 'Alex',
    action_url: 'https://myverifieddomain.com/dashboard',
    product_name: 'Awesome Platform',
  },
});
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Token Confusion**: Postmark has Account API Tokens (admin operations) and Server API Tokens (sending emails). Do not send emails using Account Tokens.
- **Sender Signatures**: Attempting to send from an unverified \`From\` address will return an HTTP 422 error.

## Production Verification Checklist
- [ ] SPF, DKIM, and DMARC DNS records configured on sending domain
- [ ] Inbound webhooks verified with IP filtering or basic auth
- [ ] Bounce webhook configured to suppress inactive email addresses

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'braintree',
    meta: {
      name: 'braintree',
      version: '1.0.0',
      description: 'PayPal and Braintree payment gateway integration for global credit cards, PayPal, and Apple Pay.',
      categories: ['Payments', 'Commerce'],
      languages: ['typescript', 'python', 'java'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://developer.paypal.com/braintree/docs',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://developer.paypal.com/braintree/docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Directly accepting raw credit card numbers on backend servers instead of using client tokens and payment method nonces',
        'Not verifying 3D Secure verification status on transactions in European regions',
        'Using Sandbox merchant credentials in Production environments',
      ],
      checklist: [
        'Server generates client token via gateway.clientToken.generate()',
        'Frontend collects payment and returns paymentMethodNonce',
        'Server calls gateway.transaction.sale() with submitForSettlement: true',
      ],
    },
    skillMd: `# Braintree Payment Gateway API Skill

## Overview
Braintree (by PayPal) provides enterprise payment processing accepting Credit Cards, PayPal, Venmo, Apple Pay, and Google Pay with PCI-compliant Hosted Fields and Drop-in UI.

## Installation
\`\`\`bash
npm install braintree
\`\`\`

## Server Initialization
\`\`\`typescript
import braintree, { Environment } from 'braintree';

const gateway = new braintree.BraintreeGateway({
  environment:
    process.env.NODE_ENV === 'production'
      ? Environment.Production
      : Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID!,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY!,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY!,
});
\`\`\`

## Standard Payment Flow

### Step 1: Generate Client Token for Frontend
\`\`\`typescript
export async function getClientToken(customerId?: string) {
  const response = await gateway.clientToken.generate({
    customerId: customerId,
  });
  return response.clientToken;
}
\`\`\`

### Step 2: Charge the Payment Method Nonce
\`\`\`typescript
export async function createSaleTransaction(nonce: string, amount: string) {
  const result = await gateway.transaction.sale({
    amount,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true, // Auto-submit for settlement
    },
  });

  if (result.success) {
    return { success: true, transactionId: result.transaction.id };
  } else {
    throw new Error(result.message);
  }
}
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **Never Handle PAN Data**: Never write code that receives raw card numbers on the backend. The frontend must tokenize the card via Braintree Drop-in/Hosted Fields and send only a \`paymentMethodNonce\`.
- **Settlement Flag**: Forgetting \`submitForSettlement: true\` leaves transactions in an authorized-only state requiring manual capture.

## Production Verification Checklist
- [ ] Client token generated per checkout session
- [ ] 3D Secure 2.0 verification enabled for PSD2 SCA compliance
- [ ] Webhook listeners configured for disbursement and dispute notifications

---
> **Last Verified:** 2026-07-03
`,
  },
  {
    id: 'weaviate',
    meta: {
      name: 'weaviate',
      version: '1.0.0',
      description: 'Open-source vector database with multi-modal embeddings, hybrid keyword+vector search, and generative AI search modules.',
      categories: ['AI', 'Databases', 'Search'],
      languages: ['typescript', 'python', 'go'],
      author: 'Awesome API Skills Team',
      license: 'BSD-3-Clause',
      links: {
        'API Reference': 'https://weaviate.io/developers/weaviate',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://weaviate.io/developers/weaviate',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using legacy v2/v3 Weaviate client syntax instead of modern weaviate-client v3+ collections API',
        'Not setting vectorizer configuration when creating new collections',
        'Passing unindexed properties in complex GraphQL / REST filters',
      ],
      checklist: [
        'Connect using weaviate.connectToWeaviateCloud or connectToCustom',
        'Collections defined with explicit vectorIndexType and distance metric',
        'Hybrid search configured with alpha balancing (0 = sparse BM25, 1 = dense vector)',
      ],
    },
    skillMd: `# Weaviate Vector Database API Skill

## Overview
Weaviate is an open-source AI vector search engine designed for scalable semantic search, multi-modal embeddings, and Retrieval-Augmented Generation (RAG).

## Installation
\`\`\`bash
npm install weaviate-client
pip install weaviate-client
\`\`\`

## Connecting to Weaviate
\`\`\`typescript
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
\`\`\`

## Core API Operations

### 1. Create Collection with Vectorizer
\`\`\`typescript
const articles = await client.collections.create({
  name: 'Article',
  vectorizers: weaviate.configure.vectorizer.text2vecOpenAI({
    model: 'text-embedding-3-small',
  }),
  generative: weaviate.configure.generative.openAI(),
});
\`\`\`

### 2. Hybrid Search (Vector + BM25 Keyword)
\`\`\`typescript
const myCollection = client.collections.get('Article');

const response = await myCollection.query.hybrid('neural search and indexing', {
  limit: 5,
  alpha: 0.75, // 0.75 vector, 0.25 keyword BM25
  returnProperties: ['title', 'content', 'category'],
});

for (const obj of response.objects) {
  console.log(obj.properties.title, 'Score:', obj.metadata?.score);
}
\`\`\`

### 3. Generative Search (RAG in single query)
\`\`\`typescript
const ragResponse = await myCollection.generate.nearText('distributed vector database', {
  singlePrompt: 'Summarize key benefits of {title} in two sentences.',
  limit: 3,
});
\`\`\`

## AI Pitfalls & Anti-Hallucination Guidelines
- **v3 Collections API**: Modern \`weaviate-client\` uses \`client.collections.get('Name')\` instead of \`client.graphql.get()\`.
- **Alpha Parameter**: In \`hybrid\` queries, \`alpha=0\` performs pure BM25 search, \`alpha=1\` performs pure vector search, and \`alpha=0.5\` balances both equally.

## Production Verification Checklist
- [ ] Connect credentials validated against Weaviate Cloud cluster
- [ ] Hybrid search alpha tuned for domain terminology
- [ ] API key headers passed for text2vec/generative providers

---
> **Last Verified:** 2026-07-03
`,
  },
];

console.log(`Creating ${newSkills.length} new realistic skills...`);

for (const skill of newSkills) {
  const sDir = path.join(skillsDir, skill.id);
  fs.mkdirSync(sDir, { recursive: true });
  fs.writeFileSync(path.join(sDir, 'metadata.json'), JSON.stringify(skill.meta, null, 2) + '\n');
  fs.writeFileSync(path.join(sDir, 'SKILL.md'), skill.skillMd);
  console.log(`  ✓ Created skill: ${skill.id}`);
}

// Update registry/graph.json
const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
const existingNodeIds = new Set(graph.nodes.map((n) => n.id));

for (const skill of newSkills) {
  if (!existingNodeIds.has(skill.id)) {
    graph.nodes.push({
      id: skill.id,
      name: skill.meta.name,
      categories: skill.meta.categories,
      supportedAgents: skill.meta.supportedAgents,
    });
    existingNodeIds.add(skill.id);
  }
}

const newEdges = [
  { source: 'qdrant', target: 'openai', type: 'works_well_with' },
  { source: 'qdrant', target: 'langchain', type: 'integrates_with' },
  { source: 'qdrant', target: 'pinecone', type: 'alternative_to' },
  { source: 'weaviate', target: 'openai', type: 'works_well_with' },
  { source: 'weaviate', target: 'qdrant', type: 'alternative_to' },
  { source: 'deepseek', target: 'openai', type: 'alternative_to' },
  { source: 'deepseek', target: 'langchain', type: 'integrates_with' },
  { source: 'groq', target: 'openai', type: 'alternative_to' },
  { source: 'groq', target: 'nextjs', type: 'works_well_with' },
  { source: 'mistral', target: 'openai', type: 'alternative_to' },
  { source: 'mistral', target: 'langchain', type: 'integrates_with' },
  { source: 'cohere', target: 'pinecone', type: 'works_well_with' },
  { source: 'cohere', target: 'openai', type: 'alternative_to' },
  { source: 'elevenlabs', target: 'openai', type: 'works_well_with' },
  { source: 'elevenlabs', target: 'nextjs', type: 'works_well_with' },
  { source: 'replicate', target: 'nextjs', type: 'works_well_with' },
  { source: 'replicate', target: 'aws-s3', type: 'works_well_with' },
  { source: 'svix', target: 'stripe', type: 'works_well_with' },
  { source: 'svix', target: 'clerk', type: 'works_well_with' },
  { source: 'svix', target: 'resend', type: 'works_well_with' },
  { source: 'inngest', target: 'nextjs', type: 'works_well_with' },
  { source: 'inngest', target: 'stripe', type: 'works_well_with' },
  { source: 'inngest', target: 'bullmq', type: 'alternative_to' },
  { source: 'trigger-dev', target: 'nextjs', type: 'works_well_with' },
  { source: 'trigger-dev', target: 'inngest', type: 'alternative_to' },
  { source: 'unkey', target: 'hono', type: 'works_well_with' },
  { source: 'unkey', target: 'cloudflare-workers', type: 'works_well_with' },
  { source: 'novu', target: 'resend', type: 'integrates_with' },
  { source: 'novu', target: 'twilio', type: 'integrates_with' },
  { source: 'postmark', target: 'resend', type: 'alternative_to' },
  { source: 'postmark', target: 'sendgrid', type: 'alternative_to' },
  { source: 'braintree', target: 'stripe', type: 'alternative_to' },
];

for (const edge of newEdges) {
  const exists = graph.edges.some((e) => e.source === edge.source && e.target === edge.target);
  if (!exists) {
    graph.edges.push(edge);
  }
}

fs.writeFileSync(graphPath, JSON.stringify(graph, null, 2) + '\n');
console.log(`\nUpdated registry/graph.json with ${graph.nodes.length} nodes and ${graph.edges.length} edges.`);
