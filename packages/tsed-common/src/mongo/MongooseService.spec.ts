import { PlatformTest } from '@tsed/common';
import { TestModel } from '../test/TestModel';
import { TestModelMongo } from '../test/TestMongoModel';
import { TestMongooseService } from '../test/TestMongooseService';

describe('MongooseService', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('mapSingle', async () => {
    const service = PlatformTest.get<TestMongooseService>(TestMongooseService);

    const mongo = new TestModelMongo();
    mongo._id = 'test';
    mongo.label = 'label';
    mongo.createdAt = new Date();
    mongo.updatedAt = new Date();

    expect.assertions(5);

    // @ts-expect-error protected method
    const response = await service.mapSingle(mongo);

    expect(response).toBeInstanceOf(TestModel);
    expect(response!.id).toEqual('test');
    expect(response!.label).toEqual('label');
    expect(response!.createdAt).toEqual(expect.any(Date));
    expect(response!.updatedAt).toEqual(expect.any(Date));
  });

  it('mapSingle - null', async () => {
    const service = PlatformTest.get<TestMongooseService>(TestMongooseService);

    expect.assertions(1);

    // @ts-expect-error protected method
    const response = await service.mapSingle();

    expect(response).toBe(null);
  });

  it('mapMany', async () => {
    const service = PlatformTest.get<TestMongooseService>(TestMongooseService);

    const mongo = new TestModelMongo();
    mongo._id = 'test';
    mongo.label = 'label';
    mongo.createdAt = new Date();
    mongo.updatedAt = new Date();

    expect.assertions(6);

    // @ts-expect-error protected method
    const response = await service.mapMany([mongo]);

    expect(response.length).toBe(1);
    expect(response[0]).toBeInstanceOf(TestModel);
    expect(response[0].id).toEqual('test');
    expect(response[0].label).toEqual('label');
    expect(response[0].createdAt).toEqual(expect.any(Date));
    expect(response[0].updatedAt).toEqual(expect.any(Date));
  });
});
