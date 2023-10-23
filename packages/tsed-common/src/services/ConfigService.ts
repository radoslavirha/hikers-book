import '@tsed/ajv';
import { $log } from '@tsed/common';
import { Type } from '@tsed/core';
import { deserialize } from '@tsed/json-mapper';
import { getJsonSchema } from '@tsed/schema';
import Ajv from 'ajv';
import cfg from 'config';
import { config } from 'dotenv';
import { sync as readPackageJsonSync } from 'read-pkg';

export const envs = {
  ...process.env,
  ...config().parsed
};

const ajv = new Ajv({ allErrors: true });

type Config<T> = {
  base: Partial<TsED.Configuration>;
  file: T;
};

export abstract class ConfigServiceBase<T> {
  private _config: Config<T>;

  public get config() {
    return this._config;
  }

  constructor(name: string, port: number, configModel: Type<T>) {
    this._config = ConfigServiceBase.load(name, port, configModel);
  }

  /**
   * Returns base server configuration and configuration from file.
   * Should be used in PlatformExpress.bootstrap() with ConfigService.getServerConfig().
   * e.g. PlatformExpress.bootstrap(Server, ConfigService.getServerConfig())
   * ConfigService.getServerConfig() method should be implemented by each API!
   */
  public static load<ConfigModel>(name: string, port: number, configModel: Type<ConfigModel>): Config<ConfigModel> {
    return {
      base: {
        ...ConfigServiceBase.getServerDefaults(),
        api: name,
        version: readPackageJsonSync().version,
        httpPort: parseInt(envs.PORT || String(port)),
        envs
      },
      file: ConfigServiceBase.validateConfigFile(cfg, configModel)
    };
  }

  /**
   * Returns default server configuration.
   * Should be used in '@Configuration' decorator with ConfigServiceBase.getServerDefaults().
   * Some of the values are necessary for testing without bootstraping the server with enhanced config.
   * This config should be extended with ENV variables and config file in PlatformExpress.bootstrap() with ConfigService.getServerConfig().
   * e.g. PlatformExpress.bootstrap(Server, ConfigService.getServerConfig())
   */
  static getServerDefaults(): Partial<TsED.Configuration> {
    return {
      httpPort: 4000,
      acceptMimes: ['application/json'],
      httpsPort: false,
      exclude: ['**/*.spec.ts'],
      disableComponentsScan: true,
      jsonMapper: {
        additionalProperties: false
      }
    };
  }

  static validateConfigFile<T>(config: cfg.IConfig, model: Type<T>): T {
    const schema = getJsonSchema(model);

    const validate = ajv.compile(schema);
    const valid = validate(deserialize<T>(config, { type: model }));

    if (!valid) {
      for (const error of validate.errors ?? []) {
        $log.error(`Config file: ${error.keyword} ${error.message}`);
      }
      throw new Error('Invalid configuration!');
    }

    return deserialize<T>(config, { type: model });
  }
}
