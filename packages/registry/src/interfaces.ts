import { SkillMetadata } from '@awesome-api-skills/shared-types';

export interface RegistryManifest {
  registryId: string;
  registryVersion: string;
  schemaVersion: string;
  owner: string;
  verified: boolean;
  publicKey?: string;
  endpoint: string;
  updatedAt: string;
  supportedSpecification: string;
  supportedSchema: string;
  totalSkills: number;
}

export interface RegistryTrustModel {
  signature?: string;
  checksum?: string;
  publisher?: string;
  certificate?: string;
  verificationMethod?: string;
}

export interface SyncProgress {
  status: 'starting' | 'downloading' | 'indexing' | 'completed' | 'failed';
  total: number;
  current: number;
  message: string;
}

export interface RegistryClient {
  id: string;
  type: string;
  priority: number;
  getManifest(): Promise<RegistryManifest>;
  fetchSkills(since?: string): Promise<{ skills: SkillMetadata[]; trust: RegistryTrustModel }>;
}
