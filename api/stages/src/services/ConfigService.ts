import { ConfigLoder } from '@hikers-book/tsed-common/server';
import { Injectable } from '@tsed/di';
import { ConfigModel } from '../models/ConfigModel';

@Injectable()
export class ConfigService extends ConfigLoder<ConfigModel> {
  public static readonly service = `Hiker's Book Stages API`;
  public static readonly port = 5503;
  public static readonly configModel = ConfigModel;

  constructor() {
    super(ConfigService.service, ConfigService.port, ConfigService.configModel);
  }
}
