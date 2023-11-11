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

  public async modelToMongoCreateObject(model: TestModel): Promise<TestModelMongo> {
    const mongo = new TestModelMongo() as Partial<TestModelMongo>;

    mongo.label = this.getModelValue(model, 'label');
    mongo.child_id = this.getModelValue(model, 'child_id');

    return mongo as TestModelMongo;
  }

  public async modelToMongoUpdateObject(model: TestModel): Promise<TestModelMongo> {
    const mongo = new TestModelMongo() as Partial<TestModelMongo>;

    mongo.label = this.getModelValue(model, 'label', true);
    mongo.child_id = this.getModelValue(model, 'child_id', true);

    return mongo as TestModelMongo;
  }
}
