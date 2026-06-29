const { buildSkillV2 } = require('./build-skill-v2');

buildSkillV2({
  name: 'fly',
  displayName: 'Fly.io',
  description: 'Deploy app servers close to your users.',
  categories: ['Cloud', 'DevOps'],
  quickStart:
    'Fly.io transforms Docker containers into microVMs running globally. The Machines API allows you to programmatically spawn, pause, and destroy VMs in milliseconds.\n\n```bash\n# Fly Machines API operates over standard HTTP REST\n```',
  commonWorkflows:
    '### Fast Machine Provisioning\nInstead of scaling via traditional auto-scalers, use the Fly Machines API to launch a new microVM the moment a user requests a heavy workload (e.g., video rendering) and immediately destroy it once the workload completes.',
  productionPatterns:
    '### Global Anycast\nFly automatically routes HTTP traffic to the nearest microVM via Anycast. Ensure your database (e.g., Turso or a Fly Postgres read-replica) is also positioned in the same region to avoid cross-country latency penalties.',
  errorRecovery:
    'Handle HTTP 503 errors if attempting to start a Machine in a region experiencing hardware capacity constraints. Always implement a fallback region (e.g., `sjc` falling back to `lax`).',
  securityNotes:
    'Machines can communicate with each other over an encrypted private IPv6 network (6PN). Do not expose internal microservices to the public internet; restrict their `services` block in the `fly.toml`.',
  performanceConsiderations:
    'Machines boot incredibly fast (often <300ms), but your application runtime (e.g., a heavy JVM or massive Node.js payload) will dictate the actual cold start time. Optimize your Docker images aggressively.',
  testingGuidance:
    'You can interact with the Fly Machines API locally by utilizing `fly proxy`, which forwards traffic to your private Fly network without exposing it to the public internet.',
  troubleshooting:
    'If a Machine exits immediately after booting, check the logs (`fly logs -m <machine_id>`); this is almost always caused by an application crash (e.g., missing environment variables) rather than a Fly infrastructure issue.',
  relatedSkills: ['Turso', 'Render'],
  links: { 'Machines API Docs': 'https://fly.io/docs/machines/api/' },
  examples: {
    typescript: {
      launch: `const res = await fetch('https://api.machines.dev/v1/apps/{app}/machines', { method: 'POST', headers: { Authorization: \`Bearer \${TOKEN}\` }, body: JSON.stringify({ config: { image: 'nginx', guest: { cpus: 1, memory_mb: 256 } }, region: 'ord' }) });`,
      delete: `const res = await fetch('https://api.machines.dev/v1/apps/{app}/machines/{machineId}', { method: 'DELETE', headers: { Authorization: \`Bearer \${TOKEN}\` } });`,
    },
    python: {
      basic: `import requests\nres = requests.post("https://api.machines.dev/v1/apps/app/machines", headers={"Authorization": f"Bearer {token}"})`,
    },
    go: { basic: `// Utilize standard net/http for Machines API requests.` },
  },
  prompts: {
    'spawn-machine':
      "Write a Node.js function that uses the Fly.io Machines API to spawn a new Machine in the 'ams' region using a specific Docker image, and waits for it to reach the 'started' state.",
  },
});

buildSkillV2({
  name: 'digitalocean',
  displayName: 'DigitalOcean',
  description: 'Cloud computing designed for developers.',
  categories: ['Cloud'],
  quickStart:
    'DigitalOcean provides Droplets (VPS), Managed Databases, and App Platform. The official API allows full programmatic control over your cloud infrastructure.\n\n```bash\nnpm install doctl\n```',
  commonWorkflows:
    '### Programmatic Backups and Snapshots\nAutomate Droplet snapshots before performing major system upgrades. Call the Actions API to trigger a snapshot, poll the Action ID for completion, and proceed with the upgrade.',
  productionPatterns:
    '### Floating IPs\nFor high availability, associate a Floating IP with your primary Droplet. If the primary goes down, use the API to immediately reassign the Floating IP to your standby Droplet without waiting for DNS propagation.',
  errorRecovery:
    "Handle HTTP 404s when polling Action endpoints to ensure the Action hasn't been purged. For HTTP 429 (Rate Limit), inspect the `RateLimit-Reset` header to calculate the exact wait time before retrying.",
  securityNotes:
    'Restrict API tokens by generating them with explicitly narrowed scopes (e.g., read-only). Use VPCs to isolate backend database Droplets from public internet exposure.',
  performanceConsiderations:
    'Creating Droplets takes ~60 seconds. Do not block web threads waiting for Droplet creation; handle infrastructure provisioning asynchronously via background workers (e.g., Redis queues).',
  testingGuidance:
    'Do not run E2E tests against live production Droplets. Use the API to spawn a temporary Droplet, run tests, and immediately destroy it to save costs.',
  troubleshooting:
    'If SSH fails after creating a Droplet via API, ensure you passed the correct `ssh_keys` array (using SSH Key IDs) in the creation payload.',
  relatedSkills: ['AWS S3', 'Render'],
  links: { 'DigitalOcean API': 'https://docs.digitalocean.com/reference/api/' },
  examples: {
    typescript: {
      'create-droplet': `const res = await fetch('https://api.digitalocean.com/v2/droplets', { method: 'POST', headers: { Authorization: \`Bearer \${TOKEN}\`, 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'web-1', region: 'nyc3', size: 's-1vcpu-1gb', image: 'ubuntu-22-04-x64' }) });`,
      'error-handling': `if (res.status === 429) { const reset = res.headers.get('RateLimit-Reset'); console.warn('Rate limited until', reset); }`,
    },
    python: {
      basic: `import requests\nres = requests.post("https://api.digitalocean.com/v2/droplets", headers={"Authorization": f"Bearer {token}"})`,
    },
    go: { basic: `// Utilize the digitalocean/godo SDK for Go.` },
  },
  prompts: {
    'assign-floating-ip':
      'Write a Python script that uses the DigitalOcean API to reassign a specific Floating IP address to a new Droplet ID.',
  },
});

buildSkillV2({
  name: 'azure-openai',
  displayName: 'Azure OpenAI',
  description: 'Enterprise-grade OpenAI models hosted on Azure.',
  categories: ['AI', 'Enterprise'],
  quickStart:
    'Azure OpenAI provides the same models as OpenAI (GPT-4) but within the Azure compliance boundary, utilizing Active Directory and custom domain endpoints.\n\n```bash\nnpm install openai\n```',
  commonWorkflows:
    '### Enterprise Model Deployment\nUnlike the public OpenAI API, Azure requires you to explicitly deploy a model in your resource. You must use your unique Deployment ID rather than the generic model name (e.g., `gpt-4`) in your API calls.',
  productionPatterns:
    '### Content Filtering\nAzure OpenAI applies aggressive, customizable content filters. You can detect if a response was filtered by inspecting the `finish_reason` which will evaluate to `content_filter` instead of `stop`.',
  errorRecovery:
    'Handle `429 Too Many Requests`. Azure OpenAI rate limits are based on Tokens-Per-Minute (TPM) assigned to your deployment. If you exceed this, you must retry. Use the `@azure/core-rest-pipeline` to inject automated retry policies.',
  securityNotes:
    'Avoid static API keys. Use Managed Identities (Entra ID / Azure AD) to authenticate your application servers to the Azure OpenAI endpoint securely without rotating secrets.',
  performanceConsiderations:
    'Latency is heavily dependent on the Azure region. Deploy your models in the same region as your application servers to minimize network RTT (Round Trip Time).',
  testingGuidance:
    'Use the official OpenAI SDK, but configure the `baseURL` and `defaultHeaders` to point to your Azure endpoint (`https://<resource>.openai.azure.com/openai/deployments/<deployment>`).',
  troubleshooting:
    "If you receive a 'Resource not found' error, verify that the `api-version` query parameter is correct and supported by your specific model deployment.",
  relatedSkills: ['OpenAI', 'Anthropic'],
  links: { 'Azure OpenAI Docs': 'https://learn.microsoft.com/en-us/azure/ai-services/openai/' },
  examples: {
    typescript: {
      basic: `import OpenAI from 'openai';\nconst client = new OpenAI({ baseURL: 'https://RESOURCE.openai.azure.com/openai/deployments/DEPLOYMENT', defaultQuery: { 'api-version': '2023-05-15' }, defaultHeaders: { 'api-key': 'KEY' } });`,
      chat: `const response = await client.chat.completions.create({ messages: [{ role: 'user', content: 'Hello' }], model: '' });`,
    },
    python: {
      basic: `from openai import AzureOpenAI\nclient = AzureOpenAI(api_key="key", api_version="2023-05-15", azure_endpoint="https://...")`,
    },
    go: { basic: `// Use the Azure SDK for Go` },
  },
  prompts: {
    'azure-chat':
      "Write a Node.js function using the official OpenAI SDK configured for Azure OpenAI, taking a prompt and returning the response, handling the 'content_filter' finish reason explicitly.",
  },
});

buildSkillV2({
  name: 'google-cloud-storage',
  displayName: 'Google Cloud Storage',
  description: 'Enterprise object storage by Google.',
  categories: ['Cloud', 'Storage'],
  quickStart:
    "Google Cloud Storage (GCS) is the GCP equivalent of S3, optimized for high durability and tight integration with Google's ML and BigQuery ecosystems.\n\n```bash\nnpm install @google-cloud/storage\n```",
  commonWorkflows:
    '### Signed URLs for Client Uploads\nNever pass file buffers through your Node.js application. Generate a V4 Signed URL using `@google-cloud/storage`, send it to the frontend, and have the browser PUT the file directly into GCS.',
  productionPatterns:
    '### Resumable Uploads\nFor files exceeding 5MB, always utilize resumable uploads. The SDK handles this automatically via `bucket.file().createWriteStream({ resumable: true })`.',
  errorRecovery:
    "Handle intermittent network failures during massive downloads by wrapping stream pipes in error handlers and relying on GCS's native retry capabilities built into the Node.js SDK.",
  securityNotes:
    'Use Workload Identity Federation instead of downloading static JSON Service Account keys. Enforce Uniform Bucket-Level Access to prevent accidental public exposure via individual object ACLs.',
  performanceConsiderations:
    'If you are serving thousands of small images globally, place Cloud CDN in front of your GCS bucket. Do not serve highly-trafficked public assets directly from GCS storage nodes.',
  testingGuidance:
    'Use the Google Cloud Storage emulator (`fs-test-server`) to mock GCS APIs locally during CI without incurring egress charges.',
  troubleshooting:
    "If Signed URLs fail with 'SignatureDoesNotMatch', ensure the `Content-Type` header sent by the browser exactly matches the `contentType` specified when generating the URL.",
  relatedSkills: ['AWS S3', 'Firebase'],
  links: { 'GCS Node.js SDK': 'https://googleapis.dev/nodejs/storage/latest/' },
  examples: {
    typescript: {
      'signed-url': `import { Storage } from '@google-cloud/storage';\nconst storage = new Storage();\nconst [url] = await storage.bucket('my-bucket').file('img.png').getSignedUrl({ version: 'v4', action: 'write', expires: Date.now() + 15 * 60 * 1000, contentType: 'image/png' });`,
      upload: `await storage.bucket('my-bucket').upload('./local.txt', { destination: 'remote.txt' });`,
    },
    python: {
      basic: `from google.cloud import storage\nclient = storage.Client()\nbucket = client.bucket('my-bucket')`,
    },
    go: { basic: `// Utilize cloud.google.com/go/storage` },
  },
  prompts: {
    'gcs-upload':
      "Write a Node.js function using `@google-cloud/storage` that generates a v4 signed URL strictly restricted to uploading a 'video/mp4' file.",
  },
});

buildSkillV2({
  name: 'azure-blob-storage',
  displayName: 'Azure Blob Storage',
  description: 'Massively scalable object storage for unstructured data.',
  categories: ['Cloud', 'Storage'],
  quickStart:
    'Azure Blob Storage handles massive amounts of unstructured data. The `@azure/storage-blob` SDK provides powerful abstractions for Block, Append, and Page blobs.\n\n```bash\nnpm install @azure/storage-blob\n```',
  commonWorkflows:
    '### SAS (Shared Access Signature) Tokens\nGenerate a User Delegation SAS Token to grant temporary, tightly-scoped access to a specific blob without exposing the account key.',
  productionPatterns:
    '### Block Blobs vs Append Blobs\nUse Block Blobs for standard files (images, documents). Use Append Blobs explicitly for log files where data is continuously written to the end of the blob.',
  errorRecovery:
    'The SDK automatically handles transient failures using built-in retry policies (exponential backoff). Catch `RestError` to handle fatal authorization or missing resource failures.',
  securityNotes:
    'Prioritize Azure AD (Entra ID) authentication via `DefaultAzureCredential` over using connection strings containing the Account Key.',
  performanceConsiderations:
    'For high-throughput uploads, tune the `maxSingleShotSize` and `blockSize` parameters in the `uploadFile` method to parallelize chunk uploads efficiently across multiple threads.',
  testingGuidance:
    'Use Azurite, the official local emulator for Azure Storage, to run integration tests entirely locally without an Azure subscription.',
  troubleshooting:
    'If CORS errors occur when using SAS URLs in the browser, ensure CORS rules are explicitly defined on the Storage Account setting `AllowedOrigins` and `AllowedMethods` (PUT).',
  relatedSkills: ['AWS S3', 'Google Cloud Storage'],
  links: {
    'Azure Blob SDK': 'https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob',
  },
  examples: {
    typescript: {
      upload: `import { BlobServiceClient } from '@azure/storage-blob';\nconst client = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);\nconst blockBlobClient = client.getContainerClient('uploads').getBlockBlobClient('file.txt');\nawait blockBlobClient.uploadData(Buffer.from('Hello'));`,
      'error-handling': `try { await client.getContainerClient('missing').create(); } catch(e) { console.error('Creation failed', e.message); }`,
    },
    python: {
      basic: `from azure.storage.blob import BlobServiceClient\nclient = BlobServiceClient.from_connection_string("conn_str")`,
    },
    go: { basic: `// Utilize github.com/Azure/azure-sdk-for-go/sdk/storage/azblob` },
  },
  prompts: {
    'generate-sas':
      'Write a Node.js function using `@azure/storage-blob` that generates a read-only SAS URL for a specific blob that expires in 1 hour.',
  },
});
