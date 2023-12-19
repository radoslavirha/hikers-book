import { ConfigLoder } from '@hikers-book/tsed-common/server';
import {
  ConfigLoaderOptions,
  SwaggerDocConfig,
  SwaggerDocsVersion,
  SwaggerSecurityScheme
} from '@hikers-book/tsed-common/types';
import { Injectable } from '@tsed/di';
import { resolve } from 'path';
import { ConfigModel } from '../models/ConfigModel';

@Injectable()
export class ConfigService extends ConfigLoder<ConfigModel> {
  public static readonly options: ConfigLoaderOptions<ConfigModel> = {
    service: `Hiker's Book Trips API`,
    port: 5504,
    configModel: ConfigModel
  };

  public static readonly swagger: SwaggerDocConfig[] = [
    {
      doc: SwaggerDocsVersion.V1,
      security: [SwaggerSecurityScheme.BEARER_JWT],
      outFile: resolve(__dirname, '../../v1/swagger.json')
    }
  ];

  constructor() {
    super(ConfigService.options);
  }
}
