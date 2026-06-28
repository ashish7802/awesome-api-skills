import { Workspace } from '../interfaces.js';
import { ConfigurationManager } from './config.js';
import * as fs from 'fs';
import * as path from 'path';

export class WorkspaceManager {
  constructor(private configManager: ConfigurationManager) {}

  discover(startPath: string): Workspace {
    let current = startPath;
    while (current !== path.parse(current).root) {
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
      current = path.dirname(current);
    }

    // Default to startPath if not found
    return {
      root: startPath,
      config: this.configManager.get(),
      skillsPath: path.join(startPath, 'skills'),
    };
  }
}
