import { AdditionalProperties, Default, Required } from '@tsed/schema';

@AdditionalProperties(true)
class MongoDBConnectionOptionsConfigModel {
  [key: string]: unknown;
}

export class MongoDBConfigModel {
  @Required()
  url!: string;

  @Default({})
  connectionOptions: MongoDBConnectionOptionsConfigModel = {};
}
