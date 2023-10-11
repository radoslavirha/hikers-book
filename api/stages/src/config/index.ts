import { readFileSync } from 'fs';
import { envs } from './envs/index';
import loggerConfig from './logger/index';
import mongooseConfig from './mongoose/index';

const pkg = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }));

export const config: Partial<TsED.Configuration> = {
  api: "Hiker's Book Stages API",
  version: pkg.version,
  httpPort: parseInt(envs.PORT || '5503'),
  httpsPort: false,
  envs,
  logger: loggerConfig,
  mongoose: mongooseConfig
};
