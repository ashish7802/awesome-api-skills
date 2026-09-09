# SDK Guide

The `@awesome-api-skills/sdk` package provides core programmatic access for embedding skill management, lifecycle hooks, and plugin events into custom developer tooling.

## Installation & Import

```typescript
import { SDKCore, DefaultLogger, DefaultEventBus } from '@awesome-api-skills/sdk';

const sdk = new SDKCore();

// Listen to lifecycle events
sdk.events.on('PluginLoaded', (event) => {
  console.log(`Loaded skill plugin: ${event.data.name}`);
});
```

## Architecture

- **`SDKCore`**: Central coordinator managing plugin lifecycles, configuration, and event dispatching.
- **`DefaultEventBus`**: Typed event emitter for tracking load, validation, and execution events.
- **`LifecycleManager`**: Controls plugin registration, initialization hooks, and version compatibility checks.
- **`RegistryClient`**: Client for querying local or remote skill manifests and relationship graphs.

