import { ConfigLoder } from '@hikers-book/tsed-common/server';
import { ConfigLoaderOptions, SwaggerDocsVersion } from '@hikers-book/tsed-common/types';
import { Injectable } from '@tsed/di';
import { ConfigModel } from '../models/ConfigModel';

@Injectable()
export class ConfigService extends ConfigLoder<ConfigModel> {
  public static readonly options: ConfigLoaderOptions<ConfigModel> = {
    service: `Hiker's Book Trips API`,
    port: 5504,
    configModel: ConfigModel,
    generateDocs: [SwaggerDocsVersion.V1]
  };

  constructor() {
    super(ConfigService.options);
  }
}
