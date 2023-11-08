import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Types } from 'mongoose';
import { TestModel } from '../test/TestModel';
import { TestMongoMapper } from '../test/TestMongoMapper';
import { TestModelChildMongo, TestModelMongo } from '../test/TestMongoModel';

describe('MongoMapper', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('mongoToModelBase', async () => {
    const mapper = PlatformTest.get<TestMongoMapper>(TestMongoMapper);
    const mongo = new TestModelMongo();
    mongo._id = 'test';
    mongo.createdAt = new Date();
    mongo.updatedAt = new Date();

    const model = new TestModel();

    expect.assertions(3);

    // @ts-expect-error protected method
    mapper.mongoToModelBase(model, mongo);

    expect(model.id).toEqual('test');
    expect(model.createdAt).toEqual(expect.any(Date));
    expect(model.updatedAt).toEqual(expect.any(Date));
  });

  it('canBePopulated - false', async () => {
    const mapper = PlatformTest.get<TestMongoMapper>(TestMongoMapper);
    const Model = PlatformTest.get<MongooseModel<TestModelMongo>>(TestModelMongo);

    const mongo = new Model({
      createdAt: new Date(),
      updatedAt: new Date(),
      child_id: new Types.ObjectId()
    });

    expect.assertions(1);

    // @ts-expect-error protected method
    const response = mapper.canBePopulated(mongo.child_id);

    expect(response).toEqual(false);
  });

  it('canBePopulated - true', async () => {
    const mapper = PlatformTest.get<TestMongoMapper>(TestMongoMapper);
    const Model = PlatformTest.get<MongooseModel<TestModelMongo>>(TestModelMongo);
    const ModelChild = PlatformTest.get<MongooseModel<TestModelChildMongo>>(TestModelChildMongo);

    const mongo = new Model({
      createdAt: new Date(),
      updatedAt: new Date(),
      child_id: new ModelChild()
    });

    expect.assertions(1);

    // @ts-expect-error protected method
    const response = mapper.canBePopulated(mongo.child_id);

    expect(response).toEqual(true);
  });

  it('getPopulated', async () => {
    const mapper = PlatformTest.get<TestMongoMapper>(TestMongoMapper);
    const Model = PlatformTest.get<MongooseModel<TestModelMongo>>(TestModelMongo);
    const ModelChild = PlatformTest.get<MongooseModel<TestModelChildMongo>>(TestModelChildMongo);

    const mongo = new Model({
      createdAt: new Date(),
      updatedAt: new Date(),
      child_id: new ModelChild()
    });

    expect.assertions(1);

    // @ts-expect-error protected method
    const response = mapper.getPopulated(mongo.child_id);

    expect(response).toBeInstanceOf(TestModelChildMongo);
  });

  it('getIdFromPotentiallyPopulated', async () => {
    const childId = '654bcd82bba81536a4ed4df3';
    const mapper = PlatformTest.get<TestMongoMapper>(TestMongoMapper);
    const Model = PlatformTest.get<MongooseModel<TestModelMongo>>(TestModelMongo);

    const mongo = new Model({
      _id: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      child_id: new Types.ObjectId(childId)
    });

    expect.assertions(1);

    // @ts-expect-error protected method
    const response = mapper.getIdFromPotentiallyPopulated(mongo.child_id);

    expect(response).toEqual(childId);
  });

  it('getIdFromPotentiallyPopulated - from populated', async () => {
    const childId = '654bcd82bba81536a4ed4df3';
    const mapper = PlatformTest.get<TestMongoMapper>(TestMongoMapper);
    const Model = PlatformTest.get<MongooseModel<TestModelMongo>>(TestModelMongo);
    const ModelChild = PlatformTest.get<MongooseModel<TestModelChildMongo>>(TestModelChildMongo);

    const mongoChild = new ModelChild();
    mongoChild._id = new Types.ObjectId(childId);

    const mongo = new Model({
      _id: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      child_id: mongoChild
    });

    expect.assertions(1);

    // @ts-expect-error protected method
    const response = mapper.getIdFromPotentiallyPopulated(mongo.child_id);

    expect(response).toEqual(childId);
  });
});
