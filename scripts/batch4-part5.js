const { buildSkillV4 } = require('./build-skill-v4');

buildSkillV4({
  name: 'kafka',
  displayName: 'Apache Kafka',
  description: 'Distributed event streaming platform.',
  categories: ['Messaging', 'Enterprise'],
  learningLevel: 'advanced',
  useCases: ['Event Sourcing', 'High Throughput Data Pipelines'],
  deploymentTargets: ['aws', 'gcp', 'kubernetes'],
  ecosystem: 'infrastructure',
  maintainers: ['apache'],
  stability: 'production',
  relationships: [
    { target: 'rabbitmq', type: 'alternative_to' },
    { target: 'redis-streams', type: 'alternative_to' },
  ],
  quickStart:
    'Kafka is not a queue; it is a distributed, append-only log. It excels at handling massive event streams (like clickstreams or IoT telemetry) by distributing partitions across a cluster.\n\n```bash\ndocker run -p 9092:9092 apache/kafka:latest\n```',
  productionPatterns:
    '### Consumer Groups and Partitions\nKafka guarantees message ordering *only within a single partition*. To scale out, you must increase the number of partitions for a topic. The maximum number of concurrent consumers in a group is strictly equal to the number of partitions.',
  architecture:
    '### Log Retention\nUnlike RabbitMQ where messages are deleted once consumed, Kafka retains messages on disk based on a retention policy (e.g., 7 days or 100GB). This allows new consumer groups to replay the entire history of events from the beginning.',
  errorRecovery:
    "If a consumer is too slow, Kafka will trigger a 'rebalance', pausing message processing for the entire group. Ensure your consumer's `max.poll.interval.ms` is tuned properly, and keep processing logic completely asynchronous from the polling loop.",
  securityNotes:
    'Enable SASL/SCRAM for client authentication and TLS for in-transit encryption. Kafka without security is completely open to the network.',
  links: { 'Kafka Docs': 'https://kafka.apache.org/documentation/' },
  examples: {
    yaml: {
      'docker-compose': `version: '2'\nservices:\n  kafka:\n    image: bitnami/kafka:latest\n    environment:\n      - KAFKA_ENABLE_KRAFT=yes\n      - KAFKA_CFG_PROCESS_ROLES=broker,controller\n      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER\n      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093`,
    },
  },
});

buildSkillV4({
  name: 'biome',
  displayName: 'Biome',
  description: 'One toolchain for your web project.',
  categories: ['Developer Tools'],
  learningLevel: 'beginner',
  useCases: ['Linting', 'Formatting'],
  deploymentTargets: ['any'],
  ecosystem: 'javascript',
  maintainers: ['biomejs'],
  stability: 'production',
  relationships: [
    { target: 'eslint', type: 'replaces' },
    { target: 'prettier', type: 'replaces' },
    { target: 'typescript', type: 'works_well_with' },
  ],
  quickStart:
    'Biome is a high-performance toolchain written in Rust that completely replaces ESLint and Prettier. It formats and lints code in milliseconds.\n\n```bash\nnpm install --save-dev --save-exact @biomejs/biome\nnpx @biomejs/biome init\n```',
  productionPatterns:
    '### CI Pipeline Integration\nReplace slow `npm run lint` and `npm run format:check` steps in your GitHub Actions with `npx @biomejs/biome ci .`. It runs both formatting and linting concurrently in a fraction of a second.',
  architecture:
    '### Rust Native\nBecause Biome is a compiled Rust binary, it completely bypasses the V8 Node.js runtime overhead, resulting in 35x faster execution times compared to standard JS-based tooling.',
  errorRecovery:
    "If Biome conflicts with your IDE's built-in TypeScript formatter, ensure you have the official Biome extension installed and set it as the default formatter in `.vscode/settings.json`.",
  securityNotes:
    'Biome does not execute third-party plugins (unlike ESLint). This eliminates the supply chain attack vector of malicious linting rules stealing environment variables during the build process.',
  links: { 'Biome Docs': 'https://biomejs.dev/' },
  examples: {
    json: {
      'biome.json': `{\n  "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",\n  "formatter": {\n    "enabled": true,\n    "formatWithErrors": false,\n    "indentStyle": "space",\n    "indentWidth": 2,\n    "lineWidth": 100\n  },\n  "linter": {\n    "enabled": true,\n    "rules": {\n      "recommended": true\n    }\n  }\n}`,
    },
  },
});

buildSkillV4({
  name: 'eslint',
  displayName: 'ESLint',
  description: 'Find and fix problems in your JavaScript code.',
  categories: ['Developer Tools'],
  learningLevel: 'beginner',
  useCases: ['Linting'],
  deploymentTargets: ['any'],
  ecosystem: 'javascript',
  maintainers: ['eslint'],
  stability: 'production',
  relationships: [
    { target: 'biome', type: 'alternative_to' },
    { target: 'prettier', type: 'works_well_with' },
    { target: 'typescript', type: 'works_well_with' },
  ],
  quickStart:
    'ESLint statically analyzes your code to quickly find problems. It is highly extensible via plugins.\n\n```bash\nnpm init @eslint/config@latest\n```',
  productionPatterns:
    '### Flat Config\nESLint v9 exclusively uses the new Flat Config system (`eslint.config.js`). It drops the complex cascading `.eslintrc` files in favor of a single array of configuration objects.',
  architecture:
    '### AST Parsing\nESLint parses JavaScript into an Abstract Syntax Tree (AST) and evaluates rules against it. When using TypeScript, you must configure `@typescript-eslint/parser` to allow ESLint to understand TS-specific syntax.',
  errorRecovery:
    'If linting becomes extremely slow, it is usually due to rules that require type information. Run type-aware linting only in CI, and disable those specific rules for your local IDE experience if the project is massive.',
  securityNotes:
    'Use `eslint-plugin-security` to detect potential vulnerabilities like Regex Denial of Service (ReDoS) or `eval()` usage directly in your source code.',
  links: { 'ESLint Docs': 'https://eslint.org/docs/latest/' },
  examples: {
    javascript: {
      'eslint.config.js': `import js from "@eslint/js";\nimport tseslint from "typescript-eslint";\n\nexport default [\n  js.configs.recommended,\n  ...tseslint.configs.recommended,\n  {\n    rules: {\n      "no-unused-vars": "error",\n      "no-undef": "off"\n    }\n  }\n];`,
    },
  },
});

buildSkillV4({
  name: 'prettier',
  displayName: 'Prettier',
  description: 'Opinionated Code Formatter.',
  categories: ['Developer Tools'],
  learningLevel: 'beginner',
  useCases: ['Formatting'],
  deploymentTargets: ['any'],
  ecosystem: 'javascript',
  maintainers: ['prettier'],
  stability: 'production',
  relationships: [
    { target: 'eslint', type: 'works_well_with' },
    { target: 'biome', type: 'alternative_to' },
  ],
  quickStart:
    'Prettier enforces a consistent code style across your entire codebase by parsing code and re-printing it with its own rules.\n\n```bash\nnpm install --save-dev --save-exact prettier\n```',
  productionPatterns:
    '### Formatting on Save\nDo not rely on developers remembering to run the CLI. Integrate Prettier into VSCode (`formatOnSave: true`) and enforce it at the repository level using Husky and lint-staged.',
  architecture:
    '### Opinionated by Design\nPrettier explicitly lacks configuration options. This is a feature, not a bug. It ends bikeshedding over code style in pull requests instantly.',
  errorRecovery:
    'If Prettier conflicts with ESLint (causing the code to flip back and forth on save), you MUST use `eslint-config-prettier` to turn off all ESLint rules that are unnecessary or might conflict with Prettier.',
  securityNotes:
    'Prettier has no significant security footprint as it only transforms ASTs. Ensure you are locking the exact version in `package.json` to prevent arbitrary formatting changes across the team.',
  links: { 'Prettier Docs': 'https://prettier.io/docs/en/' },
  examples: {
    json: {
      '.prettierrc': `{\n  "trailingComma": "es5",\n  "tabWidth": 2,\n  "semi": true,\n  "singleQuote": true\n}`,
    },
  },
});

buildSkillV4({
  name: 'turborepo',
  displayName: 'TurboRepo',
  description: 'High-performance build system for JavaScript and TypeScript codebases.',
  categories: ['Developer Tools'],
  learningLevel: 'intermediate',
  useCases: ['Monorepo', 'Build System'],
  deploymentTargets: ['vercel'],
  ecosystem: 'javascript',
  maintainers: ['vercel'],
  stability: 'production',
  relationships: [
    { target: 'nextjs', type: 'works_well_with' },
    { target: 'github-actions', type: 'integrates_with' },
  ],
  quickStart:
    'TurboRepo is a build system for monorepos. It caches the output of tasks (like `build` or `test`) locally and remotely, meaning you never compile the same code twice.\n\n```bash\nnpx create-turbo@latest\n```',
  productionPatterns:
    '### Remote Caching\nThe true power of TurboRepo unlocks when you enable Remote Caching (via Vercel or a custom server). If Developer A builds the `ui` package on their laptop, Developer B instantly downloads the cached build rather than compiling it.',
  architecture:
    '### Task Graph\nTurboRepo reads your `turbo.json` pipeline to understand dependencies. For example, it knows `apps/web:build` depends on `packages/ui:build`, and it orchestrates these tasks across maximum CPU cores automatically.',
  errorRecovery:
    "If the cache behaves weirdly (e.g., passing tests that should fail), it means your cache inputs (like environment variables) aren't strictly defined. Ensure all required env vars are listed in `dependsOn` in `turbo.json`.",
  securityNotes:
    'Never cache tasks that inject sensitive secrets into build artifacts unless you are absolutely sure who has read access to your Remote Cache.',
  links: { 'TurboRepo Docs': 'https://turbo.build/repo/docs' },
  examples: {
    json: {
      'turbo.json': `{\n  "$schema": "https://turbo.build/schema.json",\n  "pipeline": {\n    "build": {\n      "dependsOn": ["^build"],\n      "outputs": [".next/**", "dist/**"]\n    },\n    "test": {\n      "dependsOn": ["build"]\n    },\n    "dev": {\n      "cache": false,\n      "persistent": true\n    }\n  }\n}`,
    },
  },
});
