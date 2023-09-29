const prettier = require('@hikers-book/eslint-config/prettier');

module.exports = {
  root: true,
  ignorePatterns: [
    '**/*generated.ts',
    'src/index.html' // something is wrong with prettier + eslint
  ],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        '@hikers-book/eslint-config', // extend the base config
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase'
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case'
          }
        ]
      }
    },
    {
      files: ['*.html'],
      parser: '@angular-eslint/template-parser',
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
        'plugin:prettier/recommended'
      ],
      plugins: ['@angular-eslint/template'],
      rules: {
        ...prettier
      }
    }
  ]
};
