export class Container {
  private instances = new Map<string, unknown>();

  register<T>(key: string, instance: T) {
    this.instances.set(key, instance);
  }

  resolve<T>(key: string): T {
    const instance = this.instances.get(key);
    if (!instance) throw new Error(`Dependency not found: ${key}`);
    return instance as T;
  }
}
