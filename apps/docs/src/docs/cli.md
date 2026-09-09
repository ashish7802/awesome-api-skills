# CLI Reference

Search, validate, and inspect skills locally using the built-in CLI.

## Build the CLI

```bash
npm run build:packages
```

## Commands

### Search Skills

Search skills by API name, category, or keyword:

```bash
node packages/cli/dist/bin.js search stripe
node packages/cli/dist/bin.js search database --json
```

### Doctor & Environment Health

Inspect local workspace setup, skills coverage, and build integrity:

```bash
node packages/cli/dist/bin.js doctor
```

### Validate Skills

Run structural, schema, and trust verification across all `skills/*` packages:

```bash
node packages/cli/dist/bin.js validate
```

### Real-Time Performance Benchmark

Measure real loading throughput, validation rules, graph traversal, and query speed:

```bash
npm run benchmark
```

