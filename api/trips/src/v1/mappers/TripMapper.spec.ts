import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { Trip } from '../models/Trip';
import { TripMongo } from '../mongo/TripMongo';
import { TripStub, TripStubMongo, TripStubMongoCreate, TripStubMongoUpdate } from '../test/stubs';
import { TripMapper } from './TripMapper';

describe('TripMapper', () => {
  let mapper: TripMapper;

  beforeEach(PlatformTest.create);
  beforeEach(async () => {
    mapper = await PlatformTest.invoke(TripMapper);
  });
  afterEach(PlatformTest.reset);

  describe('mongoToModel', () => {
    it('Should return model', async () => {
      const MongoModel = PlatformTest.get<MongooseModel<TripMongo>>(TripMongo);
      const mongo = new MongoModel(TripStubMongo);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(Trip);
      expect(model).toEqual(TripStub);
    });
  });

  describe('modelToMongoCreateObject', () => {
    it('Should return model', async () => {
      const object = await mapper.modelToMongoCreateObject(TripStub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(TripStubMongoCreate);
    });
  });

  describe('modelToMongoUpdateObject', () => {
    it('Should return model', async () => {
      const object = await mapper.modelToMongoUpdateObject(TripStub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(TripStubMongoUpdate);
    });
  });
});
