const prettier = require('./prettier');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended' // must be last
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    ...prettier,
    'max-params': ['error', 3],
    'import/no-named-as-default': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true
    }
  }
};