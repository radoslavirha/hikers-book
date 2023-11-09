import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { UserStub, UserStubMongo } from '../../../test/stubs';
import { User } from '../models/User';
import { UserMongo } from '../mongo/UserMongo';
import { UserMapper } from './UserMapper';

describe('UserMapper', () => {
  let mapper: UserMapper;

  beforeEach(PlatformTest.create);
  beforeEach(async () => {
    mapper = await PlatformTest.invoke(UserMapper);
  });
  afterEach(PlatformTest.reset);

  describe('mongoToModel', () => {
    it('Should return model', async () => {
      const MongoModel = PlatformTest.get<MongooseModel<UserMongo>>(UserMongo);
      const mongo = new MongoModel(UserStubMongo);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(User);
      expect(model).toEqual(UserStub);
    });
  });
});
