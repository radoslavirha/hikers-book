import { PlatformTest } from '@tsed/common';
import moment from 'moment';
import SuperTest from 'supertest';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { CredentialsStub, EmailVerificationStub } from '../../../test/stubs';
import { EmailSendVerificationRequest, EmailVerifyTokenRequest } from '../../models';
import { EmailService } from '../../services/EmailService';
import { CredentialsMongooseService } from '../../services/mongoose/CredentialsMongooseService';
import { EmailVerificationMongooseService } from '../../services/mongoose/EmailVerificationMongooseService';
import { CryptographyUtils } from '../../utils';
import { EmailProviderController } from './ProviderEmail';

const uuidStub = 'cdf334e2-1917-4094-a324-8f25c7bf798d';

jest.mock('uuid', () => {
  return {
    v4: () => uuidStub
  };
});

describe('EmailProviderController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let credentialsService: CredentialsMongooseService;
  let emailVerificationService: EmailVerificationMongooseService;
  let emailService: EmailService;

  beforeAll(
    TestAuthenticationApiContext.bootstrap({
      mount: {
        '/': [EmailProviderController]
      }
    })
  );
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
    credentialsService = PlatformTest.get<CredentialsMongooseService>(CredentialsMongooseService);
    emailVerificationService = PlatformTest.get<EmailVerificationMongooseService>(EmailVerificationMongooseService);
    emailService = PlatformTest.get<EmailService>(EmailService);
  });
  beforeEach(() => {
    TestAuthenticationApiContext.clearDatabase();
  });

  afterAll(TestAuthenticationApiContext.reset);

  describe('POST /auth/provider/email/send-verification', () => {
    const requestStub: EmailSendVerificationRequest = {
      email: 'tester@domain.com'
    };

    it('Should call credentialsService.findByEmail()', async () => {
      const spy = jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(CredentialsStub);

      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(spy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should call emailVerificationService.findByEmail()', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);
      const spy = jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(EmailVerificationStub);

      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(spy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should call emailVerificationService.delete() when old invitation exist', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue({
        ...EmailVerificationStub,
        expires_in: moment().subtract(2, 'hours').toDate()
      });
      const spy = jest.spyOn(emailVerificationService, 'delete').mockResolvedValue(null);

      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(spy).toHaveBeenCalledWith(EmailVerificationStub.id);
    });

    it('Should call emailVerificationService.create()', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(null);
      const spy = jest.spyOn(emailVerificationService, 'create').mockImplementation();

      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'tester@domain.com',
          token: expect.any(String),
          expires_in: expect.any(Date) // check date? maybe it'll be in config in future
        })
      );
    });

    it('Should call CryptographyUtils.argon2CreateHash()', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(null);
      const spy = jest.spyOn(CryptographyUtils, 'argon2CreateHash').mockImplementation();

      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(spy).toHaveBeenCalledWith(uuidStub);
    });

    it('Should call emailService.sendVerificationEmail()', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(null);
      const spy = jest.spyOn(emailService, 'sendVerificationEmail').mockImplementation();

      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(spy).toHaveBeenCalledWith('tester@domain.com', uuidStub);
    });

    it('Should return 403 when credentials for email already exist', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(CredentialsStub);

      expect.assertions(2);

      const response = await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual(
        `User with email tester@domain.com is already registered with ${CredentialsStub.provider}!`
      );
    });

    it('Should return 403 when not expired invitation exist', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue({
        ...EmailVerificationStub,
        expires_in: moment().add(2, 'hours').toDate()
      });

      expect.assertions(2);

      const response = await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual(`Verification email already sent to tester@domain.com!`);
    });

    it('Should pass', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(emailVerificationService, 'create').mockImplementation();
      jest.spyOn(emailService, 'sendVerificationEmail').mockImplementation();

      expect.assertions(2);

      const response = await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({});
    });
  });

  describe('POST /auth/provider/email/verify-token', () => {
    const requestStub: EmailVerifyTokenRequest = {
      email: 'tester@domain.com',
      token: 'token'
    };

    it('Should call emailVerificationService.findByEmail()', async () => {
      const spy = jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(EmailVerificationStub);

      expect.assertions(1);

      await request.post('/auth/provider/email/verify-token').send(requestStub);

      expect(spy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should call CryptographyUtils.argon2VerifyPassword()', async () => {
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(EmailVerificationStub);
      const spy = jest.spyOn(CryptographyUtils, 'argon2VerifyPassword').mockResolvedValue(true);

      expect.assertions(1);

      await request.post('/auth/provider/email/verify-token').send(requestStub);

      expect(spy).toHaveBeenCalledWith(EmailVerificationStub.token, requestStub.token);
    });

    it('Should return 404 when invitation does not exist', async () => {
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(null);

      expect.assertions(2);

      const response = await request.post('/auth/provider/email/verify-token').send(requestStub);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(`Verification email does not exist!`);
    });

    it('Should return 403 when invalid token provided', async () => {
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(EmailVerificationStub);
      jest.spyOn(CryptographyUtils, 'argon2VerifyPassword').mockResolvedValue(false);

      expect.assertions(2);

      const response = await request.post('/auth/provider/email/verify-token').send(requestStub);

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual(`Invalid verification token!`);
    });

    it('Should return 403 when invitation expired', async () => {
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue({
        ...EmailVerificationStub,
        expires_in: moment().subtract(2, 'hours').toDate()
      });
      jest.spyOn(CryptographyUtils, 'argon2VerifyPassword').mockResolvedValue(true);

      expect.assertions(2);

      const response = await request.post('/auth/provider/email/verify-token').send(requestStub);

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual(`Verification email expired!`);
    });

    it('Should pass', async () => {
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue({
        ...EmailVerificationStub,
        expires_in: moment().add(2, 'hours').toDate()
      });
      jest.spyOn(CryptographyUtils, 'argon2VerifyPassword').mockResolvedValue(true);

      expect.assertions(2);

      const response = await request.post('/auth/provider/email/verify-token').send(requestStub);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({});
    });
  });
});
