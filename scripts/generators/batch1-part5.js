const { buildSkill } = require('./build-skill');

buildSkill({
  name: 'mapbox',
  displayName: 'Mapbox',
  description: 'Mapping and location cloud platform.',
  categories: ['Maps', 'Developer Tools'],
  overview:
    'Mapbox provides APIs for maps, geocoding, and routing. This skill focuses on the Mapbox Search (Geocoding) and Navigation APIs for backend services.',
  installation: '```bash\nnpm install @mapbox/mapbox-sdk\npip install mapbox\n```',
  authentication:
    'Authenticate using Access Tokens. Default public tokens (`pk.*`) are for frontends. Secret tokens (`sk.*`) are for backends.',
  coreConcepts:
    '- **Geocoding**: Converting text (addresses) into geographic coordinates.\n- **Isochrone**: Calculating areas reachable within a given time.\n- **Matrix API**: Travel times between many points.',
  workflows:
    '1. Instantiate the client with your Secret Token.\n2. Call `geocodingService.forwardGeocode`.\n3. Extract `features[0].center` for coordinates.',
  errorHandling:
    'Catch network errors and parse the `message` from Mapbox. Check HTTP 422 for unprocessable geometry.',
  security:
    'Always use URL restrictions (Referrer matching) on Public Tokens. Keep Secret Tokens completely out of client-side code.',
  rateLimits: 'Geocoding is limited to 600 requests per minute on standard plans.',
  bestPractices:
    'Cache geocoding results permanently where legally allowed by the Terms of Service to dramatically reduce API costs and latency.',
  troubleshooting:
    'If reverse geocoding returns inaccurate results, ensure you are passing the correct `types` filter (e.g., `address`, `poi`).',
  links: { 'API Reference': 'https://docs.mapbox.com/api/' },
  examples: {
    typescript: `import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';\nconst geocodingService = mbxGeocoding({ accessToken: 'sk.xxx' });`,
    python: `from mapbox import Geocoder\ngeocoder = Geocoder(access_token="sk.xxx")`,
  },
  prompts: {
    geocode:
      'Write a function using the Mapbox SDK to take an address string, forward geocode it, and return the precise latitude and longitude array.',
  },
  test: `console.log('Tested Mapbox');`,
});

buildSkill({
  name: 'discord',
  displayName: 'Discord',
  description: 'Chat and community platform.',
  categories: ['Messaging'],
  overview:
    'The Discord API allows you to build bots, automate servers, and manage webhooks. This skill focuses on the `discord.js` library for bot integration.',
  installation: '```bash\nnpm install discord.js\npip install discord.py\n```',
  authentication:
    'Bots authenticate using a Bot Token provided in the `Authorization: Bot <token>` header (handled automatically by the SDK).',
  coreConcepts:
    '- **Guild**: A Discord server.\n- **Intents**: WebSocket subscription flags defining what events the bot receives.\n- **Slash Commands**: Application commands registered to Discord.',
  workflows:
    '1. Initialize `Client` with Intents.\n2. Login using `client.login(TOKEN)`.\n3. Listen to `interactionCreate` to handle Slash Commands.',
  errorHandling:
    "Handle `DiscordAPIError`. Code 50013 indicates 'Missing Permissions'. Code 10008 indicates 'Unknown Message'.",
  security:
    'Never commit your Bot Token. If leaked, Discord will automatically reset it, crashing your application.',
  rateLimits:
    'Global rate limits are 50 requests per second. Route-specific limits exist (e.g., renaming channels is highly restricted).',
  bestPractices:
    'Always use Slash Commands (`interactionCreate`) rather than parsing text messages (`messageCreate`). Text message intent is restricted.',
  troubleshooting:
    'If your bot stops receiving events, verify that the required Privileged Intents (like Guild Members) are enabled in the Discord Developer Portal.',
  links: { 'API Reference': 'https://discord.com/developers/docs/intro' },
  examples: {
    typescript: `import { Client, GatewayIntentBits } from 'discord.js';\nconst client = new Client({ intents: [GatewayIntentBits.Guilds] });`,
    python: `import discord\nclient = discord.Client(intents=discord.Intents.default())`,
  },
  prompts: {
    'slash-command':
      "Write a discord.js event listener that intercepts a slash command named '/ping' and replies with 'Pong!' ephemerally.",
  },
  test: `console.log('Tested Discord');`,
});

buildSkill({
  name: 'slack',
  displayName: 'Slack',
  description: 'Team communication platform.',
  categories: ['Messaging', 'Productivity'],
  overview:
    'Slack APIs enable custom apps, bots, and slash commands. This skill covers the `@slack/web-api` and `@slack/bolt` frameworks.',
  installation: '```bash\nnpm install @slack/bolt\npip install slack_bolt\n```',
  authentication:
    'Uses Bot User OAuth Tokens (`xoxb-`) for sending messages, and Signing Secrets to verify incoming requests from Slack.',
  coreConcepts:
    '- **Block Kit**: A JSON-based UI framework for building rich messages.\n- **Events API**: Webhooks for real-time Slack activity.\n- **Conversations**: Channels, DMs, or Private Groups.',
  workflows:
    '1. Initialize Bolt `App` with token and signing secret.\n2. Use `app.message()` to listen to text.\n3. Use `app.client.chat.postMessage` to send messages.',
  errorHandling:
    'Catch `WebAPIPlatformError`. Check `error.data.error` (e.g., `channel_not_found`, `not_in_channel`).',
  security:
    'You MUST verify the signature of incoming Slack requests using your Signing Secret. The Bolt framework does this automatically.',
  rateLimits:
    'Tier 1 endpoints are 1 request per second. Tier 4 endpoints (like chat.postMessage) are 1 request per second per channel.',
  bestPractices:
    'Use Block Kit Builder to design UIs. Store state in your database rather than trying to pass complex state through Slack modal `private_metadata`.',
  troubleshooting:
    "If your app can't post to a channel, ensure you have invited the bot to the channel first.",
  links: { 'API Reference': 'https://api.slack.com/apis' },
  examples: {
    typescript: `import { App } from '@slack/bolt';\nconst app = new App({ token: 'xoxb-123', signingSecret: 'secret' });`,
    python: `from slack_bolt import App\napp = App(token="xoxb-123", signing_secret="secret")`,
  },
  prompts: {
    'post-message':
      'Write a Slack Bolt Node.js function that posts a complex Block Kit message containing a button to a specific channel.',
  },
  test: `console.log('Tested Slack');`,
});

buildSkill({
  name: 'firebase',
  displayName: 'Firebase Admin',
  description: 'Backend-as-a-Service by Google.',
  categories: ['Cloud', 'Databases'],
  overview:
    'Firebase Admin SDK allows privileged server environments to interact with Firestore, Auth, and Cloud Messaging.',
  installation: '```bash\nnpm install firebase-admin\npip install firebase-admin\n```',
  authentication:
    'Authenticate using a Google Cloud Service Account key JSON file or Application Default Credentials (ADC).',
  coreConcepts:
    '- **Firestore**: NoSQL document database.\n- **Custom Tokens**: JWTs minted on the server to log users into the client SDK.\n- **FCM**: Firebase Cloud Messaging for push notifications.',
  workflows:
    '1. Initialize `initializeApp({ credential: cert(serviceAccount) })`.\n2. Access Firestore: `getFirestore()`.\n3. Perform operations bypassing security rules.',
  errorHandling:
    'Catch `FirebaseError`. Error codes match RPC statuses (e.g., `not-found`, `already-exists`).',
  security:
    'Service accounts have absolute God-mode access. Never deploy an Admin SDK service account key to a client application.',
  rateLimits:
    'Firestore allows 10,000 writes per second per database. Batch operations are limited to 500 documents per batch.',
  bestPractices:
    'Use `batch()` for multiple writes to ensure atomicity. Use `runTransaction()` when a write depends on the current value of a document.',
  troubleshooting:
    "If initialized multiple times, the SDK throws a 'default app already exists' error. Check `getApps().length` before initializing.",
  links: { 'API Reference': 'https://firebase.google.com/docs/admin/setup' },
  examples: {
    typescript: `import { initializeApp, cert } from 'firebase-admin/app';\nimport { getFirestore } from 'firebase-admin/firestore';\ninitializeApp({ credential: cert(require('./key.json')) });`,
    python: `import firebase_admin\nfrom firebase_admin import credentials\ncred = credentials.Certificate("key.json")\nfirebase_admin.initialize_app(cred)`,
  },
  prompts: {
    'firestore-batch':
      "Write a Node.js function using Firebase Admin SDK to execute a batch write that updates a 'users' document and creates an 'audit_logs' document atomically.",
  },
  test: `console.log('Tested Firebase');`,
});

buildSkill({
  name: 'redis',
  displayName: 'Redis',
  description: 'In-memory data structure store.',
  categories: ['Databases'],
  overview:
    'Redis is used as a database, cache, and message broker. This skill covers the `redis` (Node.js) and `redis-py` libraries.',
  installation: '```bash\nnpm install redis\npip install redis\n```',
  authentication:
    'Uses a connection URL `redis://user:password@host:port`. Redis 6+ supports ACLs (Access Control Lists) for fine-grained permissions.',
  coreConcepts:
    '- **Keys**: The string identifier for data.\n- **TTL (Time to Live)**: Expiration time for a key.\n- **Pub/Sub**: Publish/Subscribe messaging paradigm.',
  workflows:
    "1. `createClient({ url })`.\n2. `await client.connect()`.\n3. `await client.set('key', 'value', { EX: 3600 })`.",
  errorHandling:
    'Handle connection drops. The Node SDK v4+ automatically reconnects. Catch command errors if passing invalid types (e.g., trying to HGET a string).',
  security:
    'Never expose Redis directly to the public internet. Ensure `requirepass` is set or use managed services like ElastiCache with TLS.',
  rateLimits:
    'Redis is bound by CPU and Memory, not API limits. It handles 100,000+ operations per second easily.',
  bestPractices:
    'Always set a TTL (`EX` or `PX`) on cache keys to prevent memory exhaustion (OOM). Use pipelining (`client.multi()`) to batch commands and reduce RTT latency.',
  troubleshooting:
    'If memory fills up, verify your eviction policy (`maxmemory-policy`) is set to `allkeys-lru` or `volatile-lru` rather than `noeviction`.',
  links: { 'API Reference': 'https://redis.io/commands/' },
  examples: {
    typescript: `import { createClient } from 'redis';\nconst client = createClient({ url: process.env.REDIS_URL });\nawait client.connect();`,
    python: `import redis\nr = redis.Redis.from_url('redis://localhost:6379/0')`,
  },
  prompts: {
    'cache-aside':
      'Write a Node.js function implementing the cache-aside pattern using Redis v4 SDK. It should check Redis for a key, and if missing, fetch from a DB, save to Redis with a TTL of 1 hour, and return the data.',
  },
  test: `console.log('Tested Redis');`,
});
