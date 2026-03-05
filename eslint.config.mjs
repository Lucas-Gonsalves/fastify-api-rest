import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  {
    ignores: ['dist/', 'node_modules/', 'knexfile.ts'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',

      // Imports
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // Backend good practices
      'no-console': 'off',
      'no-unused-expressions': 'warn',

      // Style
      'semi': ['warn', 'never'],
      'quotes': ['warn', 'single', { avoidEscape: true }],
      'indent': ['warn', 2],
      'comma-dangle': ['warn', 'always-multiline'],
      'object-curly-spacing': ['warn', 'always'],
      'arrow-parens': ['warn', 'always'],
    }
  }
]