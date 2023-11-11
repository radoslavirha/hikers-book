import { MongooseModel } from '@tsed/mongoose';
import { MongoMapper } from '../mappers/MongoMapper';
import { Base } from '../models/Base';
import { BaseMongo } from './BaseMongo';

export abstract class MongooseService<MONGO extends BaseMongo, MODEL extends Base> {
  protected abstract model: MongooseModel<MONGO>;
  protected abstract mapper: MongoMapper<MONGO, MODEL>;

  protected getCreateObject(model: MODEL) {
    return this.mapper.modelToMongoCreateObject(model);
  }

  protected getUpdateObject(model: MODEL) {
    return this.mapper.modelToMongoUpdateObject(model);
  }

  protected async mapSingle(mongo: MONGO | null | undefined) {
    if (!mongo) {
      return null;
    }

    return this.mapper.mongoToModel(mongo);
  }

  protected async mapMany(mongo: MONGO[]): Promise<MODEL[]> {
    const promises = mongo.map((model) => this.mapper.mongoToModel(model));

    return Promise.all(promises);
  }
}
