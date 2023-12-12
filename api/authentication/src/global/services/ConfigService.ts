import { ConfigLoder } from '@hikers-book/tsed-common/server';
import { ConfigLoaderOptions, SwaggerDocsVersion, SwaggerSecurityScheme } from '@hikers-book/tsed-common/types';
import { Injectable } from '@tsed/di';
import { resolve } from 'path';
import { ConfigModel } from '../models/ConfigModel';

@Injectable()
export class ConfigService extends ConfigLoder<ConfigModel> {
  public static readonly options: ConfigLoaderOptions<ConfigModel> = {
    service: `Hiker's Book Authentication API`,
    port: 5501,
    configModel: ConfigModel,
    swagger: [
      {
        doc: SwaggerDocsVersion.AUTH,
        security: [SwaggerSecurityScheme.BEARER_JWT, SwaggerSecurityScheme.BASIC],
        outFile: resolve(__dirname, '../../auth/swagger.json')
      },
      {
        doc: SwaggerDocsVersion.V1,
        security: [SwaggerSecurityScheme.BEARER_JWT],
        outFile: resolve(__dirname, '../../v1/swagger.json')
      }
    ]
  };

  constructor() {
    super(ConfigService.options);
  }
}
