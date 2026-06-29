const { buildSkillV3 } = require('./build-skill-v3');

buildSkillV3({
  name: 'grafana',
  displayName: 'Grafana',
  description: 'The open observability platform.',
  categories: ['Observability'],
  learningLevel: 'advanced',
  useCases: ['Dashboards', 'Alerting'],
  deploymentTargets: ['kubernetes', 'docker'],
  ecosystem: 'devops',
  maintainers: ['grafana-labs'],
  stability: 'production',
  relationships: [
    { target: 'prometheus', type: 'integrates_with' },
    { target: 'loki', type: 'integrates_with' },
    { target: 'datadog', type: 'alternative_to' },
  ],
  quickStart:
    'Grafana connects to disparate data sources (Prometheus, Loki, Postgres) and visualizes them on highly customizable dashboards.\n\n```bash\ndocker run -d -p 3000:3000 grafana/grafana\n```',
  productionPatterns:
    "### Provisioning as Code\nDo not click around the Grafana UI to create critical production dashboards. Use Grafana's File Provisioning system (JSON/YAML) or Infrastructure as Code (Terraform) to version control your dashboards and alerts.",
  architecture:
    '### Unified Alerting\nGrafana handles alerting natively. Define alert rules directly on the dashboard panels. Ensure Grafana is connected to a Notification Channel like Slack, PagerDuty, or Discord to route critical anomalies immediately.',
  errorRecovery:
    'If Grafana loses connection to its underlying database (SQLite by default, but should be Postgres in production), the UI will hang. Ensure high availability by clustering Grafana nodes backed by a managed PostgreSQL database.',
  securityNotes:
    'Never expose Grafana to the public internet without enforcing SSO (Single Sign-On) via Google, GitHub, or Okta. Disable basic authentication (`admin/admin`) immediately upon provisioning.',
  links: { 'Grafana Docs': 'https://grafana.com/docs/' },
  examples: {
    yaml: {
      provisioning: `apiVersion: 1\nproviders:\n  - name: 'default'\n    orgId: 1\n    folder: ''\n    type: file\n    disableDeletion: false\n    updateIntervalSeconds: 10\n    options:\n      path: /etc/grafana/provisioning/dashboards`,
    },
  },
});

buildSkillV3({
  name: 'prometheus',
  displayName: 'Prometheus',
  description: 'Powering metrics and alerting.',
  categories: ['Observability'],
  learningLevel: 'advanced',
  useCases: ['Metrics', 'Time Series Database'],
  deploymentTargets: ['kubernetes', 'docker'],
  ecosystem: 'devops',
  maintainers: ['cncf'],
  stability: 'production',
  relationships: [
    { target: 'grafana', type: 'works_well_with' },
    { target: 'kubernetes', type: 'monitors' },
  ],
  quickStart:
    'Prometheus is a pull-based time-series database. It scrapes `/metrics` endpoints across your infrastructure at regular intervals and stores them.\n\n```bash\ndocker run -p 9090:9090 prom/prometheus\n```',
  productionPatterns:
    '### Exporters\nDo not manually instrument standard infrastructure. Use Exporters (e.g., `node_exporter` for Linux stats, `postgres_exporter` for DB stats) which automatically expose standard metrics in the Prometheus format.',
  architecture:
    '### Pull vs Push\nPrometheus pulls metrics. In serverless environments (like AWS Lambda) where services are ephemeral and cannot be scraped, you must push metrics to a Prometheus Pushgateway, which Prometheus then scrapes.',
  errorRecovery:
    'Prometheus is heavily memory-bound. If it OOMs, check your label cardinality. High cardinality (e.g., tracking a user ID as a label on every metric) will exponentially explode the TSDB and crash the server.',
  securityNotes:
    'Prometheus scrape endpoints (`/metrics`) often contain sensitive infrastructure data. Ensure these endpoints are strictly inaccessible from the public internet (e.g., via internal Kubernetes network policies).',
  links: { 'Prometheus Docs': 'https://prometheus.io/docs/introduction/overview/' },
  examples: {
    yaml: {
      config: `global:\n  scrape_interval: 15s\n\nscrape_configs:\n  - job_name: 'node'\n    static_configs:\n      - targets: ['localhost:9100']\n  - job_name: 'api'\n    static_configs:\n      - targets: ['api.internal.local:8080']`,
    },
  },
});

buildSkillV3({
  name: 'opentelemetry',
  displayName: 'OpenTelemetry',
  description:
    'High-quality, ubiquitous, and portable telemetry to enable effective observability.',
  categories: ['Observability'],
  learningLevel: 'advanced',
  useCases: ['Tracing', 'Metrics', 'Logs'],
  deploymentTargets: ['kubernetes', 'docker'],
  ecosystem: 'devops',
  maintainers: ['cncf'],
  stability: 'production',
  relationships: [
    { target: 'jaeger', type: 'publishes_to' },
    { target: 'prometheus', type: 'publishes_to' },
  ],
  quickStart:
    'OpenTelemetry (OTel) provides a vendor-neutral standard for instrumenting code. You instrument once, and route telemetry data to Datadog, Jaeger, or Honeycomb interchangeably via the OTel Collector.\n\n```bash\nnpm install @opentelemetry/api @opentelemetry/sdk-node\n```',
  productionPatterns:
    '### The Collector Architecture\nNever send telemetry directly from your application to a backend vendor (e.g., sending traces directly to Honeycomb). Always send data to a local OpenTelemetry Collector (running as a sidecar or daemonset), which batches, compresses, and forwards the data securely.',
  architecture:
    '### Context Propagation\nFor distributed tracing to work, the unique `trace_id` must be passed between microservices. OTel achieves this automatically by injecting W3C Trace Context headers into outgoing HTTP/gRPC requests.',
  errorRecovery:
    'Telemetry SDKs are designed to fail silently. If the Collector goes down, the application will drop traces rather than crashing. Ensure you have infrastructure-level alerts tracking Collector health.',
  securityNotes:
    'Be extremely careful not to trace raw SQL queries containing PII, or log full HTTP request bodies containing passwords. Utilize OTel Collector processors to redact sensitive fields before data leaves your network.',
  links: { 'OpenTelemetry Docs': 'https://opentelemetry.io/docs/' },
  examples: {
    typescript: {
      tracing: `import { trace } from '@opentelemetry/api';\nconst tracer = trace.getTracer('my-service');\n\nasync function doWork() {\n  await tracer.startActiveSpan('manual-span', async (span) => {\n    try {\n      // execute logic\n      span.setAttribute('user.id', 123);\n    } finally {\n      span.end();\n    }\n  });\n}`,
    },
  },
});

buildSkillV3({
  name: 'jaeger',
  displayName: 'Jaeger',
  description: 'Open source, end-to-end distributed tracing.',
  categories: ['Observability'],
  learningLevel: 'advanced',
  useCases: ['Distributed Tracing', 'Performance'],
  deploymentTargets: ['kubernetes', 'docker'],
  ecosystem: 'devops',
  maintainers: ['cncf'],
  stability: 'production',
  relationships: [
    { target: 'opentelemetry', type: 'depends_on' },
    { target: 'grafana', type: 'integrates_with' },
  ],
  quickStart:
    'Jaeger receives distributed traces (usually from OpenTelemetry), stores them, and provides a UI to visualize the exact lifecycle of a request as it hops across multiple microservices.\n\n```bash\ndocker run -d -p 16686:16686 -p 4317:4317 jaegertracing/all-in-one:latest\n```',
  productionPatterns:
    "### Trace Sampling\nDo not trace 100% of your requests in production. Use probabilistic sampling (e.g., 1%) or tail-based sampling (recording 100% of errors but only 1% of successful requests) to prevent Jaeger's storage backend from imploding.",
  architecture:
    '### Storage Backends\nThe `all-in-one` Docker image uses in-memory storage and will lose data upon restart. For production, you must configure Jaeger to use a durable storage backend like Elasticsearch or Cassandra.',
  errorRecovery:
    'If the Jaeger UI is incredibly slow, it is likely due to the underlying Elasticsearch database struggling to aggregate massive trace volumes. Optimize your ES cluster and ensure you are aggressively rotating old indices.',
  securityNotes:
    "Jaeger's UI has no built-in authentication mechanism. When deploying to Kubernetes, place it behind an OAuth2 Proxy or an Ingress controller configured with strict IP whitelisting.",
  links: { 'Jaeger Docs': 'https://www.jaegertracing.io/docs/' },
  examples: {
    yaml: {
      'docker-compose': `version: '3'\nservices:\n  jaeger:\n    image: jaegertracing/all-in-one:latest\n    environment:\n      - COLLECTOR_OTLP_ENABLED=true\n    ports:\n      - "16686:16686" # UI\n      - "4317:4317" # OTLP gRPC`,
    },
  },
});

buildSkillV3({
  name: 'loki',
  displayName: 'Loki',
  description: 'Like Prometheus, but for logs.',
  categories: ['Observability'],
  learningLevel: 'intermediate',
  useCases: ['Log Aggregation'],
  deploymentTargets: ['kubernetes', 'docker'],
  ecosystem: 'devops',
  maintainers: ['grafana-labs'],
  stability: 'production',
  relationships: [
    { target: 'grafana', type: 'depends_on' },
    { target: 'prometheus', type: 'works_well_with' },
  ],
  quickStart:
    'Loki aggregates logs but, unlike Elasticsearch, it only indexes metadata labels rather than the full text of the log. This makes it insanely cheap and fast to operate.\n\n```bash\ndocker run -d -p 3100:3100 grafana/loki\n```',
  productionPatterns:
    '### LogQL vs Full Text\nDo not expect to do complex full-text fuzzy searching natively. Loki forces you to filter by labels first (e.g., `{app="backend", env="prod"}`), and then it aggressively scans the chunks of text that match those labels.',
  architecture:
    '### Promtail\nLoki requires an agent to ship logs. Promtail is the official agent. Deploy Promtail as a DaemonSet in Kubernetes to automatically scrape all pod stdout logs and forward them to the centralized Loki instance.',
  errorRecovery:
    'Loki will actively reject logs if they are sent out of chronological order (a common issue in highly distributed systems). Ensure you configure `unordered_writes: true` in your Loki configuration to mitigate this.',
  securityNotes:
    'Do not inject dynamic, unbounded user data (like session IDs or IPs) as Loki Labels. This causes Cardinality explosions, crashing the system. Log the dynamic data in the text payload, and only label static data (app name, region, environment).',
  links: { 'Loki Docs': 'https://grafana.com/docs/loki/latest/' },
  examples: {
    yaml: {
      'promtail-config': `server:\n  http_listen_port: 9080\n\npositions:\n  filename: /tmp/positions.yaml\n\nclients:\n  - url: http://loki:3100/loki/api/v1/push\n\nscrape_configs:\n- job_name: system\n  static_configs:\n  - targets:\n      - localhost\n    labels:\n      job: varlogs\n      __path__: /var/log/*log`,
    },
  },
});
