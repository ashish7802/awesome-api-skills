import { describe, it, expect } from 'vitest';
import {
  Container,
  ConfigurationManager,
  WorkspaceManager,
  RegistryManager,
  ValidationManager,
  GenerationManager,
  Workflows,
} from '../src/index.js';

describe('Core Orchestration Layer', () => {
  const container = new Container();
  const config = new ConfigurationManager({ outputDir: 'custom-dist' });
  container.register('ConfigurationManager', config);
  container.register('WorkspaceManager', new WorkspaceManager(config));
  container.register('RegistryManager', new RegistryManager());
  container.register('ValidationManager', new ValidationManager());
  container.register('GenerationManager', new GenerationManager());

  const workflows = new Workflows(container);

  it('Configuration resolution overrides defaults', () => {
    expect(config.get().outputDir).toBe('custom-dist');
    expect(config.get().telemetryEnabled).toBe(false); // Default
  });

  it('Workspace discovery orchestrates root resolving', () => {
    const wsManager = container.resolve<WorkspaceManager>('WorkspaceManager');
    const ws = wsManager.discover(process.cwd());
    expect(ws.config.outputDir).toBe('custom-dist');
    expect(ws.skillsPath).toContain('skills');
  });

  it('Workflow: validateWorkspace orchestrates ValidatorEngine safely', async () => {
    const start = performance.now();
    const { results } = await workflows.validateWorkspace(process.cwd());
    const duration = performance.now() - start;

    expect(results.length).toBe(1);
    expect(results[0].isValid).toBe(true);
    expect(duration).toBeGreaterThan(0);
  });

  it('Workflow: generateWorkspace orchestrates PipelineEngine safely', async () => {
    const start = performance.now();
    const report = await workflows.generateWorkspace(process.cwd());
    const duration = performance.now() - start;

    expect(report.success).toBe(true);
    expect(report.totalDurationMs).toBeGreaterThan(0);
    expect(duration).toBeGreaterThan(0);
  });
});
