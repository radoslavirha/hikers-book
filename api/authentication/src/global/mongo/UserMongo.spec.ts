import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { UserMongo } from './UserMongo';

describe('User model', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<UserMongo>>(UserMongo);

    const user = new model({ full_name: 'name', admin: false });

    await user.save();

    expect(user.full_name).toEqual('name');
    expect(user.admin).toEqual(false);
  });
});
