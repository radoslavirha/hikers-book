import { Type } from '@tsed/core';
import { SwaggerSettings } from '@tsed/swagger';
import { ConfigLoaderOptions } from '../types/ConfigLoaderOptions';
import { ConfigFileLoader } from './ConfigFileLoader';
import { ConfigSwagger } from './ConfigSwagger';
import { ENVS, EnvLoader } from './EnvLoader';
import { PackageJson, PackageJsonLoader } from './PackageJsonLoader';
import { getServerDefaultConfig } from './defaults';

export class ConfigLoder<T> {
  readonly service: string;
  readonly port: number;
  readonly configModel: Type<T>;

  readonly _api: { service: string; version: string };
  readonly _config: T;
  readonly _envs: ENVS;
  readonly _packageJson: PackageJson;
  readonly _server: Partial<TsED.Configuration>;
  readonly _swagger: SwaggerSettings[];

  public get api() {
    return Object.assign({}, this._api);
  }

  public get config() {
    return Object.assign({}, this._config);
  }

  public get envs() {
    return Object.assign({}, this._envs);
  }

  public get packageJson() {
    return Object.assign({}, this._packageJson);
  }

  public get server() {
    return Object.assign({}, this._server);
  }

  public get swagger() {
    return this._swagger;
  }

  public get isProduction() {
    return this.envs.NODE_ENV === 'production';
  }

  public get isTest() {
    return this.envs.NODE_ENV === 'test';
  }

  constructor(options: ConfigLoaderOptions<T>) {
    this.service = options.service;
    this.port = options.port;
    this.configModel = options.configModel;

    this._packageJson = new PackageJsonLoader().packageJson;

    this._api = {
      service: options.service,
      version: this.packageJson.version
    };

    this._config = new ConfigFileLoader(this.configModel).config;
    this._envs = new EnvLoader().envs;

    this._server = {
      ...getServerDefaultConfig(),
      httpPort: parseInt(this.envs.PORT || String(this.port)),
      envs: this.envs
    };

    // istanbul ignore next
    this._swagger = new ConfigSwagger({
      title: options.service,
      version: this.packageJson.version,
      description: this.packageJson.description ?? '',
      generateDocs: options.generateDocs ?? []
    }).settings;
  }
}
