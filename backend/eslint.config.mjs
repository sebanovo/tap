import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslint from '@eslint/js';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['src/generated'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: { js },
  },
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
    },
  },
  {
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_+$', varsIgnorePattern: '^_+$', caughtErrorsIgnorePattern: '^_+$' },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
]);
