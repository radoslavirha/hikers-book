import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { MongoService } from '../mongo/MongoService';
import { TestModel } from './TestModel';
import { TestMongoMapper } from './TestMongoMapper';
import { TestModelMongo } from './TestMongoModel';

@Service()
export class TestMongoService extends MongoService<TestModelMongo, TestModel> {
  @Inject(TestModelMongo)
  protected model!: MongooseModel<TestModelMongo>;
  @Inject(TestMongoMapper)
  protected mapper!: TestMongoMapper;
}
