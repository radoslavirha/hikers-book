import { ConfigLoder } from '@hikers-book/tsed-common/server';
import { ConfigLoaderOptions } from '@hikers-book/tsed-common/types';
import { Injectable } from '@tsed/di';
import { ConfigModel } from '../models/ConfigModel';

@Injectable()
export class ConfigService extends ConfigLoder<ConfigModel> {
  public static readonly options: ConfigLoaderOptions<ConfigModel> = {
    service: `Hiker's Book GraphQL API`,
    port: 5502,
    configModel: ConfigModel
  };

  constructor() {
    super(ConfigService.options);
  }
}
