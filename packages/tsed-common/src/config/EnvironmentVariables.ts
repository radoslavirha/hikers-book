import { config } from 'dotenv';
import { BaseConfig } from './BaseConfig';

export interface ENVS<TValue = string | undefined> {
  [key: string]: TValue;
}

export class EnvironmentVariables extends BaseConfig<ENVS> {
  constructor() {
    super({
      ...process.env,
      ...config().parsed
    });
  }
}
