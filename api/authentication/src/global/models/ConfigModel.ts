import { MongoDBConfigModel, RedisConfigModel, SessionConfigModel } from '@hikers-book/tsed-common/models';
import { Required } from '@tsed/schema';
import { AuthConfigModel } from './config/AuthModel';
import { JWTConfigModel } from './config/JWTModel';

export class ConfigModel {
  @Required()
  auth!: AuthConfigModel;

  @Required()
  jwt!: JWTConfigModel;

  @Required()
  mongodb!: MongoDBConfigModel;

  @Required()
  redis!: RedisConfigModel;

  @Required()
  session!: SessionConfigModel;
}
