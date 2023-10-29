import { $log } from '@tsed/common';
import { Type } from '@tsed/core';
import { deserialize } from '@tsed/json-mapper';
import { getJsonSchema } from '@tsed/schema';
import Ajv from 'ajv';
import cfg from 'config';

const ajv = new Ajv({ allErrors: true });

export class ConfigFileLoader<T> {
  readonly _config: T;

  public get config() {
    return Object.assign({}, this._config);
  }

  constructor(configModel: Type<T>) {
    this._config = this.validateConfigFile(configModel);
  }

  private validateConfigFile<T>(configModel: Type<T>): T {
    const schema = getJsonSchema(configModel);
    const config = cfg;

    const validate = ajv.compile(schema);
    const valid = validate(deserialize<T>(config, { type: configModel }));

    if (!valid) {
      if (Array.isArray(validate.errors)) {
        for (const error of validate.errors) {
          $log.error(`Config file: ${error.keyword} ${error.message}`);
        }
      }
      throw new Error('Invalid configuration!');
    }

    return deserialize<T>(config, { type: configModel });
  }
}
