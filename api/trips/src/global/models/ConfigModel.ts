import { MongoDBConfigModel, RedisConfigModel, SessionConfigModel } from '@hikers-book/tsed-common/models';
import { Required } from '@tsed/schema';

class ConfigModelAPIsHikersBook {
  @Required()
  authenticationAPI!: string;
}

class ConfigModelAPIs {
  @Required()
  hikersBook!: ConfigModelAPIsHikersBook;
}

export class ConfigModel {
  @Required()
  apis!: ConfigModelAPIs;

  @Required()
  mongodb!: MongoDBConfigModel;

  @Required()
  redis!: RedisConfigModel;

  @Required()
  session!: SessionConfigModel;
}
