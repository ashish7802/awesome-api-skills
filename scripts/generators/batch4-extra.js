const { buildSkillV4 } = require('./build-skill-v4');

buildSkillV4({
  name: 'vitest',
  displayName: 'Vitest',
  description: 'Next generation testing framework powered by Vite.',
  categories: ['Testing', 'Developer Tools'],
  learningLevel: 'beginner',
  useCases: ['Unit Testing'],
  deploymentTargets: ['any'],
  ecosystem: 'javascript',
  maintainers: ['vitest'],
  stability: 'production',
  relationships: [
    { target: 'playwright', type: 'works_well_with' },
    { target: 'react', type: 'works_well_with' },
  ],
  quickStart:
    'Vitest is a blazing fast unit test framework powered by Vite. It is a drop-in replacement for Jest but significantly faster as it shares the same configuration and transformation pipeline as Vite.\n\n```bash\nnpm install -D vitest\n```',
  productionPatterns:
    '### Setup Files\nInstead of importing `beforeEach` and `describe` manually in every test file, you can enable `globals: true` in your `vitest.config.ts`. Use a `setupFiles` array to mock global browser APIs (like `fetch` or `localStorage`) before any tests run.',
  architecture:
    '### Worker Threads\nVitest runs tests in isolated worker threads. This prevents global state mutations in one test from leaking and corrupting another test. This parallel execution is why Vitest is so fast.',
  errorRecovery:
    'If tests randomly timeout in CI but pass locally, it is likely because your CI pipeline has significantly fewer CPU cores than your M-series MacBook. Use `poolOptions: { threads: { maxThreads: 2 } }` in CI to prevent thrashing.',
  securityNotes:
    'Tests often require API keys. Never commit real API keys to `.env.test`. Always use `msw` (Mock Service Worker) to intercept network requests at the network level and return stubbed JSON responses, guaranteeing your test suite never hits real infrastructure.',
  links: { 'Vitest Docs': 'https://vitest.dev/guide/' },
  examples: {
    typescript: {
      test: `import { expect, test, vi } from 'vitest'\n\ntest('mocks fetch', async () => {\n  const spy = vi.spyOn(global, 'fetch').mockResolvedValue(new Response('OK'))\n  const res = await fetch('https://example.com')\n  expect(await res.text()).toBe('OK')\n  expect(spy).toHaveBeenCalledTimes(1)\n})`,
    },
  },
});
