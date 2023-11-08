import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { MongooseService } from '../mongo/MongooseService';
import { TestModel } from './TestModel';
import { TestMongoMapper } from './TestMongoMapper';
import { TestModelMongo } from './TestMongoModel';

@Service()
export class TestMongooseService extends MongooseService<TestModelMongo, TestModel> {
  @Inject(TestModelMongo)
  protected model!: MongooseModel<TestModelMongo>;
  @Inject(TestMongoMapper)
  protected mapper!: TestMongoMapper;
}
