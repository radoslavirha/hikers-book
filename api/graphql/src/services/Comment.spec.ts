import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Comment } from '../models/Comment';
import { CommentService } from './Comment';

describe('CommentService', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  describe('findByTrip(trip)', () => {
    it('Should pass', async () => {
      const service = PlatformTest.get<CommentService>(CommentService);
      const model = PlatformTest.get<MongooseModel<Comment>>(Comment);

      const chain = { exec: jest.fn().mockReturnValue([]) };

      // @ts-expect-error passing just exec() is enough for this test
      const spy = jest.spyOn(model, 'find').mockReturnValue(chain);

      const result = await service.findByTrip('64f1e2813c860fa45e7a54d7');

      expect(spy).toBeCalledWith({ trip: '64f1e2813c860fa45e7a54d7' });
      expect(chain.exec).toBeCalled();
      expect(result).toEqual([]);
    });
  });
});
