import { MongoDBConfigModel } from '@hikers-book/tsed-common/models';
import { Required } from '@tsed/schema';

export class ConfigModel {
  @Required()
  mongodb!: MongoDBConfigModel;
}
