import { Skill } from '@awesome-api-skills/shared-types';

export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  apiVersion: string;
  capabilities: string[];
}

export interface LifecycleHooks {
  beforeValidate?: (context: PluginContext, skill: Skill) => Promise<void>;
  afterValidate?: (context: PluginContext, skill: Skill) => Promise<void>;
  beforeInstall?: (context: PluginContext, skill: Skill) => Promise<void>;
  afterInstall?: (context: PluginContext, skill: Skill) => Promise<void>;
  beforeGenerate?: (context: PluginContext, skills: Skill[]) => Promise<void>;
  afterGenerate?: (context: PluginContext, skills: Skill[]) => Promise<void>;
  beforeExport?: (context: PluginContext, skill: Skill) => Promise<void>;
  afterExport?: (context: PluginContext, skill: Skill) => Promise<void>;
  beforeRegistrySync?: (context: PluginContext) => Promise<void>;
  afterRegistrySync?: (context: PluginContext) => Promise<void>;
}

export interface AwesomePlugin {
  metadata: PluginMetadata;
  hooks?: LifecycleHooks;
}

export interface PluginContext {
  logger: Logger;
  events: EventBus;
}

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string | Error): void;
  debug(message: string): void;
}

export interface EventBus {
  emit<T extends SDKEvent>(event: T): void;
  on<T extends SDKEvent>(eventName: string, handler: (event: T) => void): void;
}

export interface SDKEvent {
  name: string;
  timestamp: number;
  payload: unknown;
}
