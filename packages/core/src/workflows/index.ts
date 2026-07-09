import { Container } from '../di/index.js';
import { WorkspaceManager } from '../services/workspace.js';
import { RegistryManager } from '../services/registry.js';
import { ValidationManager } from '../services/validation.js';
import { GenerationManager } from '../services/generation.js';
import { SkillMetadata } from '@awesome-api-skills/shared-types';
import fs from 'fs';
import path from 'path';

export class Workflows {
  constructor(private container: Container) {}

  private loadRealSkills(skillsPath: string): { path: string; metadata: SkillMetadata }[] {
    if (!fs.existsSync(skillsPath)) return [];
    const skillFolders = fs.readdirSync(skillsPath)
      .filter((f) => fs.statSync(path.join(skillsPath, f)).isDirectory());

    const list: { path: string; metadata: SkillMetadata }[] = [];
    for (const folder of skillFolders) {
      const folderPath = path.join(skillsPath, folder);
      const metaPath = path.join(folderPath, 'metadata.json');
      if (fs.existsSync(metaPath)) {
        try {
          const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
          list.push({ path: folderPath, metadata });
        } catch {
          // ignore or parse empty
        }
      }
    }
    return list;
  }

  async validateWorkspace(cwd: string) {
    const wsManager = this.container.resolve<WorkspaceManager>('WorkspaceManager');
    const validator = this.container.resolve<ValidationManager>('ValidationManager');

    const ws = wsManager.discover(cwd);
    const realSkills = this.loadRealSkills(ws.skillsPath);

    const results = await validator.validate(realSkills);
    return { workspace: ws, results };
  }

  async generateWorkspace(cwd: string) {
    const wsManager = this.container.resolve<WorkspaceManager>('WorkspaceManager');
    const generator = this.container.resolve<GenerationManager>('GenerationManager');

    const ws = wsManager.discover(cwd);
    const realSkills = this.loadRealSkills(ws.skillsPath).map((s) => s.metadata);

    const report = await generator.generate(realSkills, ws.config.outputDir);
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

