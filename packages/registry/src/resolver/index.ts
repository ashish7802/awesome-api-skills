import { RegistryClient } from '../interfaces.js';

export class RegistryResolver {
  private registries: RegistryClient[] = [];

  register(client: RegistryClient) {
    this.registries.push(client);
    this.registries.sort((a, b) => a.priority - b.priority); // Lower number = higher priority
  }

  getRegistries(): RegistryClient[] {
    return this.registries;
  }
}
