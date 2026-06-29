const { buildSkillV3 } = require('./build-skill-v3');

buildSkillV3({
  name: 'docker',
  displayName: 'Docker',
  description: 'OS-level virtualization to deliver software in packages called containers.',
  categories: ['Developer Tools', 'Infrastructure'],
  learningLevel: 'intermediate',
  useCases: ['Containerization', 'CI/CD'],
  deploymentTargets: ['kubernetes', 'fly', 'railway'],
  ecosystem: 'devops',
  maintainers: ['docker'],
  stability: 'production',
  relationships: [
    { target: 'kubernetes', type: 'deploys_to' },
    { target: 'github-actions', type: 'integrates_with' },
  ],
  quickStart:
    "Docker packages your application and its dependencies into an immutable image, ensuring 'it works on my machine' scales to production.\n\n```bash\ndocker build -t my-app .\ndocker run -p 8080:8080 my-app\n```",
  productionPatterns:
    '### Multi-Stage Builds\nNever ship build tools (like compilers or dev dependencies) in your final production image. Use a `build` stage to compile your code, then copy only the compiled artifacts into a distroless or alpine base image for the final stage.',
  architecture:
    '### Image Caching\nDocker builds images in layers. Order your `Dockerfile` from least frequently changed (OS dependencies, package managers) to most frequently changed (source code). This ensures Docker caches the heavy steps and dramatically speeds up CI pipelines.',
  errorRecovery:
    'Use a process manager like PM2 or tini as `PID 1` inside your container to properly handle OS signals (SIGTERM/SIGINT) and reap zombie processes, allowing graceful shutdowns.',
  securityNotes:
    'Never run your container as the `root` user. Explicitly create and switch to a non-root `USER` at the end of your Dockerfile. Scan your images using tools like Trivy or Docker Scout to catch CVEs before deployment.',
  links: { 'Docker Docs': 'https://docs.docker.com/' },
  examples: {
    yaml: {
      Dockerfile: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nUSER node\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/package.json ./\nRUN npm install --only=production\nCMD ["node", "dist/index.js"]`,
    },
  },
});

buildSkillV3({
  name: 'kubernetes',
  displayName: 'Kubernetes',
  description: 'Automated container deployment, scaling, and management.',
  categories: ['Developer Tools', 'Infrastructure'],
  learningLevel: 'advanced',
  useCases: ['Microservices', 'Orchestration'],
  deploymentTargets: ['aws', 'gcp', 'azure'],
  ecosystem: 'devops',
  maintainers: ['cncf'],
  stability: 'production',
  relationships: [
    { target: 'docker', type: 'depends_on' },
    { target: 'helm', type: 'integrates_with' },
    { target: 'argo-cd', type: 'works_well_with' },
    { target: 'prometheus', type: 'monitors' },
  ],
  quickStart:
    'Kubernetes (K8s) orchestrates clusters of machines running containers. It declarative states (YAML) to manage Deployments, Services, and Ingresses.\n\n```bash\nkubectl apply -f deployment.yaml\n```',
  productionPatterns:
    '### Operators\nFor complex stateful applications (like Postgres or Redis), do not manually manage StatefulSets. Use Kubernetes Operators (e.g., CrunchyData Postgres Operator) to handle backups, failovers, and version upgrades automatically.',
  architecture:
    '### Probes\nAlways define `livenessProbe` and `readinessProbe`. The liveness probe determines if the pod needs to be restarted. The readiness probe determines if the pod is ready to receive network traffic from the Service load balancer.',
  errorRecovery:
    'If pods frequently crash with `OOMKilled` (Out of Memory), ensure your `resources.limits.memory` is set correctly and matches the memory allocation limits of your runtime (e.g., Node.js `--max-old-space-size`).',
  securityNotes:
    'Enable RBAC (Role-Based Access Control). Do not grant default Service Accounts cluster-admin privileges. Utilize Network Policies to restrict pod-to-pod communication (e.g., only the backend can talk to the database).',
  links: { 'Kubernetes Docs': 'https://kubernetes.io/docs/home/' },
  examples: {
    yaml: {
      deployment: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: my-app\n  template:\n    metadata:\n      labels:\n        app: my-app\n    spec:\n      containers:\n      - name: app\n        image: my-app:latest\n        ports:\n        - containerPort: 8080\n        readinessProbe:\n          httpGet:\n            path: /health\n            port: 8080\n          initialDelaySeconds: 5`,
    },
  },
});

buildSkillV3({
  name: 'git',
  displayName: 'Git',
  description: 'Distributed version control system.',
  categories: ['Developer Tools'],
  learningLevel: 'beginner',
  useCases: ['Version Control'],
  deploymentTargets: ['github', 'gitlab'],
  ecosystem: 'devops',
  maintainers: ['git'],
  stability: 'production',
  relationships: [{ target: 'github-actions', type: 'works_well_with' }],
  quickStart:
    'Git tracks changes in source code during software development.\n\n```bash\ngit init\ngit commit -m "Initial commit"\n```',
  productionPatterns:
    '### Interactive Rebase\nBefore merging a feature branch into main, use `git rebase -i main` to squash messy "WIP" commits into clean, atomic, descriptive commits that clearly outline the feature\'s history.',
  architecture:
    '### Branching Strategies\nTrunk-Based Development (short-lived feature branches merging into `main` quickly) is preferred over long-lived GitFlow branches to prevent massive, unresolvable merge conflicts.',
  errorRecovery:
    'If you accidentally commit secrets, using `git rm` is not enough as the secret remains in history. Use `git filter-repo` or BFG Repo-Cleaner to permanently scrub the file from all historical commits, and invalidate the secret immediately.',
  securityNotes:
    "Sign your commits using GPG or SSH keys. Platforms like GitHub verify these signatures, assuring team members that the commit wasn't spoofed.",
  links: { 'Git Docs': 'https://git-scm.com/doc' },
  examples: {
    yaml: {
      commands: `# Fetch latest without merging\ngit fetch origin\n# Rebase feature branch onto main\ngit rebase origin/main\n# Force push safely (prevents overwriting remote changes)\ngit push --force-with-lease`,
    },
  },
});

buildSkillV3({
  name: 'github-actions',
  displayName: 'GitHub Actions',
  description: 'Automate your software workflows directly from GitHub.',
  categories: ['CI/CD', 'Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['CI/CD', 'Automation'],
  deploymentTargets: ['github'],
  ecosystem: 'devops',
  maintainers: ['github'],
  stability: 'production',
  relationships: [
    { target: 'git', type: 'depends_on' },
    { target: 'docker', type: 'works_well_with' },
  ],
  quickStart:
    'GitHub Actions uses YAML workflows defined in `.github/workflows/` to automatically run tests, build images, and deploy code upon pushes or pull requests.\n\n```yaml\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n```',
  productionPatterns:
    '### Reusable Workflows\nDo not duplicate CI steps across 50 repositories. Create a centralized repository containing reusable workflows (`workflow_call`), and have individual repositories reference them. This allows updating CI standards globally.',
  architecture:
    '### Dependency Caching\nAlways cache `node_modules` or `~/.cache/pip` using the `actions/cache` action or built-in caching via `actions/setup-node`. This can reduce CI pipeline times by 50% or more.',
  errorRecovery:
    'If a flaky test fails the pipeline, you can use the `continue-on-error: true` flag for that specific step, though it is highly recommended to fix the test rather than masking it.',
  securityNotes:
    'Never use `pull_request_target` unless absolutely necessary, as it grants actions access to repository secrets even from forked PRs, leading to easy secret exfiltration attacks. Use OpenID Connect (OIDC) instead of storing long-lived AWS/GCP credentials in GitHub Secrets.',
  links: { 'GitHub Actions': 'https://docs.github.com/en/actions' },
  examples: {
    yaml: {
      ci: `name: Node.js CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v4\n    - uses: actions/setup-node@v4\n      with:\n        node-version: '20'\n        cache: 'npm'\n    - run: npm ci\n    - run: npm test`,
    },
  },
});

buildSkillV3({
  name: 'playwright',
  displayName: 'Playwright',
  description: 'End-to-end testing for modern web apps.',
  categories: ['Developer Tools', 'Testing'],
  learningLevel: 'intermediate',
  useCases: ['E2E Testing', 'Automation'],
  deploymentTargets: ['github-actions'],
  ecosystem: 'javascript',
  maintainers: ['microsoft'],
  stability: 'production',
  relationships: [
    { target: 'github-actions', type: 'integrates_with' },
    { target: 'nextjs', type: 'works_well_with' },
  ],
  quickStart:
    'Playwright is a framework for Web Testing and Automation. It runs headless browsers (Chromium, WebKit, Firefox) to simulate user interactions.\n\n```bash\nnpm init playwright@latest\n```',
  productionPatterns:
    "### Auto-Waiting and Locators\nNever use `page.waitForTimeout(5000)`. Rely on Playwright's Locators (`page.getByRole('button')`) which automatically wait for the element to be visible, enabled, and stable before clicking.",
  architecture:
    '### Parallel Execution\nPlaywright runs tests in parallel by default using multiple worker processes. Ensure your backend database can handle concurrent test executions, or use isolated database branches (e.g., Neon) for each test shard.',
  errorRecovery:
    'If tests flake due to network latency, configure automatic retries in `playwright.config.ts` (`retries: process.env.CI ? 2 : 0`).',
  securityNotes:
    'Do not expose real user credentials in your test files. Seed a test database dynamically before the test run, or utilize dedicated test environment variables injected by the CI runner.',
  links: { 'Playwright Docs': 'https://playwright.dev/docs/intro' },
  examples: {
    typescript: {
      test: `import { test, expect } from '@playwright/test';\n\ntest('login flow', async ({ page }) => {\n  await page.goto('https://example.com/login');\n  await page.getByLabel('Email').fill('user@example.com');\n  await page.getByLabel('Password').fill('password123');\n  await page.getByRole('button', { name: 'Sign In' }).click();\n  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();\n});`,
    },
  },
});
