import { Container } from '../di/index.js';
import { WorkspaceManager } from '../services/workspace.js';
import { RegistryManager } from '../services/registry.js';
import { ValidationManager } from '../services/validation.js';
import { GenerationManager } from '../services/generation.js';
import { SkillMetadata, License, AuthenticationType } from '@awesome-api-skills/shared-types';

export class Workflows {
  constructor(private container: Container) {}

  async validateWorkspace(cwd: string) {
    const wsManager = this.container.resolve<WorkspaceManager>('WorkspaceManager');
    const validator = this.container.resolve<ValidationManager>('ValidationManager');

    const ws = wsManager.discover(cwd);

    // Mocked skill loading for orchestration
    const mockSkill: SkillMetadata = {
      id: 'test',
      name: 'test',
      description: '',
      version: '1.0',
      license: License.MIT,
      categories: [],
      tags: [],
      sdkLanguages: [],
      authType: AuthenticationType.None,
      supportedAgents: [],
    };

    const results = await validator.validate([{ path: ws.skillsPath, metadata: mockSkill }]);
    return { workspace: ws, results };
  }

  async generateWorkspace(cwd: string) {
    const wsManager = this.container.resolve<WorkspaceManager>('WorkspaceManager');
    const generator = this.container.resolve<GenerationManager>('GenerationManager');

    const ws = wsManager.discover(cwd);

    const mockSkill: SkillMetadata = {
      id: 'test',
      name: 'test',
      description: '',
      version: '1.0',
      license: License.MIT,
      categories: [],
      tags: [],
      sdkLanguages: [],
      authType: AuthenticationType.None,
      supportedAgents: [],
    };

    const report = await generator.generate([mockSkill], ws.config.outputDir);
    return report;
  }

  async syncRegistries(cwd: string) {
    const wsManager = this.container.resolve<WorkspaceManager>('WorkspaceManager');
    const registry = this.container.resolve<RegistryManager>('RegistryManager');

    const ws = wsManager.discover(cwd);
    await registry.syncAll(ws.config.registryUrls);
    return true;
  }
}
