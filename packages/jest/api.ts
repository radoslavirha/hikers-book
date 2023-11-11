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
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.spec.ts'],
  transform: {
    '\\.(ts)$': 'ts-jest'
  }
};

export default config;