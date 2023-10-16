module.exports = {
  'prettier/prettier': [
    'error',
    {
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      trailingComma: 'none',
      printWidth: 120,
      htmlWhitespaceSensitivity: 'ignore',
      jsxBracketSameLine: true,
      plugins: ['prettier-plugin-organize-imports'],
      overrides: [
        {
          files: '*.html',
          options: {
            parser: 'html',
            htmlWhitespaceSensitivity: 'ignore',
            singleQuote: false
          }
        },
        {
          files: '*.component.html',
          options: {
            parser: 'angular',
            htmlWhitespaceSensitivity: 'ignore',
          }
        },
        {
          files: ['*.scss'],
          options: {
            singleQuote: false
          }
        }
      ]
    }
  ]
}