import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { AuthProviderEnum } from '../types';
import { User } from './User';

describe('User model', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<User>>(User);

    const user = new model({ email: 'email@test.com', password: 'password' });

    await user.save();

    expect(user.email).toEqual('email@test.com');
    expect(user.password).not.toEqual('password');
    expect(user.auth_provider).toEqual(AuthProviderEnum.LOCAL);
  });
});
