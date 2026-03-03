import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  {
    ignores: ['dist/', 'node_modules/'],
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
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Backend good practices
      'no-console': 'off',
      'no-unused-expressions': 'warn',

      // Style
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'always'],
    }
  }
]