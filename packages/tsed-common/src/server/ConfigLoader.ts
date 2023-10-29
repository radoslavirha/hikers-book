import { Type } from '@tsed/core';
import { sync as readPackageJsonSync } from 'read-pkg';
import { ConfigFileLoader } from './ConfigFileLoader';
import { ENVS, EnvLoader } from './EnvLoader';

/**
 * Returns default server configuration.
 */
export const getServerDefaults = (): Partial<TsED.Configuration> => ({
  httpPort: 4000,
  acceptMimes: ['application/json'],
  httpsPort: false,
  exclude: ['**/*.spec.ts'],
  disableComponentsScan: true,
  jsonMapper: {
    additionalProperties: false
  }
});

export class ConfigLoder<T> {
  readonly service: string;
  readonly port: number;
  readonly configModel: Type<T>;

  readonly _api: { service: string; version: string };
  readonly _config: T;
  readonly _envs: ENVS;
  readonly _server: Partial<TsED.Configuration>;

  public get api() {
    return Object.assign({}, this._api);
  }

  public get config() {
    return Object.assign({}, this._config);
  }

  public get envs() {
    return Object.assign({}, this._envs);
  }

  public get isProduction() {
    return this.envs.NODE_ENV === 'production';
  }

  public get server() {
    return Object.assign({}, this._server);
  }

  constructor(service: string, port: number, configModel: Type<T>) {
    this.service = service;
    this.port = port;
    this.configModel = configModel;

    this._api = {
      service: service,
      version: readPackageJsonSync().version
    };

    this._config = new ConfigFileLoader(this.configModel).config;
    this._envs = new EnvLoader().envs;

    this._server = {
      ...getServerDefaults(),
      httpPort: parseInt(this.envs.PORT || String(this.port)),
      envs: this.envs
    };
  }
}
