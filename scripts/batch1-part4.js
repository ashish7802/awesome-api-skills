const { buildSkill } = require('./build-skill');

buildSkill({
  name: "datadog",
  displayName: "Datadog",
  description: "Observability and security platform.",
  categories: ["Monitoring", "DevOps"],
  overview: "The Datadog API allows you to submit metrics, events, and manage dashboards programmatically. This skill focuses on the `@datadog/datadog-api-client` library.",
  installation: "```bash\nnpm install @datadog/datadog-api-client\npip install datadog-api-client\n```",
  authentication: "Requires two headers: `DD-API-KEY` (for submitting data) and `DD-APPLICATION-KEY` (for reading data or managing configuration).",
  coreConcepts: "- **Metric**: Time-series data points.\n- **Tags**: Key:Value pairs attached to metrics (crucial for filtering).\n- **Monitor**: An alert configured to trigger on thresholds.",
  workflows: "1. Instantiate the API client.\n2. Construct a `Series` object with points and tags.\n3. Call `metricsApi.submitMetrics`.",
  errorHandling: "Catch HTTP 403 (Invalid Keys) and HTTP 429. If submitting metrics fails, log the `response.body.errors` array.",
  security: "API keys have agent-level permissions. Application keys should be scoped strictly (e.g., `dashboards_read`).",
  rateLimits: "Submit Metrics endpoint allows 100 requests per 10 seconds. Use batching heavily.",
  bestPractices: "Batch metrics before sending. Never submit a single data point per API call in high-throughput environments.",
  troubleshooting: "If metrics don't appear, ensure the UNIX timestamp attached to your points is in seconds, not milliseconds.",
  links: { "API Reference": "https://docs.datadoghq.com/api/" },
  examples: {
    typescript: `import { client, v2 } from '@datadog/datadog-api-client';\nconst configuration = client.createConfiguration();`,
    python: `from datadog_api_client import ApiClient, Configuration\nconfiguration = Configuration()`
  },
  prompts: {
    "submit-metric": "Write a Node.js function using the Datadog API Client v2 to submit a custom metric named 'app.user.login' with tags 'env:prod' and 'region:us-east'."
  },
  test: `console.log('Tested Datadog');`
});

buildSkill({
  name: "sentry",
  displayName: "Sentry",
  description: "Application performance monitoring and error tracking.",
  categories: ["Monitoring"],
  overview: "Sentry tracks exceptions, traces, and crashes. This skill covers the `@sentry/node` integration for backend error capturing and the Sentry REST API for release management.",
  installation: "```bash\nnpm install @sentry/node @sentry/profiling-node\npip install sentry-sdk\n```",
  authentication: "Client SDKs use a DSN (Data Source Name). The REST API uses a Bearer token generated from the Sentry Auth token settings.",
  coreConcepts: "- **DSN**: The ingestion endpoint URL.\n- **Release**: A version of your code attached to events for regression tracking.\n- **Transaction**: A logical grouping of spans for performance tracing.",
  workflows: "1. Call `Sentry.init({ dsn })` early in the application lifecycle.\n2. Wrap controllers or use framework middleware.\n3. Call `Sentry.captureException(error)` for handled exceptions.",
  errorHandling: "The Sentry SDK fails silently on network errors so it does not crash your application.",
  security: "Use the `beforeSend` hook to scrub PII (Passwords, SSNs, Auth Tokens) before the payload leaves your server.",
  rateLimits: "Event ingestion is limited by your organization's quota. Exceeding it results in dropped events (HTTP 429).",
  bestPractices: "Always set the `release` and `environment` tags during `Sentry.init` to enable accurate issue tracking across deployments.",
  troubleshooting: "If source maps aren't working, ensure the `@sentry/cli` or Webpack plugin uploaded the artifacts for the exact `release` string matching your deployed code.",
  links: { "API Reference": "https://docs.sentry.io/api/" },
  examples: {
    typescript: `import * as Sentry from '@sentry/node';\nSentry.init({ dsn: 'https://xxx@sentry.io/123', environment: 'production' });`,
    python: `import sentry_sdk\nsentry_sdk.init(dsn="https://xxx@sentry.io/123", environment="production")`
  },
  prompts: {
    "capture-exception": "Show how to catch a database error in an Express route, attach the user's ID to the Sentry scope, and manually capture the exception."
  },
  test: `console.log('Tested Sentry');`
});

buildSkill({
  name: "plaid",
  displayName: "Plaid",
  description: "Financial technology platform to connect bank accounts.",
  categories: ["Payments", "Finance"],
  overview: "Plaid connects users' bank accounts to apps. This skill focuses on Plaid Link flow and the `plaid-node` SDK to extract transaction data.",
  installation: "```bash\nnpm install plaid\npip install plaid-python\n```",
  authentication: "Requires three keys: `client_id`, `secret`, and `environment` (sandbox, development, production). Secrets must never reach the client.",
  coreConcepts: "- **Link Token**: A short-lived token to initialize the client-side Plaid Link UI.\n- **Public Token**: Returned by Plaid Link, exchanged for an Access Token.\n- **Access Token**: The permanent token representing a connected bank item.",
  workflows: "1. Create Link Token (Server).\n2. User completes Plaid Link (Client).\n3. Exchange Public Token for Access Token (Server).\n4. Fetch Transactions (Server).",
  errorHandling: "Handle `PlaidError`. Pay close attention to `ITEM_LOGIN_REQUIRED`; it means the bank forces the user to re-authenticate via Plaid Link (Update mode).",
  security: "Store Access Tokens securely (encrypted at rest). Treat them with the same sensitivity as a user password.",
  rateLimits: "Transactions endpoints are heavily rate-limited to prevent abuse on banking infrastructure. Fetch data asynchronously using Plaid Webhooks instead of polling.",
  bestPractices: "Rely exclusively on Webhooks (e.g., `SYNC_UPDATES_AVAILABLE`) to know when to call the Transactions Sync API.",
  troubleshooting: "If transactions are missing, ensure you are using the `/transactions/sync` endpoint (Cursor-based) rather than the legacy `/transactions/get` endpoint.",
  links: { "API Reference": "https://plaid.com/docs/api/" },
  examples: {
    typescript: `import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';\nconst client = new PlaidApi(new Configuration({ basePath: PlaidEnvironments.sandbox, baseOptions: { headers: { 'PLAID-CLIENT-ID': 'id', 'PLAID-SECRET': 'secret' } } }));`,
    python: `import plaid\nfrom plaid.api import plaid_api`
  },
  prompts: {
    "exchange-token": "Write a Node.js route that accepts a Plaid public token, exchanges it for an access token using the Plaid API, and stores it in a mock database."
  },
  test: `console.log('Tested Plaid');`
});

buildSkill({
  name: "shopify",
  displayName: "Shopify Admin API",
  description: "E-commerce platform API.",
  categories: ["Commerce"],
  overview: "The Shopify Admin API allows you to manage products, orders, and customers. This skill focuses on the GraphQL API using the `@shopify/shopify-api` package.",
  installation: "```bash\nnpm install @shopify/shopify-api\n```",
  authentication: "Custom apps use an Admin API Access Token (`X-Shopify-Access-Token` header). Public apps use OAuth 2.0.",
  coreConcepts: "- **Global ID (GID)**: GraphQL identifier (e.g., `gid://shopify/Product/123`).\n- **Bulk Operations**: Used to extract massive datasets efficiently.\n- **Webhooks**: Subscriptions to store events.",
  workflows: "1. Initialize Shopify client with credentials.\n2. Construct a GraphQL query.\n3. Call `client.graphql(query, variables)`.",
  errorHandling: "Handle `userErrors` inside the GraphQL payload. Unlike REST, GraphQL often returns HTTP 200 even if the mutation fails; check the payload fields.",
  security: "Validate all incoming Shopify Webhooks using the HMAC signature (`X-Shopify-Hmac-Sha256`).",
  rateLimits: "GraphQL uses a Calculated Query Cost limit (50 points/sec). Complex queries cost more.",
  bestPractices: "Use GraphQL instead of REST. REST is slower and prone to over-fetching. Use Bulk Operations for exports larger than 250 items.",
  troubleshooting: "If you receive 'Access denied' on a valid query, verify your Admin API Token was generated with the correct Access Scopes (e.g., `write_products`).",
  links: { "API Reference": "https://shopify.dev/docs/api/admin-graphql" },
  examples: {
    typescript: `import '@shopify/shopify-api/adapters/node';\nimport { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';\nconst shopify = shopifyApi({ apiVersion: LATEST_API_VERSION, isCustomStoreApp: true, adminApiAccessToken: 'token' });`,
    php: `$client = new Shopify\\Clients\\Graphql('store.myshopify.com', 'token');`
  },
  prompts: {
    "create-product": "Write a Shopify Admin API GraphQL mutation to create a new product with two variants, utilizing the @shopify/shopify-api Node library."
  },
  test: `console.log('Tested Shopify');`
});

buildSkill({
  name: "algolia",
  displayName: "Algolia",
  description: "Hosted Search API.",
  categories: ["Search"],
  overview: "Algolia provides ultra-fast full-text search. This skill focuses on indexing data from the backend and searching from the frontend.",
  installation: "```bash\nnpm install algoliasearch\npip install algoliasearch\n```",
  authentication: "Frontend clients use the Search-Only API Key. Backends use the Admin API Key for indexing. Never expose the Admin key.",
  coreConcepts: "- **Index**: A collection of searchable JSON records.\n- **ObjectID**: The unique identifier for a record.\n- **Facets**: Attributes used for filtering and categorization.",
  workflows: "1. Backend: Initialize client with Admin Key.\n2. Push records to index via `saveObjects`.\n3. Frontend: Initialize client with Search Key and query.",
  errorHandling: "Handle `ApiError`. Common errors are Payload Too Large (chunk your `saveObjects` calls) and Invalid Credentials.",
  security: "Use Secured API Keys to restrict frontend search access (e.g., scoping a user's search token to only return their own data).",
  rateLimits: "Limits are massive, but batch indexing should be limited to chunks of 1,000 to 10,000 records to prevent timeout.",
  bestPractices: "Do not store massive text blocks (like full articles) in a single record attribute. Truncate or chunk records to keep them under the 10KB to 100KB limits.",
  troubleshooting: "If search results are inaccurate, check the index's 'Searchable Attributes' configuration in the Algolia Dashboard.",
  links: { "API Reference": "https://www.algolia.com/doc/api-reference/" },
  examples: {
    typescript: `import algoliasearch from 'algoliasearch';\nconst client = algoliasearch('APP_ID', 'ADMIN_KEY');\nconst index = client.initIndex('contacts');`,
    python: `from algoliasearch.search_client import SearchClient\nclient = SearchClient.create('APP_ID', 'ADMIN_KEY')`
  },
  prompts: {
    "sync-db": "Write a Node.js script that fetches records from a Postgres database and pushes them to an Algolia index in batches of 1000 using `saveObjects`."
  },
  test: `console.log('Tested Algolia');`
});
