import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { EmailVerification } from '../../../global/models';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { EmailVerificationStub, EmailVerificationStubId, EmailVerificationStubMongoCreate } from '../../../test/stubs';
import { EmailVerificationMongo } from '../../mongo';
import { EmailVerificationMongooseService } from './EmailVerificationMongooseService';

describe('EmailVerificationMongooseService', () => {
  let service: EmailVerificationMongooseService;
  let model: MongooseModel<EmailVerificationMongo>;

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeEach(() => {
    TestMongooseContext.clearDatabase();
    model = PlatformTest.get<MongooseModel<EmailVerificationMongo>>(EmailVerificationMongo);
    service = PlatformTest.get<EmailVerificationMongooseService>(EmailVerificationMongooseService);
  });
  afterAll(TestAuthenticationApiContext.reset);

  describe('findByEmail', () => {
    it('Should pass - data exist', async () => {
      const r = await service.create(EmailVerificationStub);
      const spy = jest.spyOn(model, 'findOne');

      expect.assertions(2);

      const response = await service.findByEmail(r.email);

      expect(response).toBeInstanceOf(EmailVerification);
      expect(spy).toHaveBeenCalledWith({ email: r.email });
    });

    it('Should pass - data does not exist', async () => {
      expect.assertions(1);

      const response = await service.findByEmail(EmailVerificationStubId);

      expect(response).toEqual(null);
    });
  });

  describe('create', () => {
    it('Should pass', async () => {
      // @ts-expect-error protected
      const mapperSpy = jest.spyOn(service, 'getCreateObject').mockResolvedValue(EmailVerificationStubMongoCreate);
      const spy = jest.spyOn(model, 'create');

      expect.assertions(3);

      const response = await service.create(EmailVerificationStub);

      expect(response).toBeInstanceOf(EmailVerification);
      expect(spy).toHaveBeenCalledWith(EmailVerificationStubMongoCreate);
      expect(mapperSpy).toHaveBeenCalledWith(EmailVerificationStub);
    });
  });

  describe('delete', () => {
    it('Should pass', async () => {
      const r = await service.create(EmailVerificationStub);
      const spy = jest.spyOn(model, 'findByIdAndDelete');

      expect.assertions(2);

      const response = await service.delete(r.id);

      expect(response).toBeInstanceOf(EmailVerification);
      expect(spy).toHaveBeenCalledWith(r.id);
    });

    it('Should pass - not exist', async () => {
      jest.spyOn(model, 'findByIdAndDelete');

      expect.assertions(1);

      const response = await service.delete(EmailVerificationStubId);

      expect(response).toEqual(null);
    });
  });
});
