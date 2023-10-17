import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { User } from '../mongo/User';
import { UserService } from './User';

describe('UserService', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  describe('findByEmail(email)', () => {
    it('Should pass', async () => {
      const service = PlatformTest.get<UserService>(UserService);
      const model = PlatformTest.get<MongooseModel<User>>(User);
      const spy = jest.spyOn(model, 'findOne').mockResolvedValue(null);

      const result = await service.findByEmail('user@email.com');

      expect(spy).toBeCalledWith({ email: 'user@email.com' });
      expect(result).toEqual(null);
    });
  });
});
