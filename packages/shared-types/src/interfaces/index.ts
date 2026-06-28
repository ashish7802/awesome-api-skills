import {
  Category,
  AgentType,
  AuthenticationType,
  RegistryType,
  SkillStatus,
  License,
} from '../enums/index.js';

/**
 * Contains metadata information for a skill.
 */
export interface SkillMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  owner?: string;
  verified?: boolean;
  official?: boolean;
  maintainer?: string;
  repository?: string;
  documentation?: string;
  support?: string;
  license: License;
  categories: Category[];
  tags: string[];
  sdkLanguages: string[];
  authType: AuthenticationType;
  supportedAgents: AgentType[];
  status?: SkillStatus;
  popularity?: number;
}

/**
 * Represents a complete Skill including its metadata and content structure.
 */
export interface Skill {
  metadata: SkillMetadata;
  content: string; // The markdown content of the SKILL.md
}

/**
 * A registry of skills.
 */
export interface Registry {
  id: string;
  name: string;
  type: RegistryType;
  url: string;
}

/**
 * An entry within a registry.
 */
export interface RegistryEntry {
  skillId: string;
  version: string;
  metadataUrl: string;
  downloadUrl: string;
}

/**
 * Plugin configuration for installer integrations.
 */
export interface InstallerPlugin {
  agentType: AgentType;
  install: (skill: Skill, destination: string) => Promise<boolean>;
}

/**
 * Plugin for custom validation logic.
 */
export interface ValidatorPlugin {
  name: string;
  validate: (skill: Skill) => Promise<boolean>;
}

/**
 * Plugin for generating outputs based on skill data.
 */
export interface GeneratorPlugin {
  name: string;
  generate: (skills: Skill[], outputDir: string) => Promise<void>;
}

/**
 * Global search index mapping.
 */
export interface SearchIndex {
  updatedAt: string;
  skills: SkillMetadata[];
}

/**
 * Result of a search query.
 */
export interface SearchResult {
  metadata: SkillMetadata;
  score: number;
}

/**
 * General manifest file format.
 */
export interface Manifest {
  name: string;
  version: string;
  registries: Registry[];
}

/**
 * Core platform configuration.
 */
export interface Config {
  defaultRegistry: string;
  registries: Registry[];
  installPath?: string;
}

/**
 * Contains results from automated benchmarking.
 */
export interface BenchmarkResult {
  metricName: string;
  value: number;
  unit: 'ms' | 's' | 'kb' | 'mb';
  timestamp: string;
}

/**
 * Representation of version compatibility.
 */
export interface VersionInfo {
  currentVersion: string;
  supportedSchemas: string[];
  deprecatedSchemas: string[];
}
