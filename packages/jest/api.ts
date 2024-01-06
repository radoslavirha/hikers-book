import type { Config } from '@jest/types';
import { coverage } from './coverage';

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**'
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: coverage,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.spec.ts'],
  transform: {
    '\\.(ts)$': 'ts-jest'
  }
};

export default config;
