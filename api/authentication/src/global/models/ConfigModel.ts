import { MongoDBConfigModel, RedisConfigModel, SwaggerConfigModel } from '@hikers-book/tsed-common/models';
import { Property, Required } from '@tsed/schema';
import { AuthConfigModel } from './config/AuthModel';
import { FrontendConfigModel } from './config/FrontendConfigModel';
import { JWTConfigModel } from './config/JWTConfigModel';
import { NodemailerConfigModel } from './config/NodemailerConfigModel';

export class ConfigModel {
  @Required()
  auth!: AuthConfigModel;

  @Required()
  frontend!: FrontendConfigModel;

  @Required()
  jwt!: JWTConfigModel;

  @Required()
  mongodb!: MongoDBConfigModel;

  @Required()
  nodemailer!: NodemailerConfigModel;

  @Required()
  redis!: RedisConfigModel;

  @Property(SwaggerConfigModel)
  swagger?: SwaggerConfigModel;
}
