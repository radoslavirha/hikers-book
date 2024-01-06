import { $log } from '@tsed/common';
import { Type } from '@tsed/core';
import cfg from 'config';
import { CommonUtils } from '../utils/CommonUtils';
import { BaseConfig } from './BaseConfig';

export class ConfigFile<T> extends BaseConfig<T> {
  constructor(configModel: Type<T>) {
    super(ConfigFile.validateConfigFile(configModel));
  }

  static validateConfigFile<T>(configModel: Type<T>): T {
    try {
      const config = CommonUtils.validateModel(configModel, cfg);
      return config;
    } catch (errors) {
      if (Array.isArray(errors)) {
        for (const error of errors) {
          $log.error(`Config file: ${ error.keyword } ${ error.message }`);
        }
      }
      throw new Error('Invalid configuration!');
    }
  }
}
