import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Types } from 'mongoose';
import { CredentialsStubMongo } from '../test/stubs';
import { CredentialsMongo } from './CredentialsMongo';

describe('CredentialsMongo', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<CredentialsMongo>>(CredentialsMongo);
    const credentials = new model(CredentialsStubMongo);

    await credentials.save();

    expect(credentials.id).toBeDefined();
    expect(credentials.provider).toEqual(CredentialsStubMongo.provider);
    expect(credentials.email).toEqual(CredentialsStubMongo.email);
    expect(credentials.provider_id).toEqual(CredentialsStubMongo.provider_id);
    expect(credentials.password).not.toEqual(CredentialsStubMongo.password);
    expect(credentials.user_id).toEqual(new Types.ObjectId(CredentialsStubMongo.user_id as string));
    expect(credentials.createdAt).toBeDefined();
    expect(credentials.updatedAt).toBeDefined();
  });
});
