import { MongoDBConfigModel } from '@hikers-book/tsed-common/models';
import { Required } from '@tsed/schema';
import { ConfigJWTModel } from './ConfigJWTModel';

export class ConfigModel {
  @Required()
  jwt!: ConfigJWTModel;

  @Required()
  mongodb!: MongoDBConfigModel;
}
