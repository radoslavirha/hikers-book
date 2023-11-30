require('ts-node').register({
  compilerOptions: {
    module: 'commonjs'
  }
});

module.exports = function(config) {
  require('./karma.conf.ts')(config)
};