import { PlatformTest } from '@tsed/common';
import { TestModel } from '../test/TestModel';
import { TestMongoMapper } from '../test/TestMongoMapper';
import { TestModelMongo } from '../test/TestMongoModel';
import { TestMongoService } from '../test/TestMongoService';
import { MongoPlainObjectCreate, MongoPlainObjectUpdate } from '../types/mongo';

describe('MongoService', () => {
  let service: TestMongoService;
  let mapper: TestMongoMapper;

  beforeEach(PlatformTest.create);
  beforeEach(() => {
    mapper = PlatformTest.get<TestMongoMapper>(TestMongoMapper);
    service = PlatformTest.get<TestMongoService>(TestMongoService);
  });
  afterEach(PlatformTest.reset);

  it('getCreateObject', async () => {
    const spy = jest
      .spyOn(mapper, 'modelToMongoCreateObject')
      .mockResolvedValue(<MongoPlainObjectCreate<TestModelMongo>>{ label: 'label', child_id: 'child_id' });
    const model = new TestModel();
    model.label = 'label';

    expect.assertions(2);

    // @ts-expect-error protected method
    const response = await service.getCreateObject(model);

    expect(spy).toHaveBeenCalledWith(model);
    expect(response).toStrictEqual({ label: 'label', child_id: 'child_id' });
  });

  it('getUpdateObject', async () => {
    const spy = jest
      .spyOn(mapper, 'modelToMongoUpdateObject')
      .mockResolvedValue(<MongoPlainObjectUpdate<TestModelMongo>>{ label: 'label', child_id: 'child_id' });
    const model = new TestModel();
    model.label = 'label';

    expect.assertions(2);

    // @ts-expect-error protected method
    const response = await service.getUpdateObject(model);

    expect(spy).toHaveBeenCalledWith(model);
    expect(response).toStrictEqual({ label: 'label', child_id: 'child_id' });
  });

  it('mapSingle', async () => {
    const spy = jest
      .spyOn(mapper, 'mongoToModel')
      .mockResolvedValue(<TestModel>{ label: 'label', child_id: 'child_id' });
    const mongo = new TestModelMongo();
    mongo._id = 'test';
    mongo.label = 'label';
    mongo.createdAt = new Date();
    mongo.updatedAt = new Date();

    expect.assertions(2);

    // @ts-expect-error protected method
    const response = await service.mapSingle(mongo);

    expect(response).toStrictEqual({ label: 'label', child_id: 'child_id' });
    expect(spy).toHaveBeenCalledWith(mongo);
  });

  it('mapSingle - null', async () => {
    const spy = jest.spyOn(mapper, 'mongoToModel');

    expect.assertions(2);

    // @ts-expect-error protected method
    const response = await service.mapSingle();

    expect(response).toBe(null);
    expect(spy).not.toHaveBeenCalled();
  });

  it('mapMany', async () => {
    const spy = jest
      .spyOn(mapper, 'mongoToModel')
      .mockResolvedValue(<TestModel>{ label: 'label', child_id: 'child_id' });
    const mongo = new TestModelMongo();
    mongo._id = 'test';
    mongo.label = 'label';
    mongo.createdAt = new Date();
    mongo.updatedAt = new Date();

    const mongo2 = new TestModelMongo();
    mongo2._id = 'test2';
    mongo2.label = 'label2';
    mongo2.createdAt = new Date();
    mongo2.updatedAt = new Date();

    expect.assertions(4);

    // @ts-expect-error protected method
    const response = await service.mapMany([mongo, mongo2]);

    expect(response.length).toBe(2);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, mongo);
    expect(spy).toHaveBeenNthCalledWith(2, mongo2);
  });
});
