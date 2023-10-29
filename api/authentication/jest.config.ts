import sharedConfig from '@hikers-book/jest/api';

export default {
  ...sharedConfig,
  globalTeardown: './scripts/jest/teardown.js',
  coveragePathIgnorePatterns: [
    'index.ts' // all the barrels files
  ]
};
