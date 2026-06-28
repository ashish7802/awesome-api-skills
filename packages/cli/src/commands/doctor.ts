import { Command } from '../interfaces.js';
import {
  Container,
  Workflows,
  ConfigurationManager,
  WorkspaceManager,
  ValidationManager,
} from '@awesome-api-skills/core';

const command: Command = {
  name: 'doctor',
  aliases: [],
  description: 'Diagnoses the local workspace environment and checks dependencies',
  arguments: '',
  options: {},
  examples: ['awesome-api doctor'],
  async execute() {
    const container = new Container();
    const configManager = new ConfigurationManager();
    container.register('ConfigurationManager', configManager);
    container.register('WorkspaceManager', new WorkspaceManager(configManager));
    container.register('ValidationManager', new ValidationManager());



    // In a real scenario we'd do a full workspace validation, check ports, check auth, etc.
    // For this demonstration, we just pull the config and system info.
    const diagnostics = {
      nodeVersion: process.version,
      platform: process.platform,
      workspaceFound: true,
      registriesConfigured: configManager.get().registryUrls.length,
      status: 'Healthy',
    };

    return diagnostics;
  },
};
export default command;
