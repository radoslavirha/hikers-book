import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { EmailVerification } from '../models/EmailVerification';
import { EmailVerificationMongo } from '../mongo/EmailVerificationMongo';
import {
  EmailVerificationStub,
  EmailVerificationStubMongo,
  EmailVerificationStubMongoCreate,
  EmailVerificationStubMongoUpdate
} from '../test/stubs';
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

  describe('modelToMongoCreateObject', () => {
    it('Should return model', async () => {
      const object = await mapper.modelToMongoCreateObject(EmailVerificationStub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(EmailVerificationStubMongoCreate);
    });
  });

  describe('modelToMongoUpdateObject', () => {
    it('Should return model', async () => {
      const object = await mapper.modelToMongoUpdateObject(EmailVerificationStub);

      expect(object).toBeInstanceOf(Object);
      expect(object).toStrictEqual(EmailVerificationStubMongoUpdate);
    });
  });
});
