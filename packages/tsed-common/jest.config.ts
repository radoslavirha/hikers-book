import sharedConfig from '@hikers-book/jest/api';

export default {
  ...sharedConfig,
  coveragePathIgnorePatterns: [
    'index.ts', // all the barrels files
    'src/models',
    'src/server/defaults.ts'
  ]
};
