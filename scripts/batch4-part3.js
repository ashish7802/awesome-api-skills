const { buildSkillV4 } = require('./build-skill-v4');

buildSkillV4({
  name: 'jwt',
  displayName: 'JSON Web Tokens',
  description:
    'Compact, URL-safe means of representing claims to be transferred between two parties.',
  categories: ['Authentication', 'Security'],
  learningLevel: 'intermediate',
  useCases: ['Stateless Auth', 'API Tokens'],
  deploymentTargets: ['any'],
  ecosystem: 'security',
  maintainers: ['ietf'],
  stability: 'production',
  relationships: [
    { target: 'oauth2', type: 'works_well_with' },
    { target: 'redis', type: 'integrates_with' },
  ],
  quickStart:
    'JWTs allow you to cryptographically sign a JSON payload (claims). The backend can verify this signature locally without needing to query a database for every API request.\n\n```bash\nnpm install jsonwebtoken\n```',
  productionPatterns:
    '### The Invalidation Problem\nBecause JWTs are stateless and verified locally, you cannot instantly revoke a stolen JWT before it expires. Keep expiration times (`exp`) extremely short (e.g., 15 minutes) and issue long-lived Refresh Tokens that are checked against the database.',
  architecture:
    '### Header, Payload, Signature\nA JWT is simply Base64Url encoded. The payload is NOT encrypted. Anyone who intercepts the token can read the data. Do not store sensitive information (like SSNs or passwords) inside the JWT payload.',
  errorRecovery:
    'Always wrap `jwt.verify()` in a try/catch block. It will throw specific errors for `TokenExpiredError` and `JsonWebTokenError` (invalid signature), which should map to a 401 HTTP response.',
  securityNotes:
    'Never accept tokens where the algorithm (`alg`) is set to `none`. Attackers use this to bypass signature verification. Always explicitly define the allowed algorithms in your verification function.',
  links: { 'JWT.io': 'https://jwt.io/' },
  examples: {
    typescript: {
      jwt: `import jwt from 'jsonwebtoken';\n\n// Sign\nconst token = jwt.sign({ userId: 123 }, 'super_secret', { expiresIn: '15m', algorithm: 'HS256' });\n\n// Verify\ntry {\n  const decoded = jwt.verify(token, 'super_secret', { algorithms: ['HS256'] });\n  console.log(decoded.userId);\n} catch (err) {\n  console.error('Invalid token');\n}`,
    },
  },
});

buildSkillV4({
  name: 'linux',
  displayName: 'Linux',
  description: 'The free, open-source operating system that powers the internet.',
  categories: ['Infrastructure', 'Enterprise'],
  learningLevel: 'advanced',
  useCases: ['Servers', 'Containers'],
  deploymentTargets: ['aws', 'gcp', 'azure'],
  ecosystem: 'devops',
  maintainers: ['linux-foundation'],
  stability: 'production',
  relationships: [
    { target: 'docker', type: 'integrates_with' },
    { target: 'nginx', type: 'works_well_with' },
  ],
  quickStart:
    'Linux is the foundation of modern cloud computing. Understanding the kernel, filesystem hierarchy, and shell commands is required for debugging production outages.',
  productionPatterns:
    '### systemd\nFor background services running directly on a VM (like an NGINX proxy or a Go binary), do not run them in a `tmux` session. Write a `systemd` service file to ensure the process starts on boot and automatically restarts on failure.',
  architecture:
    '### Everything is a file\nIn Linux, configuration, hardware devices (`/dev/sda`), and kernel parameters (`/proc/sys`) are represented as files. You can often read from or write to these files directly to monitor or alter system state.',
  errorRecovery:
    'When a server runs out of disk space (`No space left on device`), but `df -h` shows space available, you have likely run out of inodes. Check `df -i`. This happens when you have millions of tiny files (like session files or log chunks).',
  securityNotes:
    'Disable SSH password authentication (`PasswordAuthentication no`) in `/etc/ssh/sshd_config`. Exclusively use Ed25519 SSH keys. Use `fail2ban` to automatically block IPs that repeatedly fail authentication.',
  links: { 'Linux Docs': 'https://www.kernel.org/doc/html/latest/' },
  examples: {
    bash: {
      commands: `# Find top 10 largest directories\ndu -ah / | sort -rh | head -n 10\n\n# Check open ports\nsudo ss -tuln\n\n# Follow logs tail\njournalctl -u my-service -f`,
    },
  },
});

buildSkillV4({
  name: 'caddy',
  displayName: 'Caddy',
  description: 'The ultimate enterprise web server with automatic HTTPS.',
  categories: ['Infrastructure', 'Security'],
  learningLevel: 'beginner',
  useCases: ['Reverse Proxy', 'Static File Server'],
  deploymentTargets: ['docker', 'digitalocean'],
  ecosystem: 'devops',
  maintainers: ['caddyserver'],
  stability: 'production',
  relationships: [
    { target: 'nginx', type: 'alternative_to' },
    { target: 'docker', type: 'works_well_with' },
  ],
  quickStart:
    "Caddy is a modern Go-based web server that completely automates TLS certificate generation and renewal via Let's Encrypt.\n\n```bash\ncaddy run\n```",
  productionPatterns:
    '### Automatic HTTPS\nUnlike NGINX where you must configure certbot and cron jobs manually, Caddy handles the entire ACME challenge, certificate generation, and auto-renewal internally without any configuration beyond defining your domain name.',
  architecture:
    '### Caddyfile\nThe configuration syntax is drastically simpler than NGINX. A fully functional reverse proxy with automatic HTTPS is literally two lines of code.',
  errorRecovery:
    "If Caddy fails to start due to port binding errors, ensure port 80 and 443 are free. Caddy MUST bind to port 80 to complete the HTTP-01 Let's Encrypt challenge.",
  securityNotes:
    "Caddy is memory-safe since it's written in Go, eliminating entire classes of buffer overflow vulnerabilities present in older C-based servers.",
  links: { 'Caddy Docs': 'https://caddyserver.com/docs/' },
  examples: {
    yaml: {
      Caddyfile: `api.example.com {\n  reverse_proxy localhost:8080\n}\n\nexample.com {\n  root * /var/www/html\n  file_server\n}`,
    },
  },
});

buildSkillV4({
  name: 'traefik',
  displayName: 'Traefik',
  description: 'The Cloud Native Application Proxy.',
  categories: ['Infrastructure', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['Ingress Controller', 'Reverse Proxy'],
  deploymentTargets: ['kubernetes', 'docker'],
  ecosystem: 'devops',
  maintainers: ['traefik'],
  stability: 'production',
  relationships: [
    { target: 'kubernetes', type: 'integrates_with' },
    { target: 'docker', type: 'integrates_with' },
    { target: 'nginx', type: 'alternative_to' },
    { target: 'caddy', type: 'alternative_to' },
  ],
  quickStart:
    'Traefik is a dynamic reverse proxy. It automatically discovers services running in Docker or Kubernetes and routes traffic to them without requiring manual configuration reloads.\n\n```bash\ndocker-compose up -d\n```',
  productionPatterns:
    "### Docker Label Routing\nWhen running a Docker Swarm or Compose cluster, you do not write Traefik configuration files. You simply attach labels to your application containers (`traefik.http.routers.my-app.rule=Host('example.com')`). Traefik dynamically detects the container and routes traffic.",
  architecture:
    '### Kubernetes Ingress\nTraefik natively implements the Kubernetes Ingress specification. It seamlessly reads your Ingress objects or custom IngressRoute CRDs and dynamically updates its routing table.',
  errorRecovery:
    'Traefik includes an internal dashboard on port 8080. If routes are failing (404), check the dashboard to ensure Traefik has successfully discovered the container and parsed the routing rule correctly.',
  securityNotes:
    "Traefik supports automatic Let's Encrypt generation. When running multiple Traefik replicas in Kubernetes, you must use a distributed key-value store (like Consul) to store the TLS certificates, otherwise replicas will hit ACME rate limits.",
  links: { 'Traefik Docs': 'https://doc.traefik.io/traefik/' },
  examples: {
    yaml: {
      'docker-compose': `version: '3'\nservices:\n  traefik:\n    image: traefik:v2.10\n    ports:\n      - "80:80"\n    volumes:\n      - /var/run/docker.sock:/var/run/docker.sock\n  api:\n    image: my-api\n    labels:\n      - "traefik.http.routers.api.rule=Host(\`api.local\`)"`,
    },
  },
});

buildSkillV4({
  name: 'cloudflare-workers',
  displayName: 'Cloudflare Workers',
  description:
    'Build serverless applications and deploy globally across the Cloudflare edge network.',
  categories: ['Cloud', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['Edge Computing', 'Serverless API'],
  deploymentTargets: ['cloudflare'],
  ecosystem: 'javascript',
  maintainers: ['cloudflare'],
  stability: 'production',
  relationships: [
    { target: 'hono', type: 'works_well_with' },
    { target: 'drizzle', type: 'integrates_with' },
  ],
  quickStart:
    'Workers run V8 isolates, meaning there are virtually zero cold starts compared to AWS Lambda. Your code executes physically close to the user in hundreds of data centers globally.\n\n```bash\nnpm create cloudflare@latest\n```',
  productionPatterns:
    '### KV and Durable Objects\nWorkers are stateless. To persist data at the edge, use Cloudflare KV for read-heavy eventual consistency, or Durable Objects for strongly consistent transactional state (like WebSockets or counters).',
  architecture:
    '### Web Standard APIs\nWorkers do not run Node.js (though compatibility is improving). You must use Web Standard APIs (`fetch`, `Request`, `Response`, `crypto.subtle`). Avoid libraries that depend heavily on `fs` or native Node C++ bindings.',
  errorRecovery:
    'Workers have strict CPU time limits (e.g., 10-50ms). Doing heavy CPU processing will cause the worker to be killed. Offload heavy processing to traditional servers or use Cloudflare Queues.',
  securityNotes:
    'Use `wrangler secret put` to securely store API keys. These are injected into the `env` object passed to your fetch handler, ensuring secrets never touch the codebase.',
  links: { 'Cloudflare Docs': 'https://developers.cloudflare.com/workers/' },
  examples: {
    typescript: {
      worker: `export default {\n  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {\n    return new Response('Hello Edge!');\n  },\n};`,
    },
  },
});
