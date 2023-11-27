import sharedConfig from '@hikers-book/jest/api';

export default {
  ...sharedConfig,
  globalTeardown: './scripts/jest/teardown.js',
  coveragePathIgnorePatterns: [
    'index.ts', // all the barrels files
    'src/test'
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  }
};
