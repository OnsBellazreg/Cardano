const { resolve } = require('node:path');

const pluginJs = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const noRelativeImport = require('eslint-plugin-no-relative-import-paths');
const prettierPrettier = require('eslint-plugin-prettier');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const globals = require('globals');
const pluginTs = require('typescript-eslint');

module.exports = [
  { ignores: ['node_modules/*', 'dist/*', 'build/*'] },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      'no-relative-import-paths': noRelativeImport,
      prettier: prettierPrettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': ['error', { usePrettierrc: true }],
      ...prettierConfig.rules,
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowSameFolder: true,
          rootDir: 'src',
          prefix: '@',
        },
      ],
      'simple-import-sort/imports': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'import/extensions': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'nonblock-statement-body-position': 'off',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx'],
      },
      'import/resolver': {
        node: true,
        typescript: {
          project: [resolve(process.cwd(), 'tsconfig.json')],
        },
      },
    },
  },
];
