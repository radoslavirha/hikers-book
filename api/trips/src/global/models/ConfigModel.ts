import { MongoDBConfigModel, RedisConfigModel, SwaggerConfigModel } from '@hikers-book/tsed-common/models';
import { Property, Required } from '@tsed/schema';

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

  @Property(SwaggerConfigModel)
  swagger?: SwaggerConfigModel;
}
