import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { UserStubMongo } from '../test/stubs';
import { UserMongo } from './UserMongo';

describe('UserMongo', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<UserMongo>>(UserMongo);

    const user = new model(UserStubMongo);

    await user.save();

    expect(user.id).toBeDefined();
    expect(user.full_name).toEqual(UserStubMongo.full_name);
    expect(user.admin).toEqual(UserStubMongo.admin);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });
});
