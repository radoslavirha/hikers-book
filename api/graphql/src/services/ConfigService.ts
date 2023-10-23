import { ConfigServiceBase } from '@hikers-book/tsed-common/services';
import { Injectable } from '@tsed/di';
import { ConfigModel } from '../models/ConfigModel';

@Injectable()
export class ConfigService extends ConfigServiceBase<ConfigModel> {
  static api = "Hiker's Book GraphQL API";
  static port = 5502;

  constructor() {
    super(ConfigService.api, ConfigService.port, ConfigModel);
  }

  static getServerConfig(): Partial<TsED.Configuration> {
    const config = ConfigServiceBase.load(ConfigService.api, ConfigService.port, ConfigModel);

    return {
      ...config.base,
      mongoose: [
        {
          id: 'hikers-book',
          url: config.file.mongodb.url,
          connectionOptions: config.file.mongodb.connectionOptions
        }
      ]
    };
  }
}
