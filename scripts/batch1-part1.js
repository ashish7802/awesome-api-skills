const { buildSkill } = require('./build-skill');

buildSkill({
  name: "stripe",
  displayName: "Stripe",
  description: "Financial infrastructure platform for the internet.",
  categories: ["Payments", "Commerce"],
  overview: "Stripe provides APIs for payment processing, billing, subscriptions, and financial management. This skill focuses on the Stripe Node.js and Python SDKs, emphasizing PCI-compliant flows like Checkout Sessions and Webhook signatures.",
  installation: "```bash\nnpm install stripe\npip install stripe\n```",
  authentication: "Stripe uses Bearer token authentication via secret keys (e.g., `sk_test_...` or `sk_live_...`). Never expose the secret key in client-side code. Use restricted keys with minimal scope where possible.",
  coreConcepts: "- **PaymentIntent**: Tracks the lifecycle of a customer checkout process.\n- **Checkout Session**: A hosted Stripe page for secure payment collection.\n- **Webhook**: Asynchronous HTTP callbacks for events like `payment_intent.succeeded`.",
  workflows: "1. Create a Checkout Session on the backend.\n2. Redirect the user to the `url` returned.\n3. Handle the `checkout.session.completed` event via Webhook.",
  errorHandling: "Stripe returns standard HTTP status codes. Inspect the `StripeError` object for `type` (e.g., `card_error`, `api_error`) and `code` (e.g., `insufficient_funds`). Implement exponential backoff for `429 Too Many Requests`.",
  security: "Always verify webhook signatures using `stripe.webhooks.constructEvent` to prevent replay attacks and spoofing. Ensure TLS is enforced for all API traffic.",
  rateLimits: "Standard API rate limits are 100 read/write operations per second in live mode. Test mode is limited to 25 operations per second.",
  bestPractices: "Use idempotency keys (`Idempotency-Key` header) for all POST requests to safely retry network failures without duplicate charges.",
  troubleshooting: "If a webhook fails signature validation, ensure you are using the raw body buffer (in Express, use `express.raw({type: 'application/json'})`) rather than a parsed JSON body.",
  links: { "API Reference": "https://stripe.com/docs/api" },
  examples: {
    typescript: `import Stripe from 'stripe';\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);`,
    python: `import stripe\nstripe.api_key = "sk_test_..."`
  },
  prompts: {
    "create-checkout": "Generate a Stripe Checkout Session for a one-time payment of $20 USD for a product named 'Pro Plan'. Ensure `success_url` and `cancel_url` are set."
  },
  test: `console.log('Tested Stripe');`
});

buildSkill({
  name: "openai",
  displayName: "OpenAI",
  description: "Artificial Intelligence APIs including GPT-4 and DALL-E.",
  categories: ["AI", "Developer Tools"],
  overview: "OpenAI provides advanced machine learning models via REST API. This skill covers Chat Completions, Embeddings, and Vision models, focusing on streaming architectures and context management.",
  installation: "```bash\nnpm install openai\npip install openai\n```",
  authentication: "Authenticate using a Bearer token (`OPENAI_API_KEY`). For enterprise organizations, supply the `OPENAI_ORG_ID` to properly attribute billing.",
  coreConcepts: "- **Messages**: An array of `{ role, content }` objects representing conversation history.\n- **Temperature**: Controls randomness (0.0 for deterministic, 1.0 for creative).\n- **Tokens**: The atomic unit of billing and context limits.",
  workflows: "1. Construct a system prompt.\n2. Append user input to the messages array.\n3. Call `chat.completions.create` with `stream: true` for low-latency UX.",
  errorHandling: "Catch `OpenAIError`. Handle `RateLimitError` (HTTP 429) via exponential backoff. Handle `LengthError` by dynamically summarizing or trimming the context window before retrying.",
  security: "Never inject unsanitized user input directly into system prompts to avoid prompt injection attacks. Do not leak API keys in frontend bundles.",
  rateLimits: "Limits are tiered based on usage. Tier 1 allows 500 RPM for GPT-3.5 and 500 RPM for GPT-4. Tier 5 allows 10,000 RPM.",
  bestPractices: "Use `max_tokens` defensively to bound costs. Utilize function calling (`tools`) to ensure the model outputs strictly typed JSON data rather than relying on regex parsing.",
  troubleshooting: "If you receive 'Context window exceeded', count tokens using `tiktoken` before sending the request.",
  links: { "API Reference": "https://platform.openai.com/docs/api-reference" },
  examples: {
    typescript: `import OpenAI from 'openai';\nconst openai = new OpenAI();\nconst completion = await openai.chat.completions.create({ model: 'gpt-4o', messages: [{role: 'user', content: 'Hi'}] });`,
    python: `from openai import OpenAI\nclient = OpenAI()\nresponse = client.chat.completions.create(model="gpt-4o", messages=[{"role":"user","content":"Hi"}])`
  },
  prompts: {
    "stream-chat": "Write a Node.js Express endpoint that calls the OpenAI chat completions API with GPT-4o, enables streaming, and pipes the response directly to the Server-Sent Events (SSE) client."
  },
  test: `console.log('Tested OpenAI');`
});

buildSkill({
  name: "anthropic",
  displayName: "Anthropic",
  description: "Claude 3 model family for advanced reasoning and coding.",
  categories: ["AI"],
  overview: "Anthropic's API provides access to the Claude 3 family (Opus, Sonnet, Haiku). This skill focuses on the Messages API, vision capabilities, and strict system prompt isolation.",
  installation: "```bash\nnpm install @anthropic-ai/sdk\npip install anthropic\n```",
  authentication: "Use the `x-api-key` header with your `ANTHROPIC_API_KEY`. You must also supply the `anthropic-version` header (e.g., `2023-06-01`).",
  coreConcepts: "- **System Prompt**: Isolated from the main conversation array for higher adherence.\n- **Claude 3.5 Sonnet**: The recommended default model for speed and coding intelligence.\n- **Max Tokens**: Required parameter defining the generation limit (e.g., 4096 or 8192).",
  workflows: "1. Define the system prompt.\n2. Pass the conversation history alternating precisely between `user` and `assistant`.\n3. Process the response blocks.",
  errorHandling: "Handle `AnthropicError`. The `OverloadedError` indicates capacity constraints; retry with backoff. `AuthenticationError` indicates invalid or revoked keys.",
  security: "Anthropic provides inherent safety filters. Ensure system prompts instruct the model to avoid executing unverified external data.",
  rateLimits: "Tiered rate limits applied per minute (RPM) and tokens per minute (TPM). Tier 1 for Claude 3 Sonnet is 50 RPM and 40,000 TPM.",
  bestPractices: "Always put long reference documents inside `<documents>` XML tags. Claude is specifically trained to parse and pay closer attention to XML structures.",
  troubleshooting: "If the API returns a 'roles must alternate' error, ensure your `messages` array strictly follows a `user` -> `assistant` -> `user` sequence without duplicate consecutive roles.",
  links: { "API Reference": "https://docs.anthropic.com/en/api/getting-started" },
  examples: {
    typescript: `import Anthropic from '@anthropic-ai/sdk';\nconst anthropic = new Anthropic();`,
    python: `import anthropic\nclient = anthropic.Anthropic()`
  },
  prompts: {
    "xml-parsing": "Create a prompt that instructs Claude to read a provided block of text, extract specific named entities, and output them exclusively as a JSON array."
  },
  test: `console.log('Tested Anthropic');`
});

buildSkill({
  name: "gemini",
  displayName: "Google Gemini",
  description: "Multimodal AI models by Google.",
  categories: ["AI"],
  overview: "Google Gemini offers natively multimodal capabilities (text, image, audio, video). This skill focuses on `@google/genai` and the v1beta API surface.",
  installation: "```bash\nnpm install @google/genai\npip install google-genai\n```",
  authentication: "Use a Google API key passed to the client initialization. For GCP environments, Vertex AI authentication via IAM is preferred.",
  coreConcepts: "- **Parts**: The building blocks of a message. A part can be text or inline data (images).\n- **Gemini 1.5 Pro**: Features a massive 1-million to 2-million token context window.\n- **System Instructions**: Provided at the model initialization level.",
  workflows: "1. Initialize `GoogleGenAI`.\n2. Call `models.generateContent` with a multimodal array of parts.\n3. Extract the text from the response candidate.",
  errorHandling: "Watch for `FinishReason.SAFETY`. If the model refuses to answer due to safety settings, the response will be empty but the `finishReason` will indicate why.",
  security: "Tune safety settings (`HARM_CATEGORY_HATE_SPEECH`, etc.) according to your application's risk tolerance.",
  rateLimits: "Free tier offers 15 RPM for Gemini 1.5 Flash. Paid tiers depend on GCP quotas.",
  bestPractices: "Leverage the massive context window by uploading entire codebases or PDFs rather than aggressively chunking, as Gemini 1.5's recall is exceptionally high.",
  troubleshooting: "If multimodal requests fail, ensure inline data is base64 encoded and the correct MIME type (e.g., `image/jpeg`) is specified.",
  links: { "API Reference": "https://ai.google.dev/api" },
  examples: {
    typescript: `import { GoogleGenAI } from '@google/genai';\nconst ai = new GoogleGenAI();`,
    python: `from google import genai\nclient = genai.Client()`
  },
  prompts: {
    "multimodal": "Write a script that takes a local image of a flowchart, converts it to base64, and asks Gemini 1.5 Pro to generate Mermaid.js code representing the chart."
  },
  test: `console.log('Tested Gemini');`
});

buildSkill({
  name: "github",
  displayName: "GitHub REST API",
  description: "Platform API for repositories, actions, and issues.",
  categories: ["DevOps", "Developer Tools"],
  overview: "The GitHub REST API (v3) allows deep integration with Git data, pull requests, and GitHub Actions. This skill emphasizes the Octokit SDK.",
  installation: "```bash\nnpm install octokit\npip install PyGithub\n```",
  authentication: "Use Personal Access Tokens (Classic or Fine-grained) passed as Bearer tokens. Fine-grained PATs are highly recommended for least-privilege access.",
  coreConcepts: "- **Octokit**: The official SDK.\n- **Refs**: Git references (branches/tags).\n- **Checks**: Status reports for commits (used by CI).",
  workflows: "1. Authenticate Octokit.\n2. Call `octokit.rest.pulls.create` to open a PR.\n3. Request reviewers via `octokit.rest.pulls.requestReviewers`.",
  errorHandling: "Handle `HttpError`. Status `404` often indicates missing permissions (due to token scope) rather than a truly missing resource.",
  security: "Never store PATs in source code. Use GitHub Apps for server-to-server integrations rather than service accounts.",
  rateLimits: "Authenticated requests are limited to 5,000 per hour. Search API is limited to 30 requests per minute.",
  bestPractices: "Use GraphQL for deeply nested data retrieval to save REST calls. Use the `If-None-Match` header to utilize conditional requests (saves rate limits).",
  troubleshooting: "If Actions fail to trigger via API, ensure your token has the `workflow` scope.",
  links: { "API Reference": "https://docs.github.com/en/rest" },
  examples: {
    typescript: `import { Octokit } from 'octokit';\nconst octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });`,
    python: `from github import Github\ng = Github("access_token")`
  },
  prompts: {
    "create-pr": "Write a Node.js function using Octokit that creates a new branch off 'main', commits a file change, and opens a Pull Request."
  },
  test: `console.log('Tested GitHub');`
});
