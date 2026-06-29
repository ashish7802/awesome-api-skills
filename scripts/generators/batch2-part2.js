const { buildSkillV2 } = require('./build-skill-v2');

buildSkillV2({
  name: 'planetscale',
  displayName: 'PlanetScale',
  description: 'Serverless MySQL database built on Vitess.',
  categories: ['Databases', 'Cloud'],
  quickStart:
    'PlanetScale provides branching workflows for MySQL. Install the `@planetscale/database` serverless driver to interact with it seamlessly over HTTP in Edge environments.\n\n```bash\nnpm install @planetscale/database\n```',
  commonWorkflows:
    '### Non-Blocking Schema Changes\nPlanetScale prohibits direct schema modifications in production. You must branch your database, apply the DDL (e.g., via Prisma `db push`), test your application, and then create a Deploy Request in PlanetScale to merge the schema change without locking tables.',
  productionPatterns:
    '### Edge Database Access\nTraditional MySQL TCP connections (`mysql2`) are difficult in Vercel Edge/Cloudflare Workers due to connection pooling limits. Always utilize the `@planetscale/database` fetch-based driver to eliminate connection overhead and utilize connectionless HTTP execution.',
  errorRecovery:
    "Handle standard MySQL errors wrapped by the serverless driver. The driver natively supports fetch retries. However, schema mismatch errors (e.g., querying a column that hasn't merged to `main` yet) require application-level feature flagging during the deploy window.",
  securityNotes:
    'PlanetScale passwords represent highly privileged access. Scope your database passwords explicitly (e.g., read-only for analytics branches).',
  performanceConsiderations:
    'PlanetScale caches connections at the proxy layer, meaning HTTP fetch calls are remarkably fast. However, extremely large payloads over HTTP will incur JSON parsing overhead compared to binary TCP streams. Keep query results paginated.',
  testingGuidance:
    'Integrate the PlanetScale CLI (`pscale`) into your CI/CD. Create a new branch dynamically for every pull request, run your E2E test suite against the branch, and delete it upon success.',
  troubleshooting:
    "If you receive 'Foreign key constraints are not supported', note that PlanetScale relies on application-level relations (e.g., via Prisma's `relationMode = \"prisma\"`) rather than database-level FKs to ensure horizontal scalability across Vitess shards.",
  relatedSkills: ['Vercel', 'Cloudflare', 'Clerk'],
  links: { 'PlanetScale Serverless JS': 'https://github.com/planetscale/database-js' },
  examples: {
    typescript: {
      basic: `import { connect } from '@planetscale/database';\nconst config = { url: process.env.DATABASE_URL };\nconst conn = connect(config);\nconst results = await conn.execute('SELECT * FROM users');`,
      transaction: `await conn.transaction(async (tx) => {\n  await tx.execute('INSERT INTO logs (msg) VALUES (?)', ['start']);\n});`,
    },
    python: {
      basic: `import mysql.connector\n# Note: Python typically uses TCP connections to PlanetScale\ncnx = mysql.connector.connect(user='user', password='pw', host='host', database='db')`,
    },
    go: { basic: `db, err := sql.Open("mysql", "user:pass@tcp(host)/db?tls=true")` },
  },
  prompts: {
    'pscale-edge':
      'Write a Vercel Edge function in TypeScript that connects to PlanetScale using the serverless driver, fetches a user by ID from the request params, and returns it as JSON.',
  },
});

buildSkillV2({
  name: 'turso',
  displayName: 'Turso',
  description: 'Edge SQLite database based on libSQL.',
  categories: ['Databases', 'Cloud'],
  quickStart:
    'Turso provides a distributed SQLite experience. You can query it over HTTP or sync the entire database to a local SQLite file for ultra-low latency reads.\n\n```bash\nnpm install @libsql/client\n```',
  commonWorkflows:
    '### Embedded Replicas\nInstead of querying a remote database for every read, Turso allows you to sync an embedded replica to the file system. Writes are automatically routed to the primary node, while reads are serviced locally at sub-millisecond speeds.',
  productionPatterns:
    '### Microservice Data Isolation\nBecause Turso allows creating thousands of databases instantaneously, consider a multi-tenant architecture where every customer or microservice gets its own dedicated SQLite database rather than logically partitioning a monolithic database.',
  errorRecovery:
    'Handle `LibsqlError`. If your embedded replica sync fails, catch the error and fallback to querying the remote primary node directly.',
  securityNotes:
    'Generate organization-scoped API tokens for CI/CD deployments and database-scoped tokens for the application servers. Never leak full access tokens to the frontend.',
  performanceConsiderations:
    'Embedded replicas require local disk access. In purely ephemeral serverless environments (like AWS Lambda), embedded replicas may be wiped between cold starts, negating their benefit. Use them primarily in persistent edge nodes or VPS deployments.',
  testingGuidance:
    'Because Turso is compatible with SQLite, you can point your test suite to an entirely local in-memory SQLite database (`file::memory:`) to run tests at light speed without hitting network endpoints.',
  troubleshooting:
    "If transactions fail with 'database is locked', ensure you are closing your transactions properly and not holding long-lived write locks, which bottleneck SQLite's single-writer architecture.",
  relatedSkills: ['Fly.io', 'Render'],
  links: { 'Turso Documentation': 'https://docs.turso.tech' },
  examples: {
    typescript: {
      remote: `import { createClient } from '@libsql/client';\nconst client = createClient({ url: process.env.TURSO_URL, authToken: process.env.TURSO_TOKEN });\nawait client.execute('SELECT * FROM users');`,
      embedded: `const client = createClient({ url: 'file:local.db', syncUrl: 'libsql://...', authToken: '...' });\nawait client.sync();`,
    },
    python: {
      basic: `import libsql_experimental as libsql\nconn = libsql.connect("libsql://...", auth_token="...")`,
    },
    go: { basic: `db, err := sql.Open("libsql", "libsql://...?authToken=...")` },
    rust: { basic: `let db = Database::open_remote("libsql://...", "token")` },
  },
  prompts: {
    'sync-replica':
      "Write a Node.js script using `@libsql/client` that initializes an embedded replica, forces a sync with the remote Turso database, and queries a 'products' table.",
  },
});

buildSkillV2({
  name: 'convex',
  displayName: 'Convex',
  description: 'Backend-as-a-Service with deterministic React sync.',
  categories: ['Databases', 'Cloud'],
  quickStart:
    'Convex manages your database, server functions, and client state. You write server functions in TypeScript, and Convex automatically syncs the results to your React frontend via WebSockets.\n\n```bash\nnpm install convex\n```',
  commonWorkflows:
    '### Realtime Queries\nWrite a `query` function in your `convex/` folder. In your React component, use `useQuery(api.messages.list)`. Convex handles the WebSocket subscription; if the database changes, the React component automatically re-renders.',
  productionPatterns:
    '### Mutations and Actions\nUse `mutation` functions for deterministic database writes. Use `action` functions (which can call third-party APIs like OpenAI or Stripe) for non-deterministic side effects. Actions can subsequently call mutations to update the database.',
  errorRecovery:
    'Convex automatically retries deterministic queries and mutations if they fail due to transient database locks. Actions are NOT retried automatically; handle HTTP failures explicitly within your action code.',
  securityNotes:
    'Enforce authorization directly within your Convex query and mutation functions by verifying the `ctx.auth` object before reading or writing data.',
  performanceConsiderations:
    'Because queries are strictly deterministic, Convex caches their results transparently. Avoid fetching massive data sets; utilize pagination patterns or explicit `limit` clauses.',
  testingGuidance:
    'Use the `convex-test` library to write unit tests for your backend functions, passing in mock authentication states to verify your row-level security logic.',
  troubleshooting:
    'If a mutation throws a non-deterministic error (e.g., `Math.random()` or `fetch()`), Convex will reject it. Move side-effects into `action` functions.',
  relatedSkills: ['Clerk', 'Vercel'],
  links: { 'Convex Docs': 'https://docs.convex.dev/home' },
  examples: {
    typescript: {
      query: `import { query } from './_generated/server';\nexport const get = query({ handler: async (ctx) => { return await ctx.db.query('tasks').collect(); } });`,
      mutation: `import { mutation } from './_generated/server';\nexport const add = mutation({ handler: async (ctx, args) => { await ctx.db.insert('tasks', { text: args.text }); } });`,
    },
    python: {
      basic: `from convex import ConvexClient\nclient = ConvexClient('https://...')\nclient.query('tasks:get')`,
    },
    go: { basic: `// Use the Convex REST API for environments without official SDK support.` },
  },
  prompts: {
    'action-mutation':
      'Write a Convex `action` in TypeScript that calls a fictional weather API, and then calls a Convex `mutation` to store the weather result in the database.',
  },
});

buildSkillV2({
  name: 'railway',
  displayName: 'Railway',
  description: 'Infrastructure platform to provision infrastructure, develop locally, and deploy.',
  categories: ['Cloud', 'DevOps'],
  quickStart:
    'Railway allows you to deploy code simply by pushing to GitHub or using the CLI. The Railway Public API (GraphQL) allows programmatic management of projects, environments, and deployments.\n\n```bash\nnpm install -g @railway/cli\n```',
  commonWorkflows:
    '### Environment Synchronization\nUse the Railway CLI (`railway run`) to pull production or staging environment variables down to your local machine instantly, eliminating the need to manage `.env` files manually.',
  productionPatterns:
    '### Programmatic Deployments\nUse the Railway GraphQL API to dynamically spin up new environments for Pull Requests, deploy specific images, and tear them down once the PR is merged.',
  errorRecovery:
    'GraphQL errors are returned in the `errors` array of the response. Implement exponential backoff if you encounter rate limits when rapidly provisioning multiple services.',
  securityNotes:
    'Generate Project Tokens for API access rather than Personal Tokens when automating CI/CD pipelines to restrict the blast radius to a single project.',
  performanceConsiderations:
    'Railway automatically manages Nixpacks builds. If your build is slow, provide a custom `nixpacks.toml` or `Dockerfile` to aggressively cache dependencies.',
  testingGuidance:
    'You can test deployment configurations entirely locally using `railway up --detach` linked to a sandbox project before applying changes to production.',
  troubleshooting:
    'If a deployment fails the health check, ensure your application is binding to the correct port (Railway injects the `PORT` environment variable) and `0.0.0.0` rather than `localhost`.',
  relatedSkills: ['Render', 'Fly.io', 'GitHub'],
  links: { 'Railway API': 'https://docs.railway.app/reference/public-api' },
  examples: {
    typescript: {
      graphql: `const res = await fetch('https://backboard.railway.app/graphql/v2', { method: 'POST', headers: { Authorization: \`Bearer \${TOKEN}\` }, body: JSON.stringify({ query: 'query { projects { edges { node { name } } } }' }) });`,
      cli: `// Inside a terminal\nrailway run npm run dev`,
    },
    python: {
      basic: `import requests\nres = requests.post('https://backboard.railway.app/graphql/v2', headers={"Authorization": f"Bearer {token}"}, json={"query": "..."})`,
    },
    go: { basic: `// Utilize standard net/http for GraphQL POST requests` },
  },
  prompts: {
    'graphql-query':
      'Write a Node.js script that uses the Railway GraphQL API to fetch the list of all environments for a specific Project ID and logs their names.',
  },
});

buildSkillV2({
  name: 'render',
  displayName: 'Render',
  description: 'Unified cloud to build and run all your apps and websites.',
  categories: ['Cloud', 'DevOps'],
  quickStart:
    'Render offers Web Services, Static Sites, and managed PostgreSQL/Redis. The Render REST API allows you to automate infrastructure scaling, deploys, and service creation.\n\n```bash\n# Standard fetch/axios is used for REST API\n```',
  commonWorkflows:
    '### Blue/Green Deployments\nWhile Render handles zero-downtime deploys natively, you can use the REST API to explicitly create a staging Web Service, wait for it to report `live`, and then update custom routing rules or swap DNS.',
  productionPatterns:
    '### Auto-Scaling\nWhile Render supports native auto-scaling, you can implement custom metric-driven scaling by monitoring Datadog metrics and calling the Render API `PATCH /services/{serviceId}` to dynamically adjust instances.',
  errorRecovery:
    'Handle HTTP 422 for configuration validation errors and HTTP 429 for rate limits. Monitor the `deployId` status endpoint and rollback manually if the status transitions to `build_failed`.',
  securityNotes:
    'Render API tokens are highly privileged. Use Infrastructure as Code (like Terraform with the Render provider) to manage production configurations safely rather than raw API calls where possible.',
  performanceConsiderations:
    'API responses containing lists of services or deploys are paginated. Always respect the `cursor` in the query parameters to fetch complete datasets.',
  testingGuidance:
    'Use the Preview Environments feature integrated with GitHub rather than manually creating transient services via the API for testing.',
  troubleshooting:
    "If a Web Service deploys but is unreachable, verify the 'Start Command' is correct and that the app binds to `0.0.0.0`.",
  relatedSkills: ['Railway', 'Fly.io'],
  links: { 'Render API': 'https://docs.render.com/api' },
  examples: {
    typescript: {
      deploy: `const res = await fetch('https://api.render.com/v1/services/{serviceId}/deploys', { method: 'POST', headers: { Authorization: \`Bearer \${TOKEN}\` } });`,
      scale: `const res = await fetch('https://api.render.com/v1/services/{serviceId}/scale', { method: 'POST', headers: { Authorization: \`Bearer \${TOKEN}\`, 'Content-Type': 'application/json' }, body: JSON.stringify({ instances: 3 }) });`,
    },
    python: {
      basic: `import requests\nres = requests.post("https://api.render.com/v1/services/srv-123/deploys", headers={"Authorization": f"Bearer {token}"})`,
    },
    go: { basic: `// Utilize standard net/http for Render API requests.` },
  },
  prompts: {
    'scale-service':
      'Write a Python script that uses the Render API to fetch the current number of instances for a Web Service and scales it up by 1.',
  },
});
