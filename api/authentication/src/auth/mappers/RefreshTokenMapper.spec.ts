import { MongoPlainObject, MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { RefreshToken } from '../models';
import { RefreshTokenMongo } from '../mongo';
import { UserMongo } from '../mongo/UserMongo';
import { UserStub, UserStubId, UserStubMongo } from '../test/stubs';
import { RefreshTokenMapper } from './RefreshTokenMapper';

describe('RefreshTokenMapper', () => {
  let mapper: RefreshTokenMapper;

  const issuedAt = new Date();
  const createdAt = new Date();
  const updatedAt = new Date();

  beforeEach(PlatformTest.create);
  beforeEach(async () => {
    mapper = await PlatformTest.invoke(RefreshTokenMapper);
  });
  afterEach(PlatformTest.reset);

  describe('mongoToModel', () => {
    const stub: MongoPlainObject<RefreshTokenMongo> = {
      _id: '654d2193990714d40d22a554',
      token: 'token',
      user_id: UserStubId,
      issuedAt,
      createdAt,
      updatedAt
    };

    it('Should return model', async () => {
      const expectedStub = CommonUtils.buildModel(RefreshToken, {
        id: '654d2193990714d40d22a554',
        token: 'token',
        user_id: UserStubId,
        user: undefined,
        issuedAt,
        createdAt,
        updatedAt
      });
      const MongoModel = PlatformTest.get<MongooseModel<RefreshTokenMongo>>(RefreshTokenMongo);
      const mongo = new MongoModel(stub);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(RefreshToken);
      expect(model).toEqual(expectedStub);
    });

    it('Should return populated model', async () => {
      const expectedStub = CommonUtils.buildModel(RefreshToken, {
        id: '654d2193990714d40d22a554',
        token: 'token',
        user_id: UserStubId,
        user: UserStub,
        issuedAt,
        createdAt,
        updatedAt
      });
      const MongoModel = PlatformTest.get<MongooseModel<RefreshTokenMongo>>(RefreshTokenMongo);
      const MongoUserModel = PlatformTest.get<MongooseModel<UserMongo>>(UserMongo);
      const mongo = new MongoModel(stub);
      mongo.user_id = new MongoUserModel(UserStubMongo);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(RefreshToken);
      expect(model).toEqual(expectedStub);
    });
  });

  describe('modelToMongoCreateObject', () => {
    const stub = CommonUtils.buildModel(RefreshToken, {
      id: '654d2193990714d40d22a554',
      token: 'token',
      user_id: UserStubId,
      user: undefined,
      issuedAt,
      createdAt,
      updatedAt
    });

    const expectedStub: MongoPlainObjectCreate<RefreshTokenMongo> = {
      token: 'token',
      user_id: UserStubId,
      // @ts-expect-error retyping Ts.ED response
      issuedAt: issuedAt.toISOString()
    };

    it('Should return model', async () => {
      const object = await mapper.modelToMongoCreateObject(stub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(expectedStub);
    });
  });

  describe('modelToMongoUpdateObject', () => {
    const stub = CommonUtils.buildModel(RefreshToken, {
      id: '654d2193990714d40d22a554',
      token: 'token',
      user_id: UserStubId,
      user: undefined,
      issuedAt,
      createdAt,
      updatedAt
    });

    const expectedStub: MongoPlainObjectUpdate<RefreshTokenMongo> = {
      token: 'token',
      user_id: UserStubId,
      // @ts-expect-error retyping Ts.ED response
      issuedAt: issuedAt.toISOString()
    };

    it('Should return model', async () => {
      const object = await mapper.modelToMongoUpdateObject(stub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(expectedStub);
    });
  });
});
