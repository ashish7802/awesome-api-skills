export interface Configuration {
  registryUrls: string[];
  outputDir: string;
  cacheDir: string;
  telemetryEnabled: boolean;
}

export interface Workspace {
  root: string;
  config: Configuration;
  skillsPath: string;
}

export interface TelemetryEvent {
  name: string;
  timestamp: number;
  properties?: Record<string, unknown>;
}

export interface TelemetryHandler {
  track(event: TelemetryEvent): void;
}
