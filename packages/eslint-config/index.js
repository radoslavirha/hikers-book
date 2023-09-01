module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended' // must be last
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        trailingComma: 'none',
        printWidth: 120
      }
    ],
    'import/no-named-as-default': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: true,
      node: true
    }
  }
};