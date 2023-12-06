import { PlatformTest } from '@tsed/common';
import SuperTest from 'supertest';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { EmailVerifyTokenHandler } from '../handlers';
import { CookieName, EmailSignInRequest, EmailSignUpRequest } from '../models';
import { ProtocolAuthService } from '../services/ProtocolAuthService';
import { TokensStub } from '../test/stubs';
import { AuthProviderEmailController } from './EmailController';

describe('AuthProviderEmailController - production', () => {
  process.env.NODE_ENV = 'production';

  let request: SuperTest.SuperTest<SuperTest.Test>;

  let verifyTokenHandler: EmailVerifyTokenHandler;
  let authService: ProtocolAuthService;

  beforeAll(
    TestAuthenticationApiContext.bootstrap({
      mount: {
        '/': [AuthProviderEmailController]
      }
    })
  );
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());

    verifyTokenHandler = PlatformTest.get<EmailVerifyTokenHandler>(EmailVerifyTokenHandler);
    authService = PlatformTest.get<ProtocolAuthService>(ProtocolAuthService);
  });
  beforeEach(() => {
    TestAuthenticationApiContext.clearDatabase();
  });

  afterAll(TestAuthenticationApiContext.reset);

  describe('POST /auth/provider/email/sign-up', () => {
    const requestStub: EmailSignUpRequest = {
      email: 'tester@domain.com',
      token: 'token',
      password: '8^^3286UhpB$9m',
      password_confirm: '8^^3286UhpB$9m',
      full_name: 'John Doe'
    };

    it('Should return refresh cookie', async () => {
      jest.spyOn(verifyTokenHandler, 'execute').mockImplementation();
      jest.spyOn(authService, 'emailSignUp').mockResolvedValue(TokensStub);

      expect.assertions(1);

      const response = await request.post('/provider/email/sign-up').send(requestStub);

      const cookie = response.headers['set-cookie'].find((cookie: string) =>
        cookie.startsWith(`${CookieName.Refresh}=`)
      );

      expect(cookie).toEqual(expect.stringContaining(`${CookieName.Refresh}=refresh;`));
    });
  });

  describe('GET /auth/provider/email/sign-in', () => {
    const requestStub: EmailSignInRequest = {
      email: 'tester@domain.com',
      password: '8^^3286UhpB$9m'
    };

    it('Should return refresh cookie', async () => {
      jest.spyOn(authService, 'emailSignIn').mockResolvedValue(TokensStub);
      const base64 = Buffer.from(`${requestStub.email}:${requestStub.password}`).toString('base64');

      expect.assertions(1);

      const response = await request.get('/provider/email/sign-in').set('Authorization', `Basic ${base64}`);

      const cookie = response.headers['set-cookie'].find((cookie: string) =>
        cookie.startsWith(`${CookieName.Refresh}=`)
      );

      expect(cookie).toEqual(expect.stringContaining(`${CookieName.Refresh}=refresh;`));
    });
  });
});
