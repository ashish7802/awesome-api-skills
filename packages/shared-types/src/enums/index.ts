/**
 * Available categories for API skills.
 */
export enum Category {
  AI = 'AI',
  Payments = 'Payments',
  Authentication = 'Authentication',
  Databases = 'Databases',
  Cloud = 'Cloud',
  Storage = 'Storage',
  Messaging = 'Messaging',
  Email = 'Email',
  Analytics = 'Analytics',
  DevOps = 'DevOps',
  CMS = 'CMS',
  CRM = 'CRM',
  Ecommerce = 'Ecommerce',
  Maps = 'Maps',
  Finance = 'Finance',
  Social = 'Social',
  Video = 'Video',
  Search = 'Search',
}

/**
 * Types of AI agents supported by the platform.
 */
export enum AgentType {
  ClaudeCode = 'claude-code',
  Cursor = 'cursor',
  CodexCLI = 'codex-cli',
  GeminiCLI = 'gemini-cli',
  Continue = 'continue',
  Cline = 'cline',
  Windsurf = 'windsurf',
  RooCode = 'roo-code',
  OpenHands = 'openhands',
  Custom = 'custom',
}

/**
 * Types of authentication required by APIs.
 */
export enum AuthenticationType {
  APIKey = 'api_key',
  OAuth2 = 'oauth2',
  Basic = 'basic',
  Bearer = 'bearer',
  None = 'none',
}

/**
 * Registry source type.
 */
export enum RegistryType {
  Official = 'official',
  Community = 'community',
  Company = 'company',
  Local = 'local',
  PrivateEnterprise = 'private_enterprise',
}

/**
 * Lifecycle status of a skill.
 */
export enum SkillStatus {
  Active = 'active',
  Deprecated = 'deprecated',
  Beta = 'beta',
}

/**
 * Supported licenses.
 */
export enum License {
  MIT = 'MIT',
  Apache2 = 'Apache-2.0',
  GPL3 = 'GPL-3.0',
  Proprietary = 'Proprietary',
}

/**
 * Operating Systems.
 */
export enum OperatingSystem {
  Windows = 'windows',
  MacOS = 'macos',
  Linux = 'linux',
  Any = 'any',
}
