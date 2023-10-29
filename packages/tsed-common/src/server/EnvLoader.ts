import { config } from 'dotenv';

export interface ENVS<TValue = string | undefined> {
  [key: string]: TValue;
}

export class EnvLoader {
  readonly _envs: ENVS;

  public get envs() {
    return Object.assign({}, this._envs);
  }

  constructor() {
    this._envs = {
      ...process.env,
      ...config().parsed
    };
  }
}
