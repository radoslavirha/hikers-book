import { PlatformTest } from '@tsed/common';
import moment from 'moment';
import SuperTest from 'supertest';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { CredentialsStub, EmailVerificationStub } from '../../../test/stubs';
import { EmailVerifyTokenHandler } from '../../handlers';
import {
  EmailSendVerificationRequest,
  EmailSignInRequest,
  EmailSignUpRequest,
  EmailVerifyTokenRequest
} from '../../models';
import { EmailService } from '../../services/EmailService';
import { ProtocolAuthService } from '../../services/ProtocolAuthService';
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
  let verifyTokenHandler: EmailVerifyTokenHandler;
  let authService: ProtocolAuthService;

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
    verifyTokenHandler = PlatformTest.get<EmailVerifyTokenHandler>(EmailVerifyTokenHandler);
    authService = PlatformTest.get<ProtocolAuthService>(ProtocolAuthService);
  });
  beforeEach(() => {
    TestAuthenticationApiContext.clearDatabase();
  });

  afterAll(TestAuthenticationApiContext.reset);

  describe('POST /auth/provider/email/send-verification', () => {
    const requestStub: EmailSendVerificationRequest = {
      email: 'tester@domain.com'
    };

    let createSpy: jest.SpyInstance;
    let deleteSpy: jest.SpyInstance;
    let findCredentialsSpy: jest.SpyInstance;
    let findSpy: jest.SpyInstance;

    beforeEach(() => {
      createSpy = jest.spyOn(emailVerificationService, 'create').mockImplementation();
      deleteSpy = jest.spyOn(emailVerificationService, 'delete').mockResolvedValue(null);
      findSpy = jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(EmailVerificationStub);
      findCredentialsSpy = jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(CredentialsStub);
    });

    it('Should call credentialsService.findByEmail()', async () => {
      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(findCredentialsSpy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should call emailVerificationService.findByEmail()', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);

      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(findSpy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should call emailVerificationService.delete() when old invitation exist', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue({
        ...EmailVerificationStub,
        expires_in: moment().subtract(2, 'hours').toDate()
      });

      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(deleteSpy).toHaveBeenCalledWith(EmailVerificationStub.id);
    });

    it('Should call emailVerificationService.create()', async () => {
      jest.spyOn(credentialsService, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(null);

      expect.assertions(1);

      await request.post('/auth/provider/email/send-verification').send(requestStub);

      expect(createSpy).toHaveBeenCalledWith(
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

    let findSpy: jest.SpyInstance;

    beforeEach(() => {
      findSpy = jest.spyOn(emailVerificationService, 'findByEmail').mockResolvedValue(EmailVerificationStub);
    });

    it('Should call emailVerificationService.findByEmail()', async () => {
      expect.assertions(1);

      await request.post('/auth/provider/email/verify-token').send(requestStub);

      expect(findSpy).toHaveBeenCalledWith('tester@domain.com');
    });

    it('Should call CryptographyUtils.argon2VerifyPassword()', async () => {
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

  describe('POST /auth/provider/email/sign-up', () => {
    const requestStub: EmailSignUpRequest = {
      email: 'tester@domain.com',
      token: 'token',
      password: '8^^3286UhpB$9m',
      password_confirm: '8^^3286UhpB$9m',
      full_name: 'John Doe'
    };

    it('Should call verifyTokenHandler.execute()', async () => {
      const spy = jest.spyOn(verifyTokenHandler, 'execute').mockImplementation();

      expect.assertions(1);

      await request.post('/auth/provider/email/sign-up').send(requestStub);

      expect(spy).toHaveBeenCalledWith({ email: 'tester@domain.com', token: 'token' });
    });

    it('Should call authService.emailSignUp()', async () => {
      jest.spyOn(verifyTokenHandler, 'execute').mockImplementation();
      const spy = jest.spyOn(authService, 'emailSignUp').mockImplementation();

      expect.assertions(1);

      await request.post('/auth/provider/email/sign-up').send(requestStub);

      expect(spy).toHaveBeenCalledWith(requestStub);
    });

    it('Should return 400 when passwords does not match', async () => {
      expect.assertions(2);

      const response = await request.post('/auth/provider/email/sign-up').send(<EmailSignUpRequest>{
        email: 'tester@domain.com',
        token: 'token',
        password: '8^^3286UhpB$9m',
        password_confirm: '8^^3286UhpB$9m---',
        full_name: 'John Doe'
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(`Passwords do not match!`);
    });
  });

  describe('POST /auth/provider/email/sign-in', () => {
    const requestStub: EmailSignInRequest = {
      email: 'tester@domain.com',
      password: '8^^3286UhpB$9m'
    };

    it('Should call authService.emailSignUp()', async () => {
      const spy = jest.spyOn(authService, 'emailSignIn').mockImplementation();

      expect.assertions(1);

      await request.post('/auth/provider/email/sign-in').send(requestStub);

      expect(spy).toHaveBeenCalledWith(requestStub);
    });
  });
});
