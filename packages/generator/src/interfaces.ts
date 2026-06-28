import { SkillMetadata } from '@awesome-api-skills/shared-types';

export interface BuildDiagnostic {
  stage: string;
  durationMs: number;
  outputsCreated: number;
  outputsSkipped: number;
  warnings: string[];
  errors: string[];
}

export interface BuildReport {
  timestamp: number;
  totalDurationMs: number;
  diagnostics: BuildDiagnostic[];
  success: boolean;
}

export interface BuildContext {
  skills: SkillMetadata[];
  cache: BuildCache;
  graph: DependencyGraph;
  outputDir: string;
  isIncremental: boolean;
}

export interface GeneratorPlugin {
  id: string;
  name: string;
  targetStages: string[];
  dependsOn?: string[]; // plugin IDs this plugin depends on
  generate(context: BuildContext): Promise<BuildDiagnostic>;
}

export interface BuildCache {
  getHash(key: string): string | null;
  setHash(key: string, hash: string): void;
  isUnchanged(key: string, currentHash: string): boolean;
  clear(): void;
}

export interface DependencyGraph {
  addDependency(target: string, dependency: string): void;
  getDependencies(target: string): string[];
  getAffectedTargets(changedDependency: string): string[];
}
