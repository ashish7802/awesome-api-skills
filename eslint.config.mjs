import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'skills/**/*',
      'snapshots/**/*',
      'dist/**/*',
      '.cache/**/*',
      'scripts/**/*',
      'apps/docs/scripts/**/*',
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
