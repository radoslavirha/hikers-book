import sharedConfig from '@hikers-book/config-jest/api';

export default {
  ...sharedConfig,
  globalTeardown: './scripts/jest/teardown.js'
};
