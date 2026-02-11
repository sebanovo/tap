import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslint from '@eslint/js';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['src/generated/**'],
    extends: [js.configs.recommended, eslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      ecmaVersion: 2020,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: { js, prettier: eslintPluginPrettier },
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_+$', varsIgnorePattern: '^_+$', caughtErrorsIgnorePattern: '^_+$' },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
]);
