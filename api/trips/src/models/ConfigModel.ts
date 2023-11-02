import { MongoDBConfigModel, RedisConfigModel, SessionConfigModel } from '@hikers-book/tsed-common/models';
import { Required } from '@tsed/schema';

export class ConfigModel {
  @Required()
  mongodb!: MongoDBConfigModel;

  @Required()
  redis!: RedisConfigModel;

  @Required()
  session!: SessionConfigModel;
}
