import { ConfigLoaderOptions, ConfigLoder } from '@hikers-book/tsed-common/config';
import { Injectable } from '@tsed/di';
import { ConfigModel } from '../models/ConfigModel';

@Injectable()
export class ConfigService extends ConfigLoder<ConfigModel> {
  public static readonly options: ConfigLoaderOptions<ConfigModel> = {
    service: `Hiker's Book GraphQL API`,
    fallbackPort: 5502,
    configModel: ConfigModel
  };

  constructor() {
    super(ConfigService.options);
  }
}
