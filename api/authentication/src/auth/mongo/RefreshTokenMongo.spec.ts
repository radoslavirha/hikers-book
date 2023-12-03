import { MongoPlainObject } from '@hikers-book/tsed-common/types';
import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Types } from 'mongoose';
import { UserStubId } from '../test/stubs';
import { RefreshTokenMongo } from './RefreshTokenMongo';

describe('RefreshTokenMongo', () => {
  const stub: MongoPlainObject<RefreshTokenMongo> = {
    _id: '654d2193990714d40d22a554',
    token: 'token',
    user_id: UserStubId,
    issuedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<RefreshTokenMongo>>(RefreshTokenMongo);
    const refresh = new model(stub);

    await refresh.save();

    expect(refresh.id).toBeDefined();
    expect(refresh.token).toEqual(stub.token);
    expect(refresh.user_id).toEqual(new Types.ObjectId(stub.user_id as string));
    expect(refresh.issuedAt).toBeDefined();
    expect(refresh.createdAt).toBeDefined();
    expect(refresh.updatedAt).toBeDefined();
  });
});
