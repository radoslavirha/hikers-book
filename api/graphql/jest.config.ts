import sharedConfig from '@hikers-book/jest/api';

export default {
  ...sharedConfig,
  globalTeardown: './scripts/jest/teardown.js'
};
