import { Workspace } from '../interfaces.js';
import { ConfigurationManager } from './config.js';
import * as fs from 'fs';
import * as path from 'path';

export class WorkspaceManager {
  constructor(private configManager: ConfigurationManager) {}

  discover(startPath: string): Workspace {
    let current = path.resolve(startPath);
    while (true) {
      if (
        fs.existsSync(path.join(current, 'awesome-config.json')) ||
        fs.existsSync(path.join(current, 'skills'))
      ) {
        return {
          root: current,
          config: this.configManager.get(),
          skillsPath: path.join(current, 'skills'),
        };
      }
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }

    // Default to startPath if not found
    return {
      root: startPath,
      config: this.configManager.get(),
      skillsPath: path.join(startPath, 'skills'),
    };
  }
}
