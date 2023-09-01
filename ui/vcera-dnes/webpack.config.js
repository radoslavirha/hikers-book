module.exports = {
  resolve: {
    extensions: ['*', '.mjs', '.js', '.json', '.gql', '.graphql']
  },
  module: {
    rules: [ 
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      // all the other rules
    ]
  }
};