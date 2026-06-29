const { buildSkillV2 } = require('./build-skill-v2');

buildSkillV2({
  name: 'paddle',
  displayName: 'Paddle',
  description: 'B2B and B2C billing platform handling tax compliance globally.',
  categories: ['Payments', 'Finance'],
  quickStart:
    'Paddle acts as a Merchant of Record, meaning they handle sales tax (VAT, GST) calculations and remittance for you. Use the `@paddle/paddle-node` SDK to manage subscriptions and invoices.\n\n```bash\nnpm install @paddle/paddle-node\n```',
  commonWorkflows:
    '### Subscription Creation\nTypically, Paddle Checkout runs on the frontend. The backend listens for the `transaction.completed` webhook to activate the subscription in your database, bypassing manual server-side charge creation.',
  productionPatterns:
    '### Merchant of Record Compliance\nBecause Paddle is the MoR, you must rely on their webhook events (`subscription.activated`, `subscription.past_due`) as the absolute source of truth for billing access. Do not attempt to calculate taxes or prorations locally.',
  errorRecovery:
    'Handle `ApiError`. Common issues include invalid `price_id` values or attempting to charge a customer in an unsupported currency. Webhooks from Paddle retry automatically.',
  securityNotes:
    'Always verify incoming webhook signatures using your Paddle Webhook Secret. Ensure your backend validates that the `status` of a transaction is truly `completed` before granting entitlements.',
  performanceConsiderations:
    'The Paddle API is robust but should not be called synchronously during critical read paths. Cache subscription statuses in your local database (e.g., Supabase or Neon).',
  testingGuidance:
    'Use the Paddle Sandbox environment (`sandbox-api.paddle.com`). Trigger test webhooks via the dashboard to simulate edge cases like failed payments and cancellations.',
  troubleshooting:
    'If webhooks are failing signature verification, ensure you are passing the raw, unmodified request body buffer to the verification function, not a parsed JSON object.',
  relatedSkills: ['Stripe', 'Lemon Squeezy'],
  links: { 'Paddle API': 'https://developer.paddle.com/api-reference' },
  examples: {
    typescript: {
      customer: `import { Paddle, Environment } from '@paddle/paddle-node';\nconst paddle = new Paddle('API_KEY', { environment: Environment.sandbox });\nconst customer = await paddle.customers.create({ email: 'test@example.com' });`,
      webhook: `const event = paddle.webhooks.unmarshal(req.body, req.headers['paddle-signature'], 'WEBHOOK_SECRET');\nif (event.eventType === 'subscription.activated') console.log('Active!');`,
    },
    python: {
      basic: `import requests\nres = requests.post("https://api.paddle.com/customers", headers={"Authorization": f"Bearer {key}"})`,
    },
    go: { basic: `// Utilize standard HTTP requests to interact with the Paddle API` },
  },
  prompts: {
    'webhook-verify':
      "Write an Express route that receives a Paddle webhook, uses the official Node SDK to verify the signature, and updates a user's status in the database.",
  },
});

buildSkillV2({
  name: 'lemon-squeezy',
  displayName: 'Lemon Squeezy',
  description: 'Merchant of record for software companies.',
  categories: ['Payments', 'Finance'],
  quickStart:
    'Lemon Squeezy simplifies global tax compliance and recurring billing. The official `@lemonsqueezy/lemonsqueezy.js` SDK handles interactions cleanly.\n\n```bash\nnpm install @lemonsqueezy/lemonsqueezy.js\n```',
  commonWorkflows:
    '### License Key Management\nLemon Squeezy uniquely offers built-in License Key generation for desktop apps. You can programmatically generate, activate, and validate license keys associated with a purchase.',
  productionPatterns:
    '### Syncing Orders\nUse webhooks (`order_created`, `subscription_created`) to sync order data. When a user buys your SaaS, parse the `custom_data` object in the webhook payload (which should contain your internal `user_id`) to map the purchase.',
  errorRecovery:
    'Handle rate limit errors (HTTP 429). The API is heavily cached but mutations are strictly limited. Catch generic HTTP errors using `try/catch` and inspect the `error` property returned by the SDK.',
  securityNotes:
    "Webhook signatures in Lemon Squeezy use HMAC SHA256. Verify the `X-Signature` header against the raw request body using Node's `crypto` module to prevent spoofed payments.",
  performanceConsiderations:
    'Do not query the Lemon Squeezy API on every page load to check subscription status. Rely entirely on your database, which should be continually updated by incoming webhooks.',
  testingGuidance:
    'Lemon Squeezy provides a dedicated Test Mode. Use their test credit cards to simulate successful and failed subscription renewals.',
  troubleshooting:
    'If `custom_data` is missing in webhooks, ensure your frontend checkout URL explicitly appended the `?checkout[custom][user_id]=123` parameter during initialization.',
  relatedSkills: ['Paddle', 'Stripe'],
  links: { 'Lemon Squeezy API': 'https://docs.lemonsqueezy.com/api' },
  examples: {
    typescript: {
      setup: `import { lemonSqueezySetup, getStore } from '@lemonsqueezy/lemonsqueezy.js';\nlemonSqueezySetup({ apiKey: process.env.LS_API_KEY });\nconst { data, error } = await getStore(12345);`,
      'webhook-verify': `import crypto from 'crypto';\nconst secret = 'WEBHOOK_SECRET';\nconst hmac = crypto.createHmac('sha256', secret);\nconst digest = Buffer.from(hmac.update(req.rawBody).digest('hex'), 'utf8');\nconst signature = Buffer.from(req.get('X-Signature') || '', 'utf8');`,
    },
    python: {
      basic: `import requests\nres = requests.get("https://api.lemonsqueezy.com/v1/stores", headers={"Authorization": f"Bearer {key}"})`,
    },
    go: { basic: `// Utilize standard HTTP requests to interact with the Lemon Squeezy API` },
  },
  prompts: {
    'validate-license':
      'Write a Node.js function using the Lemon Squeezy SDK that validates a provided software license key string against a specific instance.',
  },
});

buildSkillV2({
  name: 'nats',
  displayName: 'NATS',
  description: 'Connective technology for adaptive edge and distributed systems.',
  categories: ['Messaging', 'DevOps'],
  quickStart:
    'NATS is an extremely high-performance messaging system (Pub/Sub, Request/Reply, JetStream). Use the `nats` package for Node.js to communicate.\n\n```bash\nnpm install nats\n```',
  commonWorkflows:
    '### JetStream Persistence\nStandard NATS is ephemeral (fire-and-forget). For guaranteed delivery and message replay, use JetStream. Create a Stream, publish messages to it, and consume them using durable consumers.',
  productionPatterns:
    '### Request-Reply Architecture\nReplace internal REST microservices with NATS Request-Reply. Service A sends a request to a subject `orders.create`; Service B processes it and replies on a unique inbox subject. This decouples services and enables load balancing automatically.',
  errorRecovery:
    'NATS handles reconnections automatically. However, if a message publication to JetStream fails (e.g., `NoResponders`), catch the error and queue it locally or utilize an exponential backoff retry mechanism.',
  securityNotes:
    'Use NATS Decentralized Auth (NKEYS). Never pass plaintext passwords. Issue scoped credentials to services, restricting which subjects they can publish or subscribe to.',
  performanceConsiderations:
    'NATS can process millions of messages per second. Avoid processing messages sequentially in tight loops; utilize asynchronous handlers to prevent blocking the Node.js event loop.',
  testingGuidance:
    'Spin up a local NATS server binary (`nats-server`) or Docker container in your CI/CD pipeline. It boots in milliseconds and consumes negligible RAM.',
  troubleshooting:
    "If consumers aren't receiving messages in a JetStream, verify that the subject they are listening to exactly matches the subjects bound to the underlying Stream configuration.",
  relatedSkills: ['Kafka', 'Redis'],
  links: { 'NATS Documentation': 'https://docs.nats.io/' },
  examples: {
    typescript: {
      pubsub: `import { connect, StringCodec } from 'nats';\nconst nc = await connect({ servers: 'nats://localhost:4222' });\nconst sc = StringCodec();\nnc.publish('updates', sc.encode('hello'));`,
      jetstream: `const js = nc.jetstream();\nawait js.publish('orders.new', sc.encode('order1'));`,
    },
    python: {
      basic: `import asyncio\nimport nats\nasync def main():\n  nc = await nats.connect("localhost")\n  await nc.publish("updates", b'hello')`,
    },
    go: { basic: `nc, _ := nats.Connect(nats.DefaultURL)\nnc.Publish("updates", []byte("hello"))` },
  },
  prompts: {
    'request-reply':
      "Write a Node.js script using the NATS SDK where a service subscribes to 'math.double', listens for requests, doubles the payload, and replies.",
  },
});

buildSkillV2({
  name: 'kafka',
  displayName: 'Apache Kafka',
  description: 'Distributed event streaming platform.',
  categories: ['Messaging', 'DevOps'],
  quickStart:
    'Kafka handles high-throughput, fault-tolerant event streams. `kafkajs` is a modern, pure JavaScript client for Node.js.\n\n```bash\nnpm install kafkajs\n```',
  commonWorkflows:
    "### Event Sourcing\nPublish every state change in your application (e.g., 'UserCreated', 'OrderShipped') to a Kafka topic. Downstream services (Search Indexers, Data Warehouses) consume these topics at their own pace.",
  productionPatterns:
    '### Consumer Groups\nUse Consumer Groups to load-balance message consumption. If you have a topic with 10 partitions, you can run 10 Node.js instances in the same group, and Kafka will assign exactly one partition to each instance.',
  errorRecovery:
    'Handle offset commits carefully. Turn off `autoCommit` if your processing logic is complex. Only commit the offset after the data is successfully written to your database to guarantee At-Least-Once delivery.',
  securityNotes:
    'Enable SASL/SCRAM or SSL authentication. Encrypt traffic in transit. Utilize ACLs to restrict which services can write to specific topics.',
  performanceConsiderations:
    'Batching is critical. Use `producer.sendBatch()` to maximize throughput. Configure `linger.ms` on the producer to wait slightly before sending to increase batch sizes and reduce network overhead.',
  testingGuidance:
    'Use `testcontainers-node` to spin up an ephemeral Kafka broker during integration tests.',
  troubleshooting:
    'If consumers are constantly rebalancing, it usually means your `eachMessage` handler is taking longer than the `sessionTimeout`. Increase the timeout or optimize the handler.',
  relatedSkills: ['NATS', 'Upstash'],
  links: { 'KafkaJS Documentation': 'https://kafka.js.org/' },
  examples: {
    typescript: {
      producer: `import { Kafka } from 'kafkajs';\nconst kafka = new Kafka({ clientId: 'app', brokers: ['localhost:9092'] });\nconst producer = kafka.producer();\nawait producer.connect();\nawait producer.send({ topic: 'test', messages: [{ value: 'msg' }] });`,
      consumer: `const consumer = kafka.consumer({ groupId: 'group1' });\nawait consumer.connect();\nawait consumer.subscribe({ topic: 'test', fromBeginning: true });\nawait consumer.run({ eachMessage: async ({ message }) => console.log(message.value.toString()) });`,
    },
    python: {
      basic: `from kafka import KafkaProducer\nproducer = KafkaProducer(bootstrap_servers='localhost:9092')\nproducer.send('test', b'msg')`,
    },
    go: { basic: `// Utilize confluent-kafka-go for high performance` },
  },
  prompts: {
    'manual-commit':
      'Write a KafkaJS consumer in TypeScript that disables auto-commit, processes messages, and manually commits the offset only if processing succeeds.',
  },
});

buildSkillV2({
  name: 'better-auth',
  displayName: 'Better Auth',
  description: 'Comprehensive authentication library for TypeScript.',
  categories: ['Authentication'],
  quickStart:
    'Better Auth provides framework-agnostic auth (Next.js, Express, SvelteKit) deeply integrated with modern ORMs like Drizzle and Prisma.\n\n```bash\nnpm install better-auth\n```',
  commonWorkflows:
    '### OAuth and Magic Links\nConfigure plugins to enable OAuth (GitHub, Google) or Magic Links. Better Auth natively handles session creation and saves profiles to your database using the provided database adapter.',
  productionPatterns:
    '### Two-Factor Authentication\nUtilize the `twoFactor` plugin to require TOTP before issuing a valid session cookie. Ensure you construct your UI to gracefully handle the `requires_two_factor` response state.',
  errorRecovery:
    'Handle `BetterAuthError`. When creating users, handle conflicts gracefully (e.g., Email already exists) and prompt the user to log in instead.',
  securityNotes:
    'Better Auth handles CSRF and secure cookies out of the box. Ensure your `trustedOrigins` configuration accurately reflects your production domains to prevent session hijacking.',
  performanceConsiderations:
    'Session validation happens on the Edge or Server. Optimize your database queries (e.g., adding indexes to the `session_token` column) to ensure ultra-fast session lookups on every request.',
  testingGuidance:
    'Better Auth can be mocked easily by overriding the `getSession` function in your unit tests, or by provisioning a test database specifically for your test runner.',
  troubleshooting:
    'If sessions randomly invalidate, ensure you are not clearing cookies improperly across subdomains and that the `secret` configuration variable remains static across deployments.',
  relatedSkills: ['Clerk', 'Neon'],
  links: { 'Better Auth Docs': 'https://www.better-auth.com/docs' },
  examples: {
    typescript: {
      setup: `import { betterAuth } from 'better-auth';\nimport { drizzleAdapter } from 'better-auth/adapters/drizzle';\nexport const auth = betterAuth({ database: drizzleAdapter(db, { provider: 'pg' }), emailAndPassword: { enabled: true } });`,
      middleware: `import { auth } from './auth';\nconst session = await auth.api.getSession({ headers: req.headers });\nif (!session) return res.status(401).send();`,
    },
    python: {
      basic: `// Better Auth is heavily optimized for the TypeScript ecosystem. Use standard OAuth libraries for Python.`,
    },
    go: { basic: `// Not applicable to Go. Utilize Gotrue or custom auth.` },
  },
  prompts: {
    'magic-link':
      "Write a Next.js App Router API route utilizing Better Auth's magic link plugin to send an authentication email.",
  },
});
