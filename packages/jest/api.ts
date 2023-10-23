import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**'
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'node',
  testMatch: ['**/src/**/__tests__/**/*.[jt]s?(x)', '**/src/**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '\\.(ts)$': 'ts-jest'
  }
};

export default config;