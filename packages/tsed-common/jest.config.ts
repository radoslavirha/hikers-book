import sharedConfig from '@hikers-book/jest/api';

export default {
  ...sharedConfig,
  coveragePathIgnorePatterns: ['index.ts']
};
