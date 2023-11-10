import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Types } from 'mongoose';
import { CredentialsStubMongo } from '../../test/stubs';
import { CredentialsMongo } from './CredentialsMongo';

describe('CredentialsMongo', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<CredentialsMongo>>(CredentialsMongo);
    const user = new model(CredentialsStubMongo);

    await user.save();

    expect(user.provider).toEqual(CredentialsStubMongo.provider);
    expect(user.email).toEqual(CredentialsStubMongo.email);
    expect(user.provider_id).toEqual(CredentialsStubMongo.provider_id);
    expect(user.password).not.toEqual(CredentialsStubMongo.password);
    expect(user.user_id).toEqual(new Types.ObjectId(CredentialsStubMongo.user_id as string));
  });
});
