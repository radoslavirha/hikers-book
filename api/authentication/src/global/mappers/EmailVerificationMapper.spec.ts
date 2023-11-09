import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { EmailVerificationStub, EmailVerificationStubMongo } from '../../../test/stubs';
import { EmailVerification } from '../models/EmailVerification';
import { EmailVerificationMongo } from '../mongo/EmailVerificationMongo';
import { EmailVerificationMapper } from './EmailVerificationMapper';

describe('EmailVerificationMapper', () => {
  let mapper: EmailVerificationMapper;

  beforeEach(PlatformTest.create);
  beforeEach(async () => {
    mapper = await PlatformTest.invoke(EmailVerificationMapper);
  });
  afterEach(PlatformTest.reset);

  describe('mongoToModel', () => {
    it('Should return model', async () => {
      const MongoModel = PlatformTest.get<MongooseModel<EmailVerificationMongo>>(EmailVerificationMongo);
      const mongo = new MongoModel(EmailVerificationStubMongo);

      const model = await mapper.mongoToModel(mongo);

      expect(model).toBeInstanceOf(EmailVerification);
      expect(model).toEqual(EmailVerificationStub);
    });
  });
});
