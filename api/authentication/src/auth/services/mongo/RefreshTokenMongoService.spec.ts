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

  const stub = CommonUtils.buildModel(RefreshToken, {
    id: '654d2193990714d40d22a554',
    token_jti: 'jti',
    user_id: UserStubId,
    user: undefined,
    issuedAt,
    createdAt,
    updatedAt
  });

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeEach(async () => {
    await TestAuthenticationApiContext.clearDatabase();
    model = PlatformTest.get<MongooseModel<RefreshTokenMongo>>(RefreshTokenMongo);
    service = PlatformTest.get<RefreshTokenMongoService>(RefreshTokenMongoService);
  });
  afterAll(TestAuthenticationApiContext.reset);

  describe('delete', () => {
    it('Should pass', async () => {
      const spy = jest.spyOn(model, 'findByIdAndDelete');

      expect.assertions(1);

      await service.delete('654d2193990714d40d22a554');

      expect(spy).toHaveBeenCalledWith('654d2193990714d40d22a554');
    });
  });

  describe('deleteByJTI', () => {
    it('Should pass', async () => {
      const spy = jest.spyOn(model, 'deleteOne');

      expect.assertions(1);

      await service.deleteByJTI('654d2193990714d40d22a554');

      expect(spy).toHaveBeenCalledWith({ token_jti: '654d2193990714d40d22a554' });
    });
  });

  describe('find', () => {
    it('Should pass', async () => {
      await service.create(stub);
      const spy = jest.spyOn(model, 'findOne');

      expect.assertions(2);

      const response = await service.find('jti', UserStubId);

      expect(response).toBeInstanceOf(RefreshToken);
      expect(spy).toHaveBeenCalledWith({ token_jti: 'jti', user_id: UserStubId });
    });
  });

  describe('create', () => {
    const stubCreate: MongoPlainObjectCreate<RefreshTokenMongo> = {
      token_jti: 'jti',
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
