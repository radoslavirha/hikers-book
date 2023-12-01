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
    const creadentials = new model(CredentialsStubMongo);

    await creadentials.save();

    expect(creadentials.id).toBeDefined();
    expect(creadentials.provider).toEqual(CredentialsStubMongo.provider);
    expect(creadentials.email).toEqual(CredentialsStubMongo.email);
    expect(creadentials.provider_id).toEqual(CredentialsStubMongo.provider_id);
    expect(creadentials.password).not.toEqual(CredentialsStubMongo.password);
    expect(creadentials.user_id).toEqual(new Types.ObjectId(CredentialsStubMongo.user_id as string));
    expect(creadentials.createdAt).toBeDefined();
    expect(creadentials.updatedAt).toBeDefined();
  });
});
