module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  plugins: [ '@stylistic' ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'max-params': ['error', 3],
    'import/no-named-as-default': 'off',
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true, allowTemplateLiterals: true }],
    '@stylistic/indent': ['error', 2, {
      'ignoredNodes': ['PropertyDefinition'],
      'SwitchCase': 1
    }]
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true
    }
  }
};