import { BuildCache } from '../interfaces.js';

export class GeneratorCache implements BuildCache {
  private hashes: Map<string, string> = new Map();

  getHash(key: string): string | null {
    return this.hashes.get(key) || null;
  }

  setHash(key: string, hash: string): void {
    this.hashes.set(key, hash);
  }

  isUnchanged(key: string, currentHash: string): boolean {
    return this.hashes.get(key) === currentHash;
  }

  clear(): void {
    this.hashes.clear();
  }
}
