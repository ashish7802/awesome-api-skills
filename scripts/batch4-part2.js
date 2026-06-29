const { buildSkillV4 } = require('./build-skill-v4');

buildSkillV4({
  name: 'rabbitmq',
  displayName: 'RabbitMQ',
  description: 'Reliable, mature AMQP message broker.',
  categories: ['Messaging', 'Enterprise'],
  learningLevel: 'advanced',
  useCases: ['Task Queues', 'Microservices'],
  deploymentTargets: ['kubernetes', 'docker', 'aws'],
  ecosystem: 'infrastructure',
  maintainers: ['vmware'],
  stability: 'production',
  relationships: [
    { target: 'kafka', type: 'alternative_to' },
    { target: 'bullmq', type: 'alternative_to' },
  ],
  quickStart:
    'RabbitMQ uses the AMQP protocol to route messages between producers and consumers using highly configurable Exchanges and Queues.\n\n```bash\ndocker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management\n```',
  productionPatterns:
    '### Acknowledgements\nNever use auto-acknowledgement in production. Consumers must explicitly acknowledge (`ack`) the message *after* successfully processing it. If the worker crashes, RabbitMQ will requeue the message.',
  architecture:
    '### Exchanges vs Queues\nProducers never publish directly to queues; they publish to Exchanges. Configure a `topic` exchange to route messages to multiple queues based on routing keys (e.g., `user.created` goes to both the email queue and analytics queue).',
  errorRecovery:
    'Always configure a Dead Letter Exchange (DLX). If a message fails processing multiple times (poison pill), route it to the DLX for manual inspection rather than infinitely looping and crashing the worker.',
  securityNotes:
    'Do not expose the management UI (port 15672) to the internet. Enforce TLS for all AMQP connections to prevent packet sniffing of message payloads.',
  links: { 'RabbitMQ Docs': 'https://www.rabbitmq.com/documentation.html' },
  examples: {
    typescript: {
      producer: `import amqp from 'amqplib';\nconst conn = await amqp.connect('amqp://localhost');\nconst ch = await conn.createChannel();\nawait ch.assertQueue('tasks', { durable: true });\nch.sendToQueue('tasks', Buffer.from('work'), { persistent: true });`,
    },
  },
});

buildSkillV4({
  name: 'bullmq',
  displayName: 'BullMQ',
  description: 'Redis-based robust queue system for Node.js.',
  categories: ['Messaging', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['Background Jobs', 'Delayed Tasks'],
  deploymentTargets: ['docker', 'railway'],
  ecosystem: 'javascript',
  maintainers: ['taskforcesh'],
  stability: 'production',
  relationships: [
    { target: 'redis', type: 'depends_on' },
    { target: 'rabbitmq', type: 'alternative_to' },
    { target: 'nestjs', type: 'integrates_with' },
  ],
  quickStart:
    'BullMQ leverages Redis Lua scripts to provide an incredibly fast, transactional task queue natively in TypeScript.\n\n```bash\nnpm install bullmq ioredis\n```',
  productionPatterns:
    "### Sandboxed Processors\nFor CPU-intensive tasks (image resizing, PDF generation), use BullMQ Sandboxed Processors. This forces the worker to execute in a separate Node.js child process, preventing the heavy task from blocking your API's main event loop.",
  architecture:
    '### Redis MaxMemory\nBullMQ queues can grow infinitely if consumers crash. Ensure your Redis instance is configured with a strict `maxmemory` limit and an eviction policy like `noeviction` (which causes BullMQ to gracefully pause adding jobs) to prevent OOM crashes.',
  errorRecovery:
    "Configure automatic retries with exponential backoff on your jobs (`attempts: 3, backoff: { type: 'exponential', delay: 1000 }`) to handle transient third-party API failures gracefully.",
  securityNotes:
    'Because BullMQ stores task payloads in Redis, never pass raw sensitive data (credit cards, unhashed passwords) in the `job.data` object. Pass a database ID and fetch the sensitive data securely within the worker.',
  links: { 'BullMQ Docs': 'https://docs.bullmq.io/' },
  examples: {
    typescript: {
      queue: `import { Queue, Worker } from 'bullmq';\nconst myQueue = new Queue('Paint', { connection: { host: 'localhost' } });\nawait myQueue.add('car', { color: 'red' });\n\nconst worker = new Worker('Paint', async job => {\n  console.log(job.data.color);\n}, { connection: { host: 'localhost' } });`,
    },
  },
});

buildSkillV4({
  name: 'redis-streams',
  displayName: 'Redis Streams',
  description: 'A data type in Redis that models an append-only log.',
  categories: ['Messaging', 'Databases'],
  learningLevel: 'advanced',
  useCases: ['Event Sourcing', 'Message Broker'],
  deploymentTargets: ['upstash', 'aws', 'gcp'],
  ecosystem: 'database',
  maintainers: ['redis'],
  stability: 'production',
  relationships: [
    { target: 'redis', type: 'depends_on' },
    { target: 'kafka', type: 'alternative_to' },
  ],
  quickStart:
    'Redis Streams acts similarly to Kafka, providing an append-only log that multiple consumer groups can read from simultaneously.\n\n```bash\n# XADD key ID field value\nredis-cli XADD mystream * sensor-id 1234 temp 19.8\n```',
  productionPatterns:
    '### Consumer Groups\nDo not use simple `XREAD` if you have multiple workers. Use Consumer Groups (`XGROUP CREATE`). This ensures that a single message in the stream is delivered to exactly one worker in the group, enabling horizontal scaling.',
  architecture:
    '### Trimming\nUnlike Kafka, which uses disk, Redis Streams live in memory. You MUST trim the stream (`MAXLEN`) during `XADD` or via a background job, otherwise the stream will consume all Redis RAM and crash the server.',
  errorRecovery:
    'If a consumer crashes before acknowledging a message, that message remains in the Pending Entries List (PEL). Write a separate cleanup worker that periodically inspects the PEL (`XPENDING`) and reassigns (`XCLAIM`) stalled messages to healthy workers.',
  securityNotes:
    'When exposing Redis via Upstash or external providers, always enforce TLS and strongly generated ACL passwords. Never use the default `default` user for application connections.',
  links: { 'Redis Streams': 'https://redis.io/docs/data-types/streams/' },
  examples: {
    typescript: {
      stream: `import Redis from 'ioredis';\nconst redis = new Redis();\n\n// Add to stream\nawait redis.xadd('mystream', 'MAXLEN', '~', 1000, '*', 'event', 'signup', 'user_id', 1);\n\n// Read as group\nconst messages = await redis.xreadgroup('GROUP', 'mygroup', 'consumer1', 'BLOCK', 2000, 'STREAMS', 'mystream', '>');`,
    },
  },
});

buildSkillV4({
  name: 'oauth2',
  displayName: 'OAuth 2.0',
  description: 'The industry-standard protocol for authorization.',
  categories: ['Authentication', 'Security'],
  learningLevel: 'advanced',
  useCases: ['Delegated Access', 'API Security'],
  deploymentTargets: ['any'],
  ecosystem: 'security',
  maintainers: ['ietf'],
  stability: 'production',
  relationships: [
    { target: 'openid-connect', type: 'extended_by' },
    { target: 'jwt', type: 'works_well_with' },
    { target: 'clerk', type: 'implemented_by' },
    { target: 'better-auth', type: 'implemented_by' },
  ],
  quickStart:
    'OAuth 2.0 is an authorization framework that allows a third-party application to obtain limited access to an HTTP service, either on behalf of a resource owner or by allowing the third-party application to obtain access on its own behalf.',
  productionPatterns:
    '### Authorization Code Flow with PKCE\nFor single-page apps (React/Vue) and mobile apps, never use the Implicit Flow. Always use the Authorization Code Flow with PKCE (Proof Key for Code Exchange) to prevent authorization code interception attacks.',
  architecture:
    '### Scopes\nDesign your scopes to be granular (`read:users`, `write:orders`). When requesting access from a user, request the absolute minimum permissions necessary to function.',
  errorRecovery:
    'If an access token expires (HTTP 401), automatically trigger the Refresh Token flow silently in the background, update the token, and retry the original HTTP request without forcing the user to log in again.',
  securityNotes:
    'Never store the Client Secret in a frontend application or mobile app. State parameters must be cryptographically secure random strings to prevent CSRF attacks during the OAuth redirect.',
  links: { 'OAuth.net': 'https://oauth.net/2/' },
  examples: {
    yaml: {
      flow: '1. App requests Auth Code (redirects to Provider)\n2. User logs in, Provider redirects back with Auth Code\n3. App POSTs Auth Code + Client Secret to Provider\n4. Provider returns Access Token\n5. App uses Access Token to call API',
    },
  },
});

buildSkillV4({
  name: 'openid-connect',
  displayName: 'OpenID Connect (OIDC)',
  description: 'Identity layer on top of the OAuth 2.0 protocol.',
  categories: ['Authentication', 'Security'],
  learningLevel: 'advanced',
  useCases: ['SSO', 'Identity Verification'],
  deploymentTargets: ['any'],
  ecosystem: 'security',
  maintainers: ['openid-foundation'],
  stability: 'production',
  relationships: [
    { target: 'oauth2', type: 'depends_on' },
    { target: 'jwt', type: 'integrates_with' },
    { target: 'github-actions', type: 'works_well_with' },
  ],
  quickStart:
    'While OAuth 2.0 is for *Authorization* (granting access to APIs), OIDC is for *Authentication* (verifying who the user is). It introduces the ID Token (a JWT).',
  productionPatterns:
    '### GitHub Actions OIDC\nNever store long-lived AWS or GCP credentials in GitHub Actions secrets. Configure GitHub Actions as an OIDC Identity Provider in AWS/GCP. Your workflow requests a short-lived token verifying its repository identity, eliminating credential leakage.',
  architecture:
    "### ID Token vs Access Token\nDo not send the ID Token to your backend API as proof of authorization. The ID Token is strictly for the frontend to know the user's name and email. The Access Token is what gets sent to the API in the `Authorization` header.",
  errorRecovery:
    'Always validate the `iss` (Issuer) and `aud` (Audience) claims in the ID Token. If they do not match your exact OIDC provider and application client ID, instantly reject the token.',
  securityNotes:
    "Fetch the provider's JWKS (JSON Web Key Set) dynamically to verify the ID token's cryptographic signature. Do not hardcode public keys, as identity providers rotate them frequently.",
  links: { OIDC: 'https://openid.net/connect/' },
  examples: {
    yaml: {
      claims:
        '{\n  "iss": "https://accounts.google.com",\n  "aud": "123456.apps.googleusercontent.com",\n  "sub": "10769150350006150715113082367",\n  "email": "user@example.com",\n  "exp": 1610000000\n}',
    },
  },
});
