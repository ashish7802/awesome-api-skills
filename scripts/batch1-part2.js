const { buildSkill } = require('./build-skill');

buildSkill({
  name: 'twilio',
  displayName: 'Twilio',
  description: 'Communication APIs for SMS, Voice, and Video.',
  categories: ['Messaging'],
  overview:
    'Twilio provides programmable communication tools. This skill details the SMS and Voice APIs, emphasizing webhooks for incoming messages and TwiML for call routing.',
  installation: '```bash\nnpm install twilio\npip install twilio\n```',
  authentication: 'Authenticate using Account SID and Auth Token. Keep these strictly server-side.',
  coreConcepts:
    '- **TwiML**: XML-based language that instructs Twilio on how to handle calls and SMS.\n- **Message SID**: Unique identifier for tracking message delivery status.',
  workflows:
    '1. Instantiate Twilio client.\n2. Call `messages.create` with `to`, `from`, and `body`.\n3. Poll or use status webhooks to confirm delivery.',
  errorHandling:
    "Handle the `TwilioRestException`. Code 21211 means 'Invalid 'To' Phone Number'. Handle gracefully in the UI.",
  security:
    'Validate incoming webhooks using `twilio.validateRequest` to ensure requests actually originated from Twilio.',
  rateLimits:
    'Standard SMS throughput is 1 message per second per long code. Toll-free and short codes have higher limits.',
  bestPractices:
    'Use Messaging Services instead of hardcoded numbers to automatically handle compliance, opt-outs, and sender ID rotation.',
  troubleshooting: 'If international SMS fails, check your Geo-Permissions in the Twilio Console.',
  links: { 'API Reference': 'https://www.twilio.com/docs/api' },
  examples: {
    typescript: `import twilio from 'twilio';\nconst client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);`,
    python: `from twilio.rest import Client\nclient = Client(account_sid, auth_token)`,
  },
  prompts: {
    'send-sms':
      'Create a Node script that uses Twilio to send an SMS, and includes a webhook handler in Express to process delivery status updates.',
  },
  test: `console.log('Tested Twilio');`,
});

buildSkill({
  name: 'sendgrid',
  displayName: 'SendGrid',
  description: 'Cloud-based email delivery and management.',
  categories: ['Messaging'],
  overview:
    'SendGrid handles transactional and marketing email delivery. This skill focuses on the `@sendgrid/mail` SDK and dynamic templates.',
  installation: '```bash\nnpm install @sendgrid/mail\npip install sendgrid\n```',
  authentication:
    "Use a SendGrid API Key. Restrict API key permissions to 'Mail Send' only for production application servers.",
  coreConcepts:
    '- **Dynamic Templates**: Handlebars-like syntax for transactional emails.\n- **Personalizations**: Allows sending to multiple recipients with unique template data per recipient.',
  workflows:
    '1. Set API Key.\n2. Construct message object with `template_id` and `dynamic_template_data`.\n3. Call `sgMail.send(msg)`.',
  errorHandling:
    'Handle HTTP 401 (Invalid Key) and HTTP 403 (Domain not authenticated). Output `error.response.body.errors` for detailed validation messages.',
  security:
    'Ensure Sender Authentication (Domain Authentication / SPF / DKIM) is configured; otherwise emails will go to spam.',
  rateLimits:
    'SendGrid limits depend on the plan, typically supporting thousands of requests per second.',
  bestPractices:
    'Do not use `to` arrays for bulk mailing unless you want recipients to see each other. Use multiple `personalizations` instead.',
  troubleshooting:
    "If emails aren't arriving, check the Activity Feed in the SendGrid dashboard for bounces or drops.",
  links: { 'API Reference': 'https://docs.sendgrid.com/api-reference' },
  examples: {
    typescript: `import sgMail from '@sendgrid/mail';\nsgMail.setApiKey(process.env.SENDGRID_API_KEY!);`,
    python: `import sendgrid\nsg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))`,
  },
  prompts: {
    'send-email':
      'Write a function using the SendGrid Node.js SDK to send a transactional email using a specific Dynamic Template ID and inject user variables.',
  },
  test: `console.log('Tested SendGrid');`,
});

buildSkill({
  name: 'supabase',
  displayName: 'Supabase',
  description: 'Open source Firebase alternative based on PostgreSQL.',
  categories: ['Databases', 'Authentication'],
  overview:
    'Supabase provides Postgres database access, authentication, edge functions, and storage. This skill covers the `@supabase/supabase-js` client and Row Level Security (RLS).',
  installation: '```bash\nnpm install @supabase/supabase-js\npip install supabase\n```',
  authentication:
    'Clients use the `SUPABASE_URL` and `anon` key. Server environments use the `service_role` key to bypass RLS.',
  coreConcepts:
    '- **RLS (Row Level Security)**: Postgres policies that restrict row access based on the authenticated user.\n- **Realtime**: Postgres CDC streamed over WebSockets.',
  workflows:
    "1. Authenticate user via `supabase.auth.signInWithPassword`.\n2. Query data: `supabase.from('table').select('*')`.\n3. RLS automatically filters rows.",
  errorHandling:
    'Supabase returns `{ data, error }`. Always check `if (error)` rather than relying on try/catch, as the JS client does not throw exceptions for query errors.',
  security:
    'Never expose the `service_role` key to the frontend. Always enable RLS on public tables.',
  rateLimits:
    'Auth API is heavily rate-limited to prevent brute-forcing. Database queries are limited by your Postgres instance compute.',
  bestPractices:
    'Use generated TypeScript types (`supabase gen types typescript`) to ensure type-safe database queries.',
  troubleshooting:
    'If queries return empty arrays `[]` instead of expected data, it is almost always due to missing or misconfigured RLS policies.',
  links: { 'API Reference': 'https://supabase.com/docs/reference' },
  examples: {
    typescript: `import { createClient } from '@supabase/supabase-js';\nconst supabase = createClient('URL', 'KEY');`,
    python: `from supabase import create_client\nsupabase = create_client('URL', 'KEY')`,
  },
  prompts: {
    'query-data':
      "Write a Supabase JS query that selects all 'todos' where 'user_id' matches the currently authenticated user, utilizing generated TypeScript types.",
  },
  test: `console.log('Tested Supabase');`,
});

buildSkill({
  name: 'vercel',
  displayName: 'Vercel API',
  description: 'Platform for frontend frameworks and static sites.',
  categories: ['Cloud', 'DevOps'],
  overview:
    'The Vercel REST API allows you to programmatically manage deployments, domains, and environment variables.',
  installation:
    '```bash\n# Standard fetch/axios is used for REST API\nnpm install @vercel/client\n```',
  authentication:
    'Authenticate using a Vercel Access Token sent in the `Authorization: Bearer <TOKEN>` header.',
  coreConcepts:
    '- **Deployment**: An immutable build of your project.\n- **Project**: A logical grouping of deployments.\n- **Aliases**: Custom domains assigned to specific deployments.',
  workflows:
    '1. Call `/v13/deployments` to trigger a build.\n2. Poll the deployment status.\n3. Assign an alias once READY.',
  errorHandling:
    'Handle HTTP 400 for validation errors, 403 for missing permissions. Review the `error.code` string (e.g., `not_found`).',
  security:
    'Scope your tokens carefully (Personal vs Team). Do not embed Vercel tokens in frontend apps.',
  rateLimits: 'Standard limit is 100 requests per 10 seconds per user.',
  bestPractices:
    'When fetching deployments, heavily utilize query parameters like `?limit=10` and `?projectId=` to reduce payload sizes.',
  troubleshooting:
    'If a deployment triggers but immediately fails, check the framework preset settings in your project configuration.',
  links: { 'API Reference': 'https://vercel.com/docs/rest-api' },
  examples: {
    typescript: `const res = await fetch('https://api.vercel.com/v9/projects', { headers: { Authorization: \`Bearer \${TOKEN}\` } });`,
    go: `req.Header.Add("Authorization", "Bearer "+token)`,
  },
  prompts: {
    'list-deployments':
      'Write a Node.js script using native fetch to list the 5 most recent successful deployments for a specific Vercel project.',
  },
  test: `console.log('Tested Vercel');`,
});

buildSkill({
  name: 'cloudflare',
  displayName: 'Cloudflare',
  description: 'Web performance and security company.',
  categories: ['Cloud', 'Security'],
  overview:
    'The Cloudflare API manages DNS, CDN caching, Workers, and WAF rules. This skill covers the Node.js SDK and REST patterns.',
  installation: '```bash\nnpm install cloudflare\npip install cloudflare\n```',
  authentication:
    'Use API Tokens (recommended) instead of the Global API Key. Tokens can be scoped to specific zones and permissions.',
  coreConcepts:
    '- **Zone**: Represents a domain name.\n- **Workers**: Serverless execution environments at the edge.\n- **Cache Purge**: Invalidating stored assets.',
  workflows:
    '1. Instantiate client with API token.\n2. Fetch Zone ID using domain name.\n3. Execute action (e.g., `client.zones.purgeCache`).',
  errorHandling:
    'Errors are returned in the `errors` array of the JSON response payload. Watch for code `10000` (Authentication error).',
  security:
    "Scope API Tokens tightly (e.g., 'Zone.DNS.Edit' for a single domain). Never use the Global API key in automated scripts.",
  rateLimits: 'The API allows 1200 requests per 5 minutes per IP address.',
  bestPractices:
    "When purging cache, try to purge by URL, Tag, or Prefix rather than 'Purge Everything' to maintain CDN performance.",
  troubleshooting:
    "If DNS records aren't updating, verify the 'proxied' (orange cloud) status, which alters how Cloudflare serves the record.",
  links: { 'API Reference': 'https://developers.cloudflare.com/api/' },
  examples: {
    typescript: `import Cloudflare from 'cloudflare';\nconst cf = new Cloudflare({ apiToken: 'token' });`,
    python: `from cloudflare import Cloudflare\ncf = Cloudflare(api_token="token")`,
  },
  prompts: {
    'purge-cache':
      'Write a script that uses the Cloudflare SDK to purge the cache for specific URLs on a given Zone ID.',
  },
  test: `console.log('Tested Cloudflare');`,
});
