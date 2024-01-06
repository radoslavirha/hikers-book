module.exports = {
  root: true,
  ignorePatterns: [
    '**/*generated.ts',
    'src/app/api',
    'src/index.html'
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
        '@angular-eslint/component-class-suffix': [ "error" ],
        '@angular-eslint/component-selector': [ 'error',  { type: 'element', prefix: 'app', style: 'kebab-case' } ],
        '@angular-eslint/directive-class-suffix': [ "error" ],
        '@angular-eslint/directive-selector': [ 'error', { type: 'attribute', prefix: 'app', style: 'camelCase' } ],
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
        "@angular-eslint/template/attributes-order": [ "error" ]
      }
    },
    {
      files: ['*.scss'],
      parser: '@angular-eslint/template-parser',
      extends: [ 'plugin:prettier/recommended' ]
    }
  ]
};
