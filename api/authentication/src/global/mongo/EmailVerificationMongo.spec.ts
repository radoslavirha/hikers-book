import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { EmailVerificationStubMongo } from '../../test/stubs';
import { EmailVerificationMongo } from './EmailVerificationMongo';

describe('EmailVerificationMongo', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<EmailVerificationMongo>>(EmailVerificationMongo);
    const email = new model(EmailVerificationStubMongo);

    await email.save();

    expect(email.id).toBeDefined();
    expect(email.email).toEqual(EmailVerificationStubMongo.email);
    expect(email.token).toEqual(EmailVerificationStubMongo.token);
    expect(email.expires_in).toEqual(EmailVerificationStubMongo.expires_in);
    expect(email.createdAt).toBeDefined();
    expect(email.updatedAt).toBeDefined();
  });
});
