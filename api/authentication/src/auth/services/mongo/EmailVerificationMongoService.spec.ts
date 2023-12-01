import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { EmailVerification } from '../../models';
import { EmailVerificationMongo } from '../../mongo';
import { EmailVerificationStub, EmailVerificationStubId, EmailVerificationStubMongoCreate } from '../../test/stubs';
import { EmailVerificationMongoService } from './EmailVerificationMongoService';

describe('EmailVerificationMongoService', () => {
  let service: EmailVerificationMongoService;
  let model: MongooseModel<EmailVerificationMongo>;

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeEach(async () => {
    await TestAuthenticationApiContext.clearDatabase();
    model = PlatformTest.get<MongooseModel<EmailVerificationMongo>>(EmailVerificationMongo);
    service = PlatformTest.get<EmailVerificationMongoService>(EmailVerificationMongoService);
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

  describe('deleteByEmail', () => {
    it('Should pass', async () => {
      const spy = jest.spyOn(model, 'deleteOne');

      expect.assertions(1);

      await service.deleteByEmail('tester@domain.com');

      expect(spy).toHaveBeenCalledWith({ email: 'tester@domain.com' });
    });
  });
});
