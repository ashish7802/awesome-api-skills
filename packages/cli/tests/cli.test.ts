import { describe, it, expect, vi } from 'vitest';
import { main } from '../src/index.js';

describe('CLI Router', () => {
  it('should parse arguments and route to help command', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['help']);
    expect(consoleSpy).toHaveBeenCalled();
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain('Awesome API Skills CLI');
    consoleSpy.mockRestore();
  });

  it('should route to doctor command', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['doctor', '--json']);
    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.success).toBe(true);
    expect(parsed.data.status).toBe('healthy');
    consoleSpy.mockRestore();
  });

  it('should format errors via the renderer', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => {
      /* noop */
    }) as never);

    await main(['search', '--json']); // Missing search term throws
    const output = errorSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);

    expect(parsed.success).toBe(false);
    expect(parsed.probableCause).toContain('Search term is required');

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it('should execute search command with matching results', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['search', 'stripe', '--json']);
    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.success).toBe(true);
    expect(parsed.data.query).toBe('stripe');
    expect(Array.isArray(parsed.data.results)).toBe(true);
    expect(parsed.data.results.length).toBeGreaterThan(0);
    expect(parsed.data.results[0].id).toBe('stripe');
    consoleSpy.mockRestore();
  });

  it('should execute completion command and generate shell scripts', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['completion', 'bash']);
    expect(consoleSpy).toHaveBeenCalled();
    const output = consoleSpy.mock.calls[0][0];
    expect(output).toContain('# Completion script for bash generated');
    consoleSpy.mockRestore();
  });

  it('should execute validate command', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['validate', '--json']);
    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.success).toBe(true);
    expect(parsed.data.valid).toBe(true);
    consoleSpy.mockRestore();
  });
});
