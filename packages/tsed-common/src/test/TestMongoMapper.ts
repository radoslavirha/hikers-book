import { Service } from '@tsed/di';
import { MongoMapper } from '../mappers/MongoMapper';
import { TestModel } from './TestModel';
import { TestModelMongo } from './TestMongoModel';

@Service()
export class TestMongoMapper extends MongoMapper<TestModelMongo, TestModel> {
  public async mongoToModel(mongo: TestModelMongo): Promise<TestModel> {
    const model = new TestModel();
    model.label = mongo.label;
    model.child_id = this.getIdFromPotentiallyPopulated(model.child_id);

    this.mongoToModelBase(model, mongo);

    return model;
  }
}
