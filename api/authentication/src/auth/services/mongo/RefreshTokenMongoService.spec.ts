import { MongoPlainObjectCreate } from '@hikers-book/tsed-common/types';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { RefreshToken } from '../../models';
import { RefreshTokenMongo } from '../../mongo';
import { UserStubId } from '../../test/stubs';
import { RefreshTokenMongoService } from './RefreshTokenMongoService';

describe('RefreshTokenMongoService', () => {
  let service: RefreshTokenMongoService;
  let model: MongooseModel<RefreshTokenMongo>;

  const issuedAt = new Date();
  const createdAt = new Date();
  const updatedAt = new Date();

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeEach(async () => {
    await TestAuthenticationApiContext.clearDatabase();
    model = PlatformTest.get<MongooseModel<RefreshTokenMongo>>(RefreshTokenMongo);
    service = PlatformTest.get<RefreshTokenMongoService>(RefreshTokenMongoService);
  });
  afterAll(TestAuthenticationApiContext.reset);

  describe('create', () => {
    const stub = CommonUtils.buildModel(RefreshToken, {
      id: '654d2193990714d40d22a554',
      token: 'token',
      user_id: UserStubId,
      user: undefined,
      issuedAt,
      createdAt,
      updatedAt
    });

    const stubCreate: MongoPlainObjectCreate<RefreshTokenMongo> = {
      token: 'token',
      user_id: UserStubId,
      // @ts-expect-error retyping Ts.ED response
      issuedAt: issuedAt.toISOString()
    };

    it('Should pass', async () => {
      // @ts-expect-error protected
      const mapperSpy = jest.spyOn(service, 'getCreateObject').mockResolvedValue(stubCreate);
      const spy = jest.spyOn(model, 'create');

      expect.assertions(3);

      const response = await service.create(stub);

      expect(response).toBeInstanceOf(RefreshToken);
      expect(spy).toHaveBeenCalledWith(stubCreate);
      expect(mapperSpy).toHaveBeenCalledWith(stub);
    });
  });
});
