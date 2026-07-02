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

  it('should execute version command', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['version', '--json']);
    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.success).toBe(true);
    expect(parsed.data.name).toBe('awesome-api-skills');
    consoleSpy.mockRestore();
  });

  it('should execute list command', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['list', '--json']);
    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.success).toBe(true);
    expect(parsed.data.total).toBeGreaterThan(0);
    consoleSpy.mockRestore();
  });

  it('should execute registry command', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['registry', '--json']);
    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.success).toBe(true);
    expect(parsed.data.status).toBe('active');
    consoleSpy.mockRestore();
  });

  it('should execute benchmark command', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['benchmark', '--json']);
    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.success).toBe(true);
    expect(parsed.data.iterations).toBe(10);
    consoleSpy.mockRestore();
  });

  it('should execute cache status and clear command', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['cache', 'status', '--json']);
    const outputStatus = consoleSpy.mock.calls[0][0];
    const parsedStatus = JSON.parse(outputStatus);
    expect(parsedStatus.success).toBe(true);
    expect(parsedStatus.data.action).toBe('status');

    await main(['cache', 'clear', '--json']);
    const outputClear = consoleSpy.mock.calls[1][0];
    const parsedClear = JSON.parse(outputClear);
    expect(parsedClear.success).toBe(true);
    expect(parsedClear.data.action).toBe('clear');

    consoleSpy.mockRestore();
  });

  it('should execute config command', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main(['config', 'list', '--json']);
    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);
    expect(parsed.success).toBe(true);
    expect(parsed.data.action).toBe('list');
    consoleSpy.mockRestore();
  });
});
