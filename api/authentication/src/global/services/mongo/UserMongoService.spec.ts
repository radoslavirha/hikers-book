import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { UserStub, UserStubMongoCreate } from '../../../test/stubs';
import { User } from '../../models';
import { UserMongo } from '../../mongo';
import { UserMongoService } from './UserMongoService';

describe('UserMongoService', () => {
  let service: UserMongoService;
  let model: MongooseModel<UserMongo>;

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeEach(async () => {
    await TestAuthenticationApiContext.clearDatabase();
    model = PlatformTest.get<MongooseModel<UserMongo>>(UserMongo);
    service = PlatformTest.get<UserMongoService>(UserMongoService);
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
