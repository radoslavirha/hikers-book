import { Type } from '@tsed/core';
import { SwaggerSettings } from '@tsed/swagger';
import { SwaggerUIOptionsConfigModel } from '../models';
import { getServerDefaultConfig } from '../server/defaults';
import { CommonUtils } from '../utils/CommonUtils';
import { ConfigFile } from './ConfigFile';
import { ConfigSwagger, SwaggerDocConfig } from './ConfigSwagger';
import { ENVS, EnvironmentVariables } from './EnvironmentVariables';
import { PackageJson, PkgJson } from './PackageJson';

export type ConfigLoaderOptions<T = object> = {
  service: string;
  /**
   * Used when PORT env is not set
   */
  fallbackPort: number;
  configModel: Type<T>;
};

export class ConfigLoder<T> {
  readonly service: string;
  readonly fallbackPort: number;
  readonly configModel: Type<T>;

  readonly _api: { service: string; version: string; description?: string };
  readonly _config: T;
  readonly _envs: ENVS;
  readonly _packageJson: PkgJson;
  readonly _server: Partial<TsED.Configuration>;
  #swagger?: SwaggerSettings[];

  public get api() { return CommonUtils.cloneDeep(this._api); }
  public get config(): T { return CommonUtils.cloneDeep(this._config); }
  public get envs() { return CommonUtils.cloneDeep(this._envs); }
  public get packageJson() { return CommonUtils.cloneDeep(this._packageJson); }
  public get server() { return CommonUtils.cloneDeep(this._server); }
  public get swagger() { return CommonUtils.cloneDeep(this.#swagger); }
  public get isProduction() { return this.envs.NODE_ENV === 'production'; }
  public get isTest() { return this.envs.NODE_ENV === 'test'; }

  constructor(options: ConfigLoaderOptions<T>) {
    this.service = options.service;
    this.fallbackPort = options.fallbackPort;
    this.configModel = options.configModel;

    this._envs = new EnvironmentVariables().config;
    this._packageJson = new PackageJson().config;
    this._config = new ConfigFile(this.configModel).config;

    this._api = {
      service: options.service,
      version: this.packageJson.version,
      description: this.packageJson.description
    };

    this._server = {
      ...getServerDefaultConfig(),
      httpPort: parseInt(this.envs.PORT || String(this.fallbackPort)),
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
    }).config;

    return this.swagger as SwaggerSettings[];
  }
}
