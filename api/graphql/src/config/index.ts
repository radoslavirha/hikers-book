import { readFileSync } from 'fs';
import { envs } from './envs/index';
import loggerConfig from './logger/index';
import mongooseConfig from './mongoose/index';

const pkg = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }));

export const config: Partial<TsED.Configuration> = {
  api: "Hiker's Book GraphQL API",
  version: pkg.version,
  httpPort: parseInt(envs.PORT || '5502'),
  httpsPort: false,
  envs,
  logger: loggerConfig,
  mongoose: mongooseConfig
};
