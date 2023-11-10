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
    const user = new model(EmailVerificationStubMongo);

    await user.save();

    expect(user.email).toEqual(EmailVerificationStubMongo.email);
    expect(user.token).toEqual(EmailVerificationStubMongo.token);
    expect(user.expires_in).toEqual(EmailVerificationStubMongo.expires_in);
  });
});
