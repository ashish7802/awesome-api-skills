const { buildSkillV2 } = require('./build-skill-v2');

buildSkillV2({
  name: 'meilisearch',
  displayName: 'Meilisearch',
  description: 'Lightning-fast, open-source search engine.',
  categories: ['Search', 'Databases'],
  quickStart:
    'Meilisearch is an open-source, typo-tolerant search engine optimized for developer experience.\n\n```bash\nnpm install meilisearch\n```',
  commonWorkflows:
    '### Indexing and Searching\nAdd JSON documents to an index. Meilisearch automatically infers the schema. From the frontend or backend, query the index. It natively handles typos, highlighting, and sorting out of the box.',
  productionPatterns:
    '### Primary Keys\nAlways explicitly define the `primaryKey` when creating an index or passing documents. If omitted, Meilisearch will attempt to infer it (looking for `id`), which can lead to unpredictable behavior if your data uses UUIDs under custom field names.',
  errorRecovery:
    'Handle `MeiliSearchCommunicationError`. Indexing in Meilisearch is asynchronous. Pushing documents returns a `taskUid`. You must poll `client.waitForTask(taskUid)` if you need to guarantee the data is searchable before proceeding.',
  securityNotes:
    'Generate strict Tenant Tokens to allow frontend clients to search the database directly while enforcing security rules (e.g., restricting a user to only search documents where `owner_id = 123`).',
  performanceConsiderations:
    'While Meilisearch is extremely fast for reads, pushing thousands of documents individually is slow. Always batch document uploads in arrays of up to 100,000 documents per task to maximize throughput.',
  testingGuidance:
    'You can easily spin up a Meilisearch instance in a Docker container (`getmeili/meilisearch`) for CI/CD integration tests, destroying the container post-test.',
  troubleshooting:
    "If specific fields aren't returning in search results, verify the `displayedAttributes` setting. If filtering fails, ensure the field is explicitly added to `filterableAttributes`.",
  relatedSkills: ['Typesense', 'Algolia'],
  links: { 'Meilisearch JS': 'https://github.com/meilisearch/meilisearch-js' },
  examples: {
    typescript: {
      index: `import { MeiliSearch } from 'meilisearch';\nconst client = new MeiliSearch({ host: 'http://127.0.0.1:7700', apiKey: 'MASTER_KEY' });\nawait client.index('movies').addDocuments([{ id: 1, title: 'Batman' }]);`,
      search: `const res = await client.index('movies').search('batmn', { attributesToHighlight: ['title'] });`,
    },
    python: {
      basic: `import meilisearch\nclient = meilisearch.Client('http://127.0.0.1:7700', 'MASTER_KEY')`,
    },
    go: { basic: `// Utilize github.com/meilisearch/meilisearch-go` },
  },
  prompts: {
    'tenant-token':
      'Write a Node.js function using the Meilisearch SDK to generate a Tenant Token that restricts search queries to documents where `group_id` equals 42.',
  },
});

buildSkillV2({
  name: 'typesense',
  displayName: 'Typesense',
  description: 'Fast, typo-tolerant open-source search engine.',
  categories: ['Search', 'Databases'],
  quickStart:
    'Typesense is a RAM-based search engine built in C++. It requires explicitly defining your schema before indexing data.\n\n```bash\nnpm install typesense\n```',
  commonWorkflows:
    '### Schema Definition\nUnlike Meilisearch, Typesense requires defining a rigid schema (Collection) upfront. Define fields, their data types, and whether they are faceted. Then, upload JSON documents that strictly adhere to this schema.',
  productionPatterns:
    '### High Availability (HA)\nTypesense natively supports clustering via Raft consensus. When initializing the client, pass an array of `nodes` rather than a single host. The Typesense SDK automatically load-balances reads and handles node failures.',
  errorRecovery:
    'Handle `TypesenseError`. The SDK will automatically retry requests across the cluster if a node is unresponsive. However, schema validation errors during indexing (`HTTP 400`) require application-level data sanitization.',
  securityNotes:
    'Use Scoped Search API Keys to generate temporary, restricted keys for frontend clients. Never expose the Admin API key to the frontend.',
  performanceConsiderations:
    'Because Typesense holds the entire search index in RAM, monitor memory usage closely. Use the `import` endpoint (JSONL format) instead of individual `create` requests when migrating millions of records to avoid HTTP overhead.',
  testingGuidance:
    'Run the Typesense Docker image in your test pipeline. It boots in under 1 second, making it ideal for ephemeral test environments.',
  troubleshooting:
    'If search results are empty, verify that the fields you are searching against are explicitly defined in the schema and that `index: true` is set for those fields.',
  relatedSkills: ['Meilisearch', 'Algolia'],
  links: { 'Typesense API': 'https://typesense.org/docs/' },
  examples: {
    typescript: {
      collection: `import Typesense from 'typesense';\nconst client = new Typesense.Client({ nodes: [{ host: 'localhost', port: '8108', protocol: 'http' }], apiKey: 'xyz' });\nawait client.collections().create({ name: 'books', fields: [{ name: 'title', type: 'string' }] });`,
      search: `const res = await client.collections('books').documents().search({ q: 'harry', query_by: 'title' });`,
    },
    python: {
      basic: `import typesense\nclient = typesense.Client({'nodes': [{'host': 'localhost', 'port': '8108', 'protocol': 'http'}], 'api_key': 'xyz'})`,
    },
    go: { basic: `// Utilize github.com/typesense/typesense-go` },
  },
  prompts: {
    'scoped-key':
      "Write a Node.js function using the Typesense SDK that generates a scoped search key restricted to the 'companies' collection and a specific 'tenant_id'.",
  },
});

buildSkillV2({
  name: 'posthog',
  displayName: 'PostHog',
  description: 'Open-source product analytics, session recording, and feature flags.',
  categories: ['Analytics'],
  quickStart:
    'PostHog provides complete product analytics. The Node.js SDK allows you to capture events, identify users, and evaluate feature flags from your backend.\n\n```bash\nnpm install posthog-node\n```',
  commonWorkflows:
    "### User Identification and Events\nWhen a user signs up, call `posthog.identify()` to map their internal DB ID to their analytics profile. Then, call `posthog.capture()` for key backend actions (e.g., 'Subscription Created').",
  productionPatterns:
    '### Feature Flag Evaluation\nEvaluate feature flags on the backend before returning UI states. Use `posthog.getFeatureFlag(flagKey, distinctId)` to gate beta features securely. Local evaluation can dramatically speed up flag checks without hitting the API.',
  errorRecovery:
    "The `posthog-node` SDK batches events and flushes them asynchronously. Ensure you call `await posthog.shutdown()` during your application's graceful shutdown sequence, or you will lose pending events.",
  securityNotes:
    "Do not log PII (Passwords, SSNs, raw financial data) to PostHog. Scrub payloads before capture. Utilize PostHog's proxy capabilities to bypass ad-blockers securely.",
  performanceConsiderations:
    'Backend feature flag evaluation requires a network round-trip unless you configure Local Evaluation, which periodically syncs flag definitions and evaluates them entirely in-memory.',
  testingGuidance:
    'Disable PostHog in unit tests by passing a dummy API key and setting `enable: false` in the client configuration, or mock the `posthog` module entirely.',
  troubleshooting:
    'If events are missing in the dashboard, verify that you are flushing the queue before the serverless function (e.g., AWS Lambda) terminates. Standard asynchronous event capture will be killed instantly in Lambda.',
  relatedSkills: ['Mixpanel'],
  links: { 'PostHog Node SDK': 'https://posthog.com/docs/libraries/node' },
  examples: {
    typescript: {
      capture: `import { PostHog } from 'posthog-node';\nconst posthog = new PostHog('phc_123', { host: 'https://app.posthog.com' });\nposthog.capture({ distinctId: 'user_123', event: 'Order Completed', properties: { total: 49.99 } });`,
      flag: `const isBeta = await posthog.getFeatureFlag('beta-feature', 'user_123');`,
    },
    python: {
      basic: `import posthog\nposthog.project_api_key = 'phc_123'\nposthog.capture('user_123', 'Order Completed')`,
    },
    go: { basic: `// Utilize github.com/posthog/posthog-go` },
  },
  prompts: {
    'lambda-flush':
      'Write an AWS Lambda handler in Node.js that captures a PostHog event and explicitly flushes the PostHog client queue before returning the HTTP response.',
  },
});

buildSkillV2({
  name: 'mixpanel',
  displayName: 'Mixpanel',
  description: 'Advanced product analytics for tracking user interactions.',
  categories: ['Analytics'],
  quickStart:
    'Mixpanel tracks user behavior across platforms. Use the official Node.js SDK to accurately record server-side events, avoiding client-side ad-blocker discrepancies.\n\n```bash\nnpm install mixpanel\n```',
  commonWorkflows:
    '### Server-Side Tracking\nTrack revenue events or highly secure state changes (e.g., Account Upgrades) exclusively on the backend via `mixpanel.track()`. Frontend tracking is unreliable for billing metrics.',
  productionPatterns:
    "### User Profiles\nKeep user traits updated via `mixpanel.people.set()`. Synchronize fields like 'Plan Type', 'Lifetime Value', and 'Last Login' to enable powerful cohort analysis in the Mixpanel dashboard.",
  errorRecovery:
    'Handle network failures when sending batch events. If using the HTTP API directly rather than the SDK, implement robust exponential backoff. The Node SDK fails silently on network errors by default to prevent crashing.',
  securityNotes:
    'Mixpanel relies on a Project Token. Server-side integrations should also utilize the API Secret for administrative actions (like bulk deletions). Never expose the API Secret to clients.',
  performanceConsiderations:
    'Use `mixpanel.track_batch()` if you are importing historical data or processing thousands of events in a chron job to avoid rate limits and reduce network latency.',
  testingGuidance:
    'Initialize the SDK with a separate test Project Token for your staging environment to prevent test events from corrupting your production analytics data.',
  troubleshooting:
    'If events appear in Mixpanel with the wrong chronological order, ensure you are passing the exact UNIX timestamp in the properties payload if events are heavily delayed.',
  relatedSkills: ['PostHog'],
  links: { 'Mixpanel Node SDK': 'https://developer.mixpanel.com/docs/nodejs' },
  examples: {
    typescript: {
      track: `import Mixpanel from 'mixpanel';\nconst mixpanel = Mixpanel.init('TOKEN');\nmixpanel.track('Signed Up', { distinct_id: 'user_123', 'Referred By': 'Friend' });`,
      people: `mixpanel.people.set('user_123', { $first_name: 'John', Plan: 'Premium' });`,
    },
    python: {
      basic: `from mixpanel import Mixpanel\nmp = Mixpanel('TOKEN')\nmp.track('user_123', 'Signed Up')`,
    },
    go: { basic: `// Utilize official Mixpanel HTTP APIs for Go` },
  },
  prompts: {
    'batch-import':
      'Write a Node.js script using the Mixpanel SDK that reads an array of 500 historical user events and sends them using `track_batch`.',
  },
});

buildSkillV2({
  name: 'revenuecat',
  displayName: 'RevenueCat',
  description: 'In-App Subscriptions Made Easy.',
  categories: ['Payments', 'Finance'],
  quickStart:
    'RevenueCat manages mobile in-app purchases (Apple/Google) seamlessly. The REST API allows your backend to verify user subscription status and grant entitlements.\n\n```bash\n# Standard fetch/axios is used for REST API\n```',
  commonWorkflows:
    "### Entitlement Verification\nWhen a user accesses a premium feature, your backend queries the RevenueCat API (`/v1/subscribers/{app_user_id}`) to check if the 'Pro' entitlement is active.",
  productionPatterns:
    '### Webhooks\nDo not constantly poll the Subscriber API. Configure RevenueCat Webhooks to push `INITIAL_PURCHASE`, `RENEWAL`, and `CANCELLATION` events to your backend. Sync this status to your local database (e.g., PostgreSQL).',
  errorRecovery:
    'Handle HTTP 404 if the `app_user_id` does not exist in RevenueCat yet. Webhooks include retry logic; ensure your webhook handler is idempotent.',
  securityNotes:
    'Use the `X-RevenueCat-Authorization` header with your secret API key for backend calls. Verify webhook signatures using the shared secret to prevent malicious payload injection.',
  performanceConsiderations:
    'Calling the Subscriber API on every single premium request adds latency. Cache the entitlement status locally in your database or Redis, and invalidate the cache when a webhook is received.',
  testingGuidance:
    'RevenueCat provides a sandbox environment. Use sandbox API keys and trigger test webhooks directly from the RevenueCat dashboard.',
  troubleshooting:
    "If entitlements aren't active, verify the user's `app_user_id` matches the exact string initialized in the iOS/Android client SDK.",
  relatedSkills: ['Stripe', 'Paddle'],
  links: { 'RevenueCat API': 'https://www.revenuecat.com/docs/api-v1' },
  examples: {
    typescript: {
      check: `const res = await fetch('https://api.revenuecat.com/v1/subscribers/user_123', { headers: { Authorization: \`Bearer \${SECRET}\` } });\nconst data = await res.json();\nconst isPro = data.subscriber.entitlements.pro?.expires_date > new Date().toISOString();`,
      'webhook-auth': `if (req.headers['authorization'] !== \`Bearer \${WEBHOOK_SECRET}\`) return res.status(401).send();`,
    },
    python: {
      basic: `import requests\nres = requests.get("https://api.revenuecat.com/v1/subscribers/user_123", headers={"Authorization": f"Bearer {secret}"})`,
    },
    go: { basic: `// Utilize standard net/http for REST requests.` },
  },
  prompts: {
    'entitlement-check':
      "Write an Express.js middleware function that calls the RevenueCat API to verify a user's 'Premium' entitlement, returning 403 Forbidden if inactive.",
  },
});
