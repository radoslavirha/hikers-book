import { ConfigLoder } from '@hikers-book/tsed-common/server';
import { ConfigLoaderOptions, SwaggerDocsVersion, SwaggerSecurityScheme } from '@hikers-book/tsed-common/types';
import { Injectable } from '@tsed/di';
import { ConfigModel } from '../models/ConfigModel';

@Injectable()
export class ConfigService extends ConfigLoder<ConfigModel> {
  public static readonly options: ConfigLoaderOptions<ConfigModel> = {
    service: `Hiker's Book Stages API`,
    port: 5503,
    configModel: ConfigModel,
    swagger: [
      {
        doc: SwaggerDocsVersion.V1,
        security: [SwaggerSecurityScheme.BEARER_JWT]
      }
    ]
  };

  constructor() {
    super(ConfigService.options);
  }
}
