import { EventBus, SDKEvent } from '../types/index.js';

export class DefaultEventBus implements EventBus {
  private listeners: Map<string, Array<(event: unknown) => void>> = new Map();

  emit<T extends SDKEvent>(event: T): void {
    const handlers = this.listeners.get(event.name) || [];
    handlers.forEach((h) => h(event));
  }

  on<T extends SDKEvent>(eventName: string, handler: (event: T) => void): void {
    const handlers = this.listeners.get(eventName) || [];
    handlers.push(handler as (event: unknown) => void);
    this.listeners.set(eventName, handlers);
  }
}

// Built-in Events
export const createEvent = <T>(name: string, payload: T): SDKEvent => ({
  name,
  timestamp: Date.now(),
  payload,
});
