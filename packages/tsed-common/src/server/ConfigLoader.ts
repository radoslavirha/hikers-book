import { $log } from '@tsed/common';
import { Type } from '@tsed/core';
import { deserialize } from '@tsed/json-mapper';
import { getJsonSchema } from '@tsed/schema';
import Ajv from 'ajv';
import cfg from 'config';
import { config } from 'dotenv';
import { sync as readPackageJsonSync } from 'read-pkg';

interface ENVS<TValue = string | undefined> {
  [key: string]: TValue;
}

const ajv = new Ajv({ allErrors: true });

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

    this._config = this.validateConfigFile();

    this._envs = {
      ...process.env,
      ...config().parsed
    };

    this._server = {
      ...getServerDefaults(),
      httpPort: parseInt(this.envs.PORT || String(this.port)),
      envs: this.envs
    };
  }

  private validateConfigFile<T>(): T {
    const schema = getJsonSchema(this.configModel);
    const config = cfg;

    const validate = ajv.compile(schema);
    const valid = validate(deserialize<T>(config, { type: this.configModel }));

    if (!valid) {
      for (const error of validate.errors ?? []) {
        $log.error(`Config file: ${error.keyword} ${error.message}`);
      }
      throw new Error('Invalid configuration!');
    }

    return deserialize<T>(config, { type: this.configModel });
  }
}
