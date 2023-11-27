import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestTripsApiContext } from '../../../test/TestTripsApiContext';
import { TripMongo } from '../../mongo';
import { TripMongoService } from './TripMongoService';

describe('TripMongoService', () => {
  let service: TripMongoService;
  let model: MongooseModel<TripMongo>;

  beforeAll(TestTripsApiContext.bootstrap());
  beforeEach(async () => {
    await TestTripsApiContext.clearDatabase();
    model = PlatformTest.get<MongooseModel<TripMongo>>(TripMongo);
    service = PlatformTest.get<TripMongoService>(TripMongoService);
  });
  afterAll(TestTripsApiContext.reset);

  describe('find', () => {
    it('Should pass', async () => {
      const spy = jest.spyOn(model, 'find');

      expect.assertions(2);

      const response = await service.find();

      expect(response).toBeInstanceOf(Array);
      expect(spy).toHaveBeenCalled();
    });
  });
});
