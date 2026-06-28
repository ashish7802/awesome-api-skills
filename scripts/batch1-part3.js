const { buildSkill } = require('./build-skill');

buildSkill({
  name: "auth0",
  displayName: "Auth0",
  description: "Identity and Access Management platform.",
  categories: ["Authentication", "Security"],
  overview: "Auth0 provides Authentication as a Service. This skill focuses on the Management API for backend operations (users, roles, permissions).",
  installation: "```bash\nnpm install auth0\npip install auth0-python\n```",
  authentication: "Authenticate against the Management API using an OAuth2 Machine-to-Machine (M2M) token fetched from your tenant's `/oauth/token` endpoint.",
  coreConcepts: "- **Tenant**: Your isolated Auth0 instance.\n- **Connection**: A source of users (e.g., Database, Google OAuth).\n- **Rules/Actions**: Serverless functions triggered during authentication.",
  workflows: "1. Obtain a Management API Token (cache this).\n2. Initialize `ManagementClient`.\n3. Perform actions like `client.users.update({ id }, data)`.",
  errorHandling: "Catch API errors. Watch for HTTP 429 (Rate Limit Exceeded) and HTTP 400 (Validation Error, such as invalid password strength).",
  security: "Management API tokens have massive power. Ensure they are scoped strictly to the resources they need (e.g., `read:users` rather than `update:users` if only reading).",
  rateLimits: "Limits depend on your subscription tier. The Management API is strictly rate-limited; heavily cache user profiles in your own database.",
  bestPractices: "Do not call the Management API on every user login. Use Auth0 Actions to inject custom claims into the ID Token instead.",
  troubleshooting: "If M2M token generation fails, verify that your Machine-to-Machine application is authorized to access the Auth0 Management API resource server.",
  links: { "API Reference": "https://auth0.com/docs/api/management/v2" },
  examples: {
    typescript: `import { ManagementClient } from 'auth0';\nconst auth0 = new ManagementClient({ domain: 'd.auth0.com', clientId: 'ID', clientSecret: 'SECRET' });`,
    python: `from auth0.management import Auth0\nauth0 = Auth0('d.auth0.com', 'token')`
  },
  prompts: {
    "update-user": "Write a Node.js function using the Auth0 ManagementClient to update a user's `app_metadata` with a custom role."
  },
  test: `console.log('Tested Auth0');`
});

buildSkill({
  name: "okta",
  displayName: "Okta",
  description: "Enterprise Identity Provider and SSO.",
  categories: ["Authentication", "Enterprise"],
  overview: "The Okta API manages workforce and customer identities. This skill covers the `@okta/okta-sdk-nodejs` library for backend lifecycle management.",
  installation: "```bash\nnpm install @okta/okta-sdk-nodejs\npip install okta\n```",
  authentication: "Use an SSWS (Secure Socket Web Server) API Token provided in the `Authorization: SSWS <token>` header.",
  coreConcepts: "- **User**: An identity in the Universal Directory.\n- **Group**: Logical collection of users.\n- **Application**: An integration (SAML/OIDC) users can access.",
  workflows: "1. Instantiate `Client`.\n2. Fetch a user via `client.getUser(id)`.\n3. Modify profile attributes and call `user.update()`.",
  errorHandling: "Handle `OktaApiError`. Pay attention to the `errorCauses` array for specific field validation failures during user creation.",
  security: "SSWS Tokens are long-lived and bypass MFA. Store them in secure vaults (e.g., AWS Secrets Manager) and rotate them regularly.",
  rateLimits: "Limits are concurrent and per-endpoint. Core endpoints (like `/api/v1/users`) have high limits, while search endpoints have strict limits.",
  bestPractices: "Use pagination for querying users (`collection.each()`) to avoid loading millions of records into memory.",
  troubleshooting: "If a user is locked out, ensure you are calling the `/api/v1/users/{id}/lifecycle/unlock` endpoint correctly.",
  links: { "API Reference": "https://developer.okta.com/docs/reference/" },
  examples: {
    typescript: `import * as okta from '@okta/okta-sdk-nodejs';\nconst client = new okta.Client({ orgUrl: 'https://dev.okta.com', token: 'TOKEN' });`,
    python: `from okta.client import Client as OktaClient\nclient = OktaClient({"orgUrl": "url", "token": "token"})`
  },
  prompts: {
    "create-user": "Write a script that creates a new Okta user in the 'Staged' state and assigns them to a specific Group ID."
  },
  test: `console.log('Tested Okta');`
});

buildSkill({
  name: "mongodb-atlas",
  displayName: "MongoDB Atlas",
  description: "Fully managed MongoDB cloud database.",
  categories: ["Databases", "Cloud"],
  overview: "The Atlas Administration API allows you to programmatically manage clusters, database users, and network peering.",
  installation: "```bash\n# Standard fetch/axios is used for REST API\n```",
  authentication: "Atlas uses HTTP Digest Authentication. You must generate Programmatic API Keys (Public and Private keys).",
  coreConcepts: "- **Project**: A logical grouping of clusters.\n- **Cluster**: A MongoDB deployment.\n- **IP Access List**: Network security firewall rules.",
  workflows: "1. Generate API Keys in the Atlas UI.\n2. Perform an HTTP Digest Auth request.\n3. Provision or scale a cluster.",
  errorHandling: "Handle HTTP 401 for Auth failures. For HTTP 400s, parse the `detail` property in the JSON response to understand the specific validation error.",
  security: "Restrict Programmatic API keys to specific IP addresses. Assign the 'Project Read Only' role unless mutation is explicitly required.",
  rateLimits: "Atlas API is limited to 100 requests per minute per project.",
  bestPractices: "Automate IP Access List management if your deployment environment (like GitHub Actions) uses dynamic IP ranges.",
  troubleshooting: "If requests fail with 401 Unauthorized, ensure your HTTP client properly implements the Digest Auth handshake (which requires two round trips).",
  links: { "API Reference": "https://www.mongodb.com/docs/atlas/reference/api-resources/" },
  examples: {
    typescript: `// Utilize an HTTP client that supports Digest Auth, such as 'urllib' or 'axios' with interceptors.\nconst { request } = require('urllib');`,
    python: `from requests.auth import HTTPDigestAuth\nimport requests\nres = requests.get(url, auth=HTTPDigestAuth('public', 'private'))`
  },
  prompts: {
    "add-ip": "Write a Python script that adds a given IP address to the MongoDB Atlas Project IP Access List using the Administration API."
  },
  test: `console.log('Tested MongoDB Atlas');`
});

buildSkill({
  name: "aws-s3",
  displayName: "AWS S3",
  description: "Object storage service.",
  categories: ["Cloud", "Storage"],
  overview: "Amazon Simple Storage Service (S3) provides highly scalable object storage. This skill details the AWS SDK v3 for Node.js.",
  installation: "```bash\nnpm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner\npip install boto3\n```",
  authentication: "Authenticate via IAM Roles (in EC2/Lambda) or Access Keys (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`). Avoid hardcoded credentials.",
  coreConcepts: "- **Bucket**: The root container for objects.\n- **Object**: A file and its metadata.\n- **Presigned URL**: A temporary URL granting access to upload/download a specific object.",
  workflows: "1. Instantiate `S3Client`.\n2. Construct a `PutObjectCommand`.\n3. Send the command to upload a stream or buffer.",
  errorHandling: "Catch `S3ServiceException`. Common errors include `NoSuchBucket` and `AccessDenied`. Ensure bucket policies and IAM permissions align.",
  security: "Block Public Access at the account level. Always use Presigned URLs for client-side uploads rather than routing large files through your API server.",
  rateLimits: "S3 automatically scales, but standard performance supports 3,500 PUT/COPY/POST/DELETE and 5,500 GET/HEAD requests per second per prefix.",
  bestPractices: "Use Multipart Upload for files larger than 100MB. Use random prefixes (like UUIDs) in object keys to avoid thermal hotspots in S3 partitions.",
  troubleshooting: "If a presigned URL fails with SignatureDoesNotMatch, ensure the HTTP method and headers exactly match what was requested during generation.",
  links: { "API Reference": "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/" },
  examples: {
    typescript: `import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';\nconst client = new S3Client({ region: 'us-east-1' });`,
    python: `import boto3\ns3 = boto3.client('s3')`
  },
  prompts: {
    "presigned-url": "Write a Node.js function using AWS SDK v3 that generates a presigned URL allowing a client to upload a PNG file directly to S3."
  },
  test: `console.log('Tested AWS S3');`
});

buildSkill({
  name: "aws-dynamodb",
  displayName: "AWS DynamoDB",
  description: "NoSQL key-value and document database.",
  categories: ["Databases", "Cloud"],
  overview: "Amazon DynamoDB is a fully managed NoSQL database. This skill covers the AWS SDK v3 with a strong emphasis on the DocumentClient.",
  installation: "```bash\nnpm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb\npip install boto3\n```",
  authentication: "Uses standard AWS IAM authentication.",
  coreConcepts: "- **Partition Key (PK)**: Determines data distribution.\n- **Sort Key (SK)**: Enables range queries and sorting.\n- **GSI**: Global Secondary Index for alternative access patterns.",
  workflows: "1. Instantiate `DynamoDBClient`.\n2. Wrap it with `DynamoDBDocumentClient.from(client)`.\n3. Execute a `QueryCommand` or `PutCommand`.",
  errorHandling: "Handle `ProvisionedThroughputExceededException` via exponential backoff (SDK v3 does this automatically up to a limit). Handle `ConditionalCheckFailedException` for optimistic locking.",
  security: "Use IAM conditions to restrict access to specific Partition Keys (e.g., tenant isolation) if acting on behalf of users.",
  rateLimits: "Limits are based on Provisioned Capacity (WCUs/RCUs) or On-Demand mode throughput.",
  bestPractices: "Use Single Table Design to minimize network trips. Avoid `Scan` operations at all costs; always `Query` using well-defined indexes.",
  troubleshooting: "If a `Query` returns unexpected results, ensure you are specifying the `IndexName` if querying a GSI, and that the GSI has finished populating.",
  links: { "API Reference": "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/" },
  examples: {
    typescript: `import { DynamoDBClient } from '@aws-sdk/client-dynamodb';\nimport { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';`,
    python: `import boto3\ndynamodb = boto3.resource('dynamodb')`
  },
  prompts: {
    "query-gsi": "Write a Node.js function using AWS SDK v3 lib-dynamodb to query a Global Secondary Index named 'EmailIndex' for a specific email address."
  },
  test: `console.log('Tested AWS DynamoDB');`
});
