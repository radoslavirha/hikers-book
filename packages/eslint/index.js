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
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/function-call-spacing': ['error', 'never'],
    '@stylistic/indent': ['error', 2, { ignoredNodes: ['PropertyDefinition'], SwitchCase: 1 }],
    '@stylistic/key-spacing': ['error', { beforeColon: false }],
    '@stylistic/keyword-spacing': ['error', { before: true }],
    '@stylistic/max-len': ['error', { code: 120, ignorePattern: '' }],
    '@stylistic/max-statements-per-line': ['error', { max: 1 }],
    '@stylistic/new-parens': 'error',
    '@stylistic/no-extra-semi': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/space-before-blocks': 'error',
    '@stylistic/template-curly-spacing': ['error', 'always']
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true
    }
  }
};
