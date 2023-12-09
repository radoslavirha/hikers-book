import { RedisConfigModel } from '@hikers-book/tsed-common/models';
import { Required } from '@tsed/schema';

class ConfigModelAPIsHikersBook {
  @Required()
  authenticationAPI!: string;

  @Required()
  stagesAPI!: string;

  @Required()
  tripsAPI!: string;
}

class ConfigModelAPIs {
  @Required()
  hikersBook!: ConfigModelAPIsHikersBook;
}

export class ConfigModel {
  @Required()
  apis!: ConfigModelAPIs;

  @Required()
  redis!: RedisConfigModel;
}
