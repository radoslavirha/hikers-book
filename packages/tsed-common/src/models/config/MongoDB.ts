import { AdditionalProperties, Default, Required } from '@tsed/schema';

@AdditionalProperties(true)
class MongoDBConnectionOptionsConfigModel {
  [key: string]: unknown;
}

@AdditionalProperties(false)
export class MongoDBConfigModel {
  @Required()
  url!: string;

  @Default({})
  connectionOptions: MongoDBConnectionOptionsConfigModel = {};
}
