const { buildSkillV3 } = require('./build-skill-v3');

buildSkillV3({
  name: 'terraform',
  displayName: 'Terraform',
  description: 'Infrastructure as Code.',
  categories: ['Developer Tools', 'Infrastructure'],
  learningLevel: 'advanced',
  useCases: ['IaC', 'Cloud Provisioning'],
  deploymentTargets: ['aws', 'gcp', 'azure'],
  ecosystem: 'devops',
  maintainers: ['hashicorp'],
  stability: 'production',
  relationships: [
    { target: 'pulumi', type: 'alternative_to' },
    { target: 'github-actions', type: 'integrates_with' },
  ],
  quickStart:
    'Terraform allows you to declare cloud infrastructure (VPCs, Databases, Servers) in HCL (HashiCorp Configuration Language) and deploy it predictably.\n\n```bash\nterraform init\nterraform plan\nterraform apply\n```',
  productionPatterns:
    '### State Management\nNever store the `terraform.tfstate` file locally or commit it to Git. It often contains plaintext secrets (like database passwords). Always configure a remote state backend (like an encrypted AWS S3 bucket with DynamoDB state locking).',
  architecture:
    '### Modules\nDo not write massive monolithic `main.tf` files. Break your infrastructure into logical modules (e.g., `network`, `database`, `app_cluster`) and consume them in a root configuration. This drastically reduces the blast radius of changes.',
  errorRecovery:
    'If a `terraform apply` fails halfway through, the state file may become locked or corrupted. Use `terraform state list` and `terraform state rm` surgically to remove tainted resources rather than destroying the entire environment.',
  securityNotes:
    'Use `tfsec` or `checkov` in your CI/CD pipeline to statically analyze your Terraform code for security misconfigurations (like open security groups or unencrypted S3 buckets) before they are ever deployed.',
  links: { 'Terraform Docs': 'https://developer.hashicorp.com/terraform/docs' },
  examples: {
    yaml: {
      'main.tf': `provider "aws" {\n  region = "us-east-1"\n}\n\nresource "aws_s3_bucket" "my_bucket" {\n  bucket = "my-unique-bucket-name-123"\n}\n\nresource "aws_s3_bucket_public_access_block" "block" {\n  bucket = aws_s3_bucket.my_bucket.id\n  block_public_acls       = true\n  block_public_policy     = true\n}`,
    },
  },
});

buildSkillV3({
  name: 'pulumi',
  displayName: 'Pulumi',
  description: 'Universal Infrastructure as Code.',
  categories: ['Developer Tools', 'Infrastructure'],
  learningLevel: 'advanced',
  useCases: ['IaC'],
  deploymentTargets: ['aws', 'gcp', 'kubernetes'],
  ecosystem: 'devops',
  maintainers: ['pulumi'],
  stability: 'production',
  relationships: [
    { target: 'terraform', type: 'alternative_to' },
    { target: 'typescript', type: 'depends_on' },
  ],
  quickStart:
    'Pulumi allows you to write Infrastructure as Code using general-purpose programming languages (TypeScript, Python, Go) instead of proprietary domain-specific languages like HCL.\n\n```bash\nnpm install @pulumi/pulumi @pulumi/aws\npulumi up\n```',
  productionPatterns:
    '### Programmatic Generation\nBecause Pulumi uses real code, you can easily use loops to generate 50 identical S3 buckets with slightly varying names, or fetch data from an external API to determine resource configurations dynamically during deployment.',
  architecture:
    '### Micro-Stacks\nInstead of one massive Pulumi project, split your infrastructure into independent Stacks (e.g., `CoreNetwork`, `Database`, `Frontend`). Use Stack References (`new pulumi.StackReference`) to pass outputs (like VPC IDs) between them safely.',
  errorRecovery:
    'If Pulumi hangs during an update, you can manually cancel it and use `pulumi stack export` to inspect the raw JSON state, fix any corrupted resource IDs, and `pulumi stack import` the corrected state back.',
  securityNotes:
    'Pulumi natively supports secret management (`pulumi config set --secret`). Secrets are encrypted in the state file. When writing TypeScript, these secrets are returned as `Output<string>` types which cannot be accidentally logged as plaintext.',
  links: { 'Pulumi Docs': 'https://www.pulumi.com/docs/' },
  examples: {
    typescript: {
      index: `import * as pulumi from "@pulumi/pulumi";\nimport * as aws from "@pulumi/aws";\n\nconst bucket = new aws.s3.Bucket("my-bucket");\n\nexport const bucketName = bucket.id;`,
    },
    python: {
      index: `import pulumi\nimport pulumi_aws as aws\nbucket = aws.s3.Bucket("my-bucket")\npulumi.export("bucket_name", bucket.id)`,
    },
  },
});

buildSkillV3({
  name: 'helm',
  displayName: 'Helm',
  description: 'The package manager for Kubernetes.',
  categories: ['Developer Tools', 'Infrastructure'],
  learningLevel: 'intermediate',
  useCases: ['Kubernetes Deployment'],
  deploymentTargets: ['kubernetes'],
  ecosystem: 'devops',
  maintainers: ['cncf'],
  stability: 'production',
  relationships: [
    { target: 'kubernetes', type: 'depends_on' },
    { target: 'argo-cd', type: 'integrates_with' },
  ],
  quickStart:
    "Helm packages Kubernetes YAML files into distributable 'Charts'. It allows templating YAML files so you can deploy identical apps to staging and production with different environment variables.\n\n```bash\nhelm install my-release bitnami/redis\n```",
  productionPatterns:
    "### Umbrella Charts\nFor complex microservice architectures, create an 'Umbrella' Helm chart that contains no templates of its own, but defines your individual microservice charts as dependencies in `Chart.yaml`. This allows deploying your entire ecosystem with a single command.",
  architecture:
    '### Values Overrides\nKeep your chart templates generic. Define environment-specific configurations entirely within `values-staging.yaml` and `values-prod.yaml`. Pass these during installation: `helm upgrade -f values-prod.yaml ...`',
  errorRecovery:
    'Use `helm rollback <release> <revision>` to instantly revert a broken deployment. Helm tracks the history of deployed charts natively in Kubernetes Secrets.',
  securityNotes:
    'Do not store plaintext passwords in `values.yaml` files committed to Git. Use tools like HashiCorp Vault or `helm-secrets` (backed by SOPS) to inject encrypted values at deploy time.',
  links: { 'Helm Docs': 'https://helm.sh/docs/' },
  examples: {
    yaml: {
      'Chart.yaml': `apiVersion: v2\nname: my-app\ndescription: A Helm chart for Kubernetes\ntype: application\nversion: 0.1.0\nappVersion: "1.16.0"`,
      'deployment.yaml': `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {{ include "my-app.fullname" . }}\nspec:\n  replicas: {{ .Values.replicaCount }}\n  template:\n    spec:\n      containers:\n        - name: {{ .Chart.Name }}\n          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"`,
    },
  },
});

buildSkillV3({
  name: 'argo-cd',
  displayName: 'Argo CD',
  description: 'Declarative continuous deployment for Kubernetes.',
  categories: ['CI/CD', 'Infrastructure'],
  learningLevel: 'advanced',
  useCases: ['GitOps', 'Kubernetes'],
  deploymentTargets: ['kubernetes'],
  ecosystem: 'devops',
  maintainers: ['cncf'],
  stability: 'production',
  relationships: [
    { target: 'kubernetes', type: 'depends_on' },
    { target: 'helm', type: 'works_well_with' },
    { target: 'github-actions', type: 'alternative_to' },
  ],
  quickStart:
    'Argo CD implements GitOps. Instead of your CI pipeline pushing deployments to Kubernetes, Argo CD runs inside Kubernetes and continually pulls the latest desired state from your Git repository.\n\n```bash\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\n```',
  productionPatterns:
    "### The App of Apps Pattern\nDefine a root Argo CD `Application` custom resource that points to a Git directory containing *other* `Application` resources. This allows Argo CD to bootstrap and manage an entire cluster's configuration recursively.",
  architecture:
    '### Self-Healing\nEnable Auto-Sync and Self-Healing. If a developer manually runs `kubectl edit` in production to change a replica count, Argo CD will detect the configuration drift and immediately overwrite it, forcing Git to remain the single source of truth.',
  errorRecovery:
    'If an automated sync breaks the cluster, simply `git revert` the bad commit in your repository. Argo CD will instantly detect the rollback in Git and sync the cluster back to the healthy state.',
  securityNotes:
    "Argo CD requires extremely high privileges in the cluster. Ensure its UI/API is strictly protected via SSO (OIDC/SAML). Limit access using Argo CD's native RBAC to ensure developers can only sync applications in their specific namespaces.",
  links: { 'Argo CD Docs': 'https://argo-cd.readthedocs.io/' },
  examples: {
    yaml: {
      application: `apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: guestbook\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/argoproj/argocd-example-apps.git\n    targetRevision: HEAD\n    path: guestbook\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: default\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true`,
    },
  },
});

buildSkillV3({
  name: 'nginx',
  displayName: 'NGINX',
  description: 'High performance load balancer, web server, and reverse proxy.',
  categories: ['Developer Tools', 'Infrastructure'],
  learningLevel: 'intermediate',
  useCases: ['Reverse Proxy', 'Load Balancing'],
  deploymentTargets: ['docker', 'kubernetes'],
  ecosystem: 'devops',
  maintainers: ['f5'],
  stability: 'production',
  relationships: [
    { target: 'kubernetes', type: 'integrates_with' },
    { target: 'docker', type: 'integrates_with' },
  ],
  quickStart:
    'NGINX is primarily used in modern architectures as an Ingress Controller (in Kubernetes) or as a lightweight reverse proxy in front of Node.js/Python microservices to handle SSL termination and static file serving.\n\n```bash\ndocker run -p 80:80 -v ./nginx.conf:/etc/nginx/nginx.conf nginx\n```',
  productionPatterns:
    '### Node.js Reverse Proxying\nNode.js is single-threaded and struggles with serving thousands of static assets simultaneously. Place NGINX in front to serve `/public` assets efficiently, and proxy `/api` traffic back to Node.js using `proxy_pass`.',
  architecture:
    '### Event-Driven Architecture\nNGINX uses an asynchronous, event-driven architecture rather than allocating a thread per connection (like Apache). This allows it to handle tens of thousands of concurrent connections with minimal RAM usage.',
  errorRecovery:
    'If NGINX returns `502 Bad Gateway`, it means the backend service (e.g., your Express app) is crashed or unreachable. If it returns `504 Gateway Timeout`, your backend took longer to respond than the configured `proxy_read_timeout`.',
  securityNotes:
    'Always hide your server signature (`server_tokens off;`). Configure rate limiting (`limit_req_zone`) to protect your backend APIs from brute-force or DDoS attacks directly at the proxy layer.',
  links: { 'NGINX Docs': 'https://nginx.org/en/docs/' },
  examples: {
    yaml: {
      'nginx.conf': `events { worker_connections 1024; }\nhttp {\n  server {\n    listen 80;\n    server_name api.example.com;\n    \n    location / {\n      proxy_pass http://localhost:3000;\n      proxy_set_header Host $host;\n      proxy_set_header X-Real-IP $remote_addr;\n    }\n  }\n}`,
    },
  },
});
