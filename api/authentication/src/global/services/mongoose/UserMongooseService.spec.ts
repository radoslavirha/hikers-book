import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { User } from '../../../global/models';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { UserStub, UserStubMongoCreate } from '../../../test/stubs';
import { UserMongo } from '../../mongo';
import { UserMongooseService } from './UserMongooseService';

describe('UserMongooseService', () => {
  let service: UserMongooseService;
  let model: MongooseModel<UserMongo>;

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeEach(() => {
    TestMongooseContext.clearDatabase();
    model = PlatformTest.get<MongooseModel<UserMongo>>(UserMongo);
    service = PlatformTest.get<UserMongooseService>(UserMongooseService);
  });
  afterAll(TestAuthenticationApiContext.reset);

  describe('create', () => {
    it('Should pass', async () => {
      // @ts-expect-error protected
      const mapperSpy = jest.spyOn(service, 'getCreateObject').mockResolvedValue(UserStubMongoCreate);
      const spy = jest.spyOn(model, 'create');

      expect.assertions(3);

      const response = await service.create(UserStub);

      expect(response).toBeInstanceOf(User);
      expect(spy).toHaveBeenCalledWith(UserStubMongoCreate);
      expect(mapperSpy).toHaveBeenCalledWith(UserStub);
    });
  });
});
