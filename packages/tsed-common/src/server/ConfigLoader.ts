import { Type } from '@tsed/core';
import { SwaggerSettings } from '@tsed/swagger';
import { SwaggerUIOptionsConfigModel } from '../models';
import { SwaggerDocConfig } from '../types';
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

  readonly _api: { service: string; version: string; description?: string };
  readonly _config: T;
  readonly _envs: ENVS;
  readonly _packageJson: PackageJson;
  readonly _server: Partial<TsED.Configuration>;
  #swagger?: SwaggerSettings[];

  public get api() {
    return Object.assign({}, this._api);
  }

  public get config(): T {
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
    return this.#swagger;
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
      version: this.packageJson.version,
      description: this.packageJson.description
    };

    this._config = new ConfigFileLoader(this.configModel).config;
    this._envs = new EnvLoader().envs;

    this._server = {
      ...getServerDefaultConfig(),
      httpPort: parseInt(this.envs.PORT || String(this.port)),
      envs: this.envs
    };
  }

  /**
   * Called only from index.ts building server, result won't be in configservice
   */
  public buildSwagger(documents: SwaggerDocConfig[], swaggerUIOptions: SwaggerUIOptionsConfigModel): SwaggerSettings[] {
    this.#swagger = new ConfigSwagger({
      title: this._api.service,
      version: this._api.version,
      description: this.packageJson.description,
      documents,
      swaggerUIOptions
    }).settings;

    return this.#swagger;
  }
}
