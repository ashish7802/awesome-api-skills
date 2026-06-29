const { buildSkillV2 } = require('./build-skill-v2');

buildSkillV2({
  name: 'neon',
  displayName: 'Neon',
  description: 'Serverless, fault-tolerant, branching PostgreSQL.',
  categories: ['Databases', 'Cloud'],
  quickStart:
    'Neon separates compute and storage, allowing instant database branching and autoscaling. For most Node.js applications, use the `@neondatabase/serverless` driver over standard `pg` to leverage WebSocket connections, which bypass serverless environment connection limits.\n\n```bash\nnpm install @neondatabase/serverless\n```',
  commonWorkflows:
    '### Instant Branching\nNeon allows you to create isolated database branches for preview environments. In Vercel or GitHub Actions, trigger the Neon API to branch your primary DB instantly before running integration tests, then delete the branch upon PR merge.',
  productionPatterns:
    '### Connection Pooling vs WebSockets\nIn traditional long-running servers (like Express on EC2), standard connection pooling with `pg` is acceptable. In Edge environments (Cloudflare Workers, Vercel Edge), always utilize the Neon WebSocket driver to eliminate connection exhaustion.',
  errorRecovery:
    'Handle standard PostgreSQL error codes (e.g., `23505` for Unique Violation). If encountering connection timeouts (`ETIMEDOUT`) during cold starts in serverless functions, implement a retry wrapper using an exponential backoff strategy (e.g., `async-retry` package).',
  securityNotes:
    'Never expose your raw Neon connection string in client-facing applications. Restrict database access by explicitly binding to static IP ranges where possible, though serverless environments may require `0.0.0.0/0` with strict password enforcement.',
  performanceConsiderations:
    "Neon's compute scales down to zero when inactive. The first query after scale-to-zero will experience a 'cold start' latency (typically 500ms-1s). To mitigate this for user-facing routes, implement keep-alive cron jobs or utilize read replicas for globally distributed edge applications.",
  testingGuidance:
    'Do not mock the database. Instead, integrate Neon API calls into your test setup phase to instantly provision an exact clone of your production schema, run tests against it, and destroy the branch in the teardown phase.',
  troubleshooting:
    'If queries inexplicably hang in Edge environments, verify you are not attempting to use standard TCP connections. Ensure `neonConfig.fetchConnectionCache = true` is set for the serverless driver to reuse connections effectively.',
  relatedSkills: ['Vercel', 'Supabase'],
  links: { 'Neon API Docs': 'https://neon.tech/docs/manage/api-reference' },
  examples: {
    typescript: {
      basic: `import { neon } from '@neondatabase/serverless';\nconst sql = neon(process.env.DATABASE_URL);\nconst result = await sql\`SELECT * FROM users WHERE id = \${userId}\`;`,
      'error-handling': `try { await sql\`INSERT INTO tags (name) VALUES ('node')\`; } catch (err) { if (err.code === '23505') console.log('Tag exists'); }`,
    },
    python: {
      basic: `import psycopg2\nconn = psycopg2.connect("postgresql://user:pass@ep-restless-snow.us-east-2.aws.neon.tech/neondb")`,
    },
    go: { basic: `db, err := sql.Open("postgres", "postgres://user:pass@ep-..." )` },
  },
  prompts: {
    branching:
      'Write a GitHub Action workflow using the Neon API that creates a new database branch based on the PR number, sets the connection string as a secret for the test runner, and destroys the branch on completion.',
  },
  test: `console.log('Tested Neon');`,
});

buildSkillV2({
  name: 'resend',
  displayName: 'Resend',
  description: 'Email API for developers.',
  categories: ['Messaging'],
  quickStart:
    'Resend focuses on developer experience, bypassing legacy SMTP complexity. It inherently supports React Email for component-driven templating.\n\n```bash\nnpm install resend react-email\n```',
  commonWorkflows:
    '### Transactional Emails\nTrigger confirmation emails immediately after Stripe webhooks or Clerk user creations. Combine Resend with React Email to construct type-safe, cross-client compatible email components.',
  productionPatterns:
    '### Batch Sending\nWhen notifying thousands of users (e.g., product updates), do not iterate `resend.emails.send()`. Instead, construct an array of payload objects and utilize `resend.batch.send()` to drastically reduce API latency and HTTP overhead.',
  errorRecovery:
    'Handle `ResendError`. If sending fails due to HTTP 429 (Rate Limit), implement a dead-letter queue (DLQ) in your architecture (via SQS or Redis) to automatically retry the payload. Watch for bounce events via Webhooks.',
  securityNotes:
    'Enforce Domain Authentication (DKIM/SPF/DMARC) in the Resend dashboard immediately. Unverified domains will land in spam or be outright rejected by Gmail and Outlook. Rotate API keys if exposed, as they possess sending authority.',
  performanceConsiderations:
    'HTML payloads can become large. Do not attach files larger than 10MB directly; instead, upload large attachments to an S3 bucket and provide a presigned URL within the email body.',
  testingGuidance:
    'Use the `resend.emails.send` endpoint with a verified testing domain or route traffic to a local mailcatcher during CI/CD. Do not blast real emails to mock users.',
  troubleshooting:
    "If emails mysteriously drop, check the Resend Dashboard 'Logs' tab. Statuses like 'Bounced' usually indicate a hard rejection by the receiving mail server. Ensure your `from` domain matches the authenticated domain.",
  relatedSkills: ['React-Email', 'Stripe', 'Clerk'],
  links: { 'API Reference': 'https://resend.com/docs/api-reference' },
  examples: {
    typescript: {
      basic: `import { Resend } from 'resend';\nconst resend = new Resend(process.env.RESEND_API_KEY);\nawait resend.emails.send({ from: 'onboarding@resend.dev', to: 'user@gmail.com', subject: 'Hello', html: '<p>Hi</p>' });`,
      'error-handling': `const { data, error } = await resend.emails.send({ ... });\nif (error) { console.error('Failed to send:', error.message); }`,
    },
    python: {
      basic: `import resend\nresend.api_key = "re_123"\nr = resend.Emails.send({"from":"me@me.com", "to":"you@you.com", "subject":"Hi", "html":"<p>Hi</p>"})`,
    },
    go: {
      basic: `client := resend.NewClient("re_123")\nparams := &resend.SendEmailRequest{To: []string{"test@test.com"}}`,
    },
  },
  prompts: {
    'react-email':
      "Write a Next.js API route that accepts a user's name and email, uses React Email to render an 'Account Created' component to a string, and sends it via the Resend Node.js SDK.",
  },
});

buildSkillV2({
  name: 'clerk',
  displayName: 'Clerk',
  description: 'Authentication and User Management.',
  categories: ['Authentication', 'Security'],
  quickStart:
    'Clerk provides comprehensive authentication UIs and a powerful backend API. Install the specific SDK for your framework (e.g., `@clerk/nextjs`).\n\n```bash\nnpm install @clerk/nextjs\n```',
  commonWorkflows:
    '### Webhook Synchronization\nDo not continuously query Clerk for user data. Instead, configure Clerk Webhooks (`user.created`, `user.updated`) to push data to your primary database (Neon, Supabase). Rely on your local database for JOINs.',
  productionPatterns:
    "### JWT Verification\nFor microservices (Go, Python) communicating with a Clerk-secured frontend, extract the Bearer token and verify the JWT signature using Clerk's public JWKS endpoint. Do not rely solely on the frontend session state.",
  errorRecovery:
    'Handle webhook delivery failures gracefully. Clerk webhooks include built-in Svix retry logic. Your webhook handler must be idempotent (e.g., using `INSERT ... ON CONFLICT DO UPDATE`).',
  securityNotes:
    'Always verify the Svix signature on incoming webhooks to ensure the payload actually originated from Clerk. Never trust unverified JWTs in backend routes.',
  performanceConsiderations:
    'Clerk heavily optimizes the `Auth` object on the Edge. Use `auth()` or `getAuth()` in server components to avoid unnecessary network round trips when extracting the `userId`.',
  testingGuidance:
    "For E2E testing (Playwright/Cypress), utilize Clerk's dedicated Testing Tokens to bypass the UI flow and programmatically authenticate test runners without hitting rate limits or triggering fraud detection.",
  troubleshooting:
    "If `auth()` returns null in a Next.js App Router setup, ensure your `middleware.ts` is configured correctly and the route isn't accidentally excluded from the `clerkMiddleware` matcher.",
  relatedSkills: ['Neon', 'Supabase', 'Resend'],
  links: { 'Backend API': 'https://clerk.com/docs/reference/backend-api' },
  examples: {
    typescript: {
      middleware: `import { clerkMiddleware } from '@clerk/nextjs/server';\nexport default clerkMiddleware();`,
      'webhook-handler': `import { Webhook } from 'svix';\nconst wh = new Webhook(process.env.WEBHOOK_SECRET);\nconst payload = wh.verify(req.body, req.headers);`,
    },
    python: {
      'verify-token': `from clerk_backend_api import Clerk\nclerk = Clerk(bearer_auth="sk_test_xxx")\nsession = clerk.sessions.verify_session("sess_xxx", "token")`,
    },
    go: { basic: `client, _ := clerk.NewClient("sk_test_xxx")` },
  },
  prompts: {
    'sync-webhook':
      'Write an Express webhook handler that securely verifies a Clerk `user.created` event using Svix, and conditionally inserts the user into a PostgreSQL database.',
  },
});

buildSkillV2({
  name: 'pinecone',
  displayName: 'Pinecone',
  description: 'Vector database for machine learning apps.',
  categories: ['Databases', 'AI'],
  quickStart:
    'Pinecone stores vector embeddings for fast similarity search, serving as the memory layer for RAG (Retrieval-Augmented Generation) applications.\n\n```bash\nnpm install @pinecone-database/pinecone\n```',
  commonWorkflows:
    '### RAG (Retrieval-Augmented Generation)\n1. Convert a user query to a vector embedding (e.g., using OpenAI `text-embedding-3-small`).\n2. Query Pinecone for the top 5 most similar vectors.\n3. Inject the retrieved metadata text into the LLM system prompt.',
  productionPatterns:
    "### Metadata Filtering\nDo not rely entirely on vector similarity if exact categorical constraints exist. Attach metadata (e.g., `tenant_id`, `document_type`) to your vectors and use Pinecone's filter syntax to restrict the search space before calculating cosine similarity.",
  errorRecovery:
    'Handle rate limits (`HTTP 429`) and index initialization delays. Serverless indexes scale automatically but may temporarily reject massive, sudden bursts of write operations. Use backoff retries for upserts.',
  securityNotes:
    'Pinecone Serverless environments do not support VPC peering. Ensure data is encrypted at rest and secure your API keys tightly. Segment tenant data utilizing namespaces or strict metadata filters.',
  performanceConsiderations:
    'Vector search latency scales with dimensionality and index size. Batch your upsert operations in chunks of 100-500 vectors. Query latency is typically <50ms; if slower, ensure you are querying the correct geographic region.',
  testingGuidance:
    'Mock the Pinecone client in unit tests. For integration tests, utilize an isolated `namespace` (e.g., `test_run_123`) to prevent test data from contaminating the primary index, and delete the namespace post-test.',
  troubleshooting:
    'If similarity search returns irrelevant results, verify that the embedding model used for the query is exactly the same model used during the upsert phase. Mismatched dimensions or models will produce garbage results.',
  relatedSkills: ['OpenAI', 'Anthropic', 'Upstash'],
  links: { 'API Reference': 'https://docs.pinecone.io/reference/api/introduction' },
  examples: {
    typescript: {
      upsert: `import { Pinecone } from '@pinecone-database/pinecone';\nconst pc = new Pinecone();\nconst index = pc.Index('docs');\nawait index.upsert([{ id: 'vec1', values: [0.1, 0.2, 0.3], metadata: { type: 'pdf' } }]);`,
      query: `const queryRes = await index.query({ topK: 3, vector: [0.1, 0.2, 0.3], filter: { type: { $eq: 'pdf' } } });`,
    },
    python: {
      upsert: `from pinecone import Pinecone\npc = Pinecone(api_key="xxx")\nindex = pc.Index("docs")\nindex.upsert(vectors=[{"id":"vec1", "values":[0.1, 0.2]}])`,
    },
    go: { basic: `// Use the official Go SDK or REST API to perform vector similarity queries.` },
  },
  prompts: {
    'semantic-search':
      'Write a Node.js function that takes a text query, calls the OpenAI embedding API to convert it to a vector, and queries a Pinecone index for the top 5 nearest neighbors, filtering by a specific `user_id`.',
  },
});

buildSkillV2({
  name: 'upstash',
  displayName: 'Upstash',
  description: 'Serverless Data Platform (Redis, Kafka, Vector).',
  categories: ['Databases', 'Messaging'],
  quickStart:
    'Upstash provides serverless Redis and Kafka via REST APIs, making it uniquely compatible with Edge environments where raw TCP connections are restricted.\n\n```bash\nnpm install @upstash/redis\n```',
  commonWorkflows:
    '### Rate Limiting at the Edge\nUtilize Upstash Redis in Cloudflare Workers or Vercel Edge to track IP addresses. Implement a sliding window algorithm to protect expensive downstream APIs (like OpenAI) from abuse.',
  productionPatterns:
    '### REST vs TCP\nIn serverless/edge environments, always use `@upstash/redis` (REST HTTP wrapper). In long-running containers (EC2, ECS), you may use standard `ioredis` connecting to the Upstash TCP endpoint for lower latency.',
  errorRecovery:
    'Upstash HTTP API retries automatically under the hood via the `@upstash/redis` SDK. Ensure your logic handles missing keys gracefully (Redis returns `null` for cache misses).',
  securityNotes:
    'Keep the UPSTASH_REDIS_REST_TOKEN secure. Avoid storing highly sensitive PII in Redis without application-level encryption, as it is primarily a fast caching layer.',
  performanceConsiderations:
    'REST overhead adds ~10-20ms of latency compared to raw TCP. For extremely high-throughput data pipelines, consider Upstash Kafka instead of Redis Pub/Sub to guarantee message durability.',
  testingGuidance:
    'Use a separate Upstash database for integration tests, or mock the REST endpoints using generic JSON responses.',
  troubleshooting:
    'If data disappears unexpectedly, ensure you are not hitting the memory limit of your free tier, which triggers the LRU (Least Recently Used) eviction policy.',
  relatedSkills: ['Vercel', 'Cloudflare', 'OpenAI'],
  links: { 'Redis API Docs': 'https://docs.upstash.com/redis' },
  examples: {
    typescript: {
      basic: `import { Redis } from '@upstash/redis';\nconst redis = new Redis({ url: 'URL', token: 'TOKEN' });\nawait redis.set('key', 'value', { ex: 3600 });`,
      'rate-limit': `import { Ratelimit } from '@upstash/ratelimit';\nconst ratelimit = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(10, "10 s") });`,
    },
    python: {
      basic: `from upstash_redis import Redis\nredis = Redis(url="URL", token="TOKEN")\nredis.set("key", "value")`,
    },
    go: { basic: `// Utilize standard net/http for REST requests to Upstash.` },
  },
  prompts: {
    'rate-limiter':
      'Write a Next.js API route that utilizes `@upstash/ratelimit` to restrict users to 5 requests per minute based on their IP address, returning a 429 response if exceeded.',
  },
});
