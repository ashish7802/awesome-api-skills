import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'skills/**/*',
      'snapshots/**/*',
      'dist/**/*',
      '.cache/**/*',
      'scripts/**/*',
      'apps/docs/scripts/**/*',
    ],
  },
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  },
);
