import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Comment } from '../models/Comment';
import { Trip } from '../models/Trip';
import { TripService } from './Trip';

describe('TripService', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  describe('findById(id)', () => {
    it('Should pass', async () => {
      const service = PlatformTest.get<TripService>(TripService);
      const model = PlatformTest.get<MongooseModel<Trip>>(Trip);
      const chain = { exec: jest.fn().mockReturnValue(null) };
      // @ts-expect-error passing just exec() is enough for this test
      const spy = jest.spyOn(model, 'findById').mockReturnValue(chain);

      const result = await service.findById('64f1e2813c860fa45e7a54d7');

      expect(spy).toBeCalledWith('64f1e2813c860fa45e7a54d7');
      expect(chain.exec).toBeCalled();
      expect(result).toEqual(null);
    });
  });

  describe('find()', () => {
    it('Should pass', async () => {
      const service = PlatformTest.get<TripService>(TripService);
      const model = PlatformTest.get<MongooseModel<Trip>>(Trip);
      const chain = { exec: jest.fn().mockReturnValue([]) };
      // @ts-expect-error passing just exec() is enough for this test
      const spy = jest.spyOn(model, 'find').mockReturnValue(chain);

      const result = await service.find();

      expect(spy).toBeCalled();
      expect(chain.exec).toBeCalled();
      expect(result).toEqual([]);
    });
  });

  describe('create(data)', () => {
    it('Should pass', async () => {
      const service = PlatformTest.get<TripService>(TripService);
      const model = PlatformTest.get<MongooseModel<Trip>>(Trip);
      const dummy = { label: 'test' };
      // @ts-expect-error return dummy model
      const spy = jest.spyOn(model, 'create').mockResolvedValue(dummy);

      const result = await service.create(dummy);

      expect(spy).toBeCalledWith(dummy);
      expect(result).toEqual(dummy);
    });
  });

  describe('addComment(id, data)', () => {
    it('Should pass', async () => {
      const tripId = '64f1e2813c860fa45e7a54d7';
      const service = PlatformTest.get<TripService>(TripService);
      const model = PlatformTest.get<MongooseModel<Trip>>(Trip);
      const modelComment = PlatformTest.get<MongooseModel<Comment>>(Comment);
      const trip = { id: tripId, label: 'test', comments: [], save: jest.fn() };
      const comment = { content: 'comment' };
      const spyTripFindById = jest.spyOn(model, 'findById').mockResolvedValue(trip);
      const spyTripSave = jest.spyOn(trip, 'save');
      // @ts-expect-error return dummy model
      const spyCreateComment = jest.spyOn(modelComment, 'create').mockResolvedValue(comment);

      const result = await service.addComment(tripId, comment);

      expect(spyTripFindById).toBeCalledWith(tripId);
      expect(spyCreateComment).toBeCalledWith({ trip: tripId, ...comment });
      expect(spyTripSave).toBeCalled();
      expect(result).toEqual(comment);
    });
  });
});
