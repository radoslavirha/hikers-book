import { MongoPlainObject, MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { RefreshToken } from '../models';
import { RefreshTokenMongo } from '../mongo';
import { UserMongo } from '../mongo/UserMongo';
import { RefreshTokenStub, UserStub, UserStubId, UserStubMongo } from '../test/stubs';
import { RefreshTokenMapper } from './RefreshTokenMapper';

describe('RefreshTokenMapper', () => {
  let mapper: RefreshTokenMapper;

  beforeEach(PlatformTest.create);
  beforeEach(async () => {
    mapper = await PlatformTest.invoke(RefreshTokenMapper);
  });
  afterEach(PlatformTest.reset);

  describe('mongoToModel', () => {
    const stub: MongoPlainObject<RefreshTokenMongo> = {
      _id: '654d2193990714d40d22a554',
      token_jti: 'jti',
      user_id: UserStubId,
      issuedAt: RefreshTokenStub.issuedAt,
      createdAt: RefreshTokenStub.createdAt,
      updatedAt: RefreshTokenStub.updatedAt
    };

    it('Should return model', async () => {
      const MongoModel = PlatformTest.get<MongooseModel<RefreshTokenMongo>>(RefreshTokenMongo);
      const mongo = new MongoModel(stub);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(RefreshToken);
      expect(model).toEqual(RefreshTokenStub);
    });

    it('Should return populated model', async () => {
      const MongoModel = PlatformTest.get<MongooseModel<RefreshTokenMongo>>(RefreshTokenMongo);
      const MongoUserModel = PlatformTest.get<MongooseModel<UserMongo>>(UserMongo);
      const mongo = new MongoModel(stub);
      mongo.user_id = new MongoUserModel(UserStubMongo);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(RefreshToken);
      expect(model).toEqual({
        ...RefreshTokenStub,
        user: UserStub
      });
    });
  });

  describe('modelToMongoCreateObject', () => {
    const expectedStub: MongoPlainObjectCreate<RefreshTokenMongo> = {
      token_jti: 'jti',
      user_id: UserStubId,
      // @ts-expect-error retyping Ts.ED response
      issuedAt: RefreshTokenStub.issuedAt.toISOString()
    };

    it('Should return model', async () => {
      const object = await mapper.modelToMongoCreateObject(RefreshTokenStub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(expectedStub);
    });
  });

  describe('modelToMongoUpdateObject', () => {
    const expectedStub: MongoPlainObjectUpdate<RefreshTokenMongo> = {
      token_jti: 'jti',
      user_id: UserStubId,
      // @ts-expect-error retyping Ts.ED response
      issuedAt: RefreshTokenStub.issuedAt.toISOString()
    };

    it('Should return model', async () => {
      const object = await mapper.modelToMongoUpdateObject(RefreshTokenStub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(expectedStub);
    });
  });
});
