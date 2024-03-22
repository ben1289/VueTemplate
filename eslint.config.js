import defineConfig from '@antfu/eslint-config'

export default defineConfig(
  {
    vue: true,
    typescript: true,
    formatters: {
      css: true,
      html: true,
      markdown: true,
    },
    rules: {
      'import/order': ['error', {
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      }],
      'style/brace-style': ['error', '1tbs'],
      'curly': ['off'],
      'eqeqeq': ['off'],
    },
    overrides: {
      vue: {
        'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
        'vue/eqeqeq': ['off'],
      },
      typescript: {
        'ts/prefer-ts-expect-error': 'off',
      },
    },
  },
)
