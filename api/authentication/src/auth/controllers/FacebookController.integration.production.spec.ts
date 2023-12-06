import { PlatformTest } from '@tsed/common';
import { PassportMiddleware } from '@tsed/passport';
import {} from 'passport-facebook';
import SuperTest from 'supertest';
import { ConfigService } from '../../global/services/ConfigService';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { CookieName } from '../models';
import { ProtocolAuthService } from '../services/ProtocolAuthService';
import { TokensStub } from '../test/stubs';
import { AuthProviderFacebookController } from './FacebookController';

describe('AuthProviderFacebookController - production', () => {
  process.env.NODE_ENV = 'production';

  let request: SuperTest.SuperTest<SuperTest.Test>;

  let authService: ProtocolAuthService;
  let configService: ConfigService;

  beforeAll(
    TestAuthenticationApiContext.bootstrap({
      mount: {
        '/': [AuthProviderFacebookController]
      }
    })
  );
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());

    authService = PlatformTest.get<ProtocolAuthService>(ProtocolAuthService);
    configService = PlatformTest.get<ConfigService>(ConfigService);
  });
  beforeEach(() => {
    TestAuthenticationApiContext.clearDatabase();
  });

  afterAll(TestAuthenticationApiContext.reset);

  describe('GET /auth/provider/facebook/callback', () => {
    it('Should return refresh cookie', async () => {
      const passportMiddleware = PlatformTest.get<PassportMiddleware>(PassportMiddleware);

      jest
        // @ts-expect-error ass
        .spyOn(passportMiddleware.protocolsService.strategies.get('facebook')!._oauth2, 'getOAuthAccessToken')
        // @ts-expect-error ass
        .mockImplementation((code, params, cb) => cb(null, 'accessToken', 'refreshToken', 'params'));

      jest
        // @ts-expect-error ass
        .spyOn(passportMiddleware.protocolsService.strategies.get('facebook')!, '_loadUserProfile')
        // @ts-expect-error ass
        .mockImplementation((accessToken, cb) => cb(null, {}));

      jest.spyOn(authService, 'facebook').mockResolvedValue(TokensStub);

      expect.assertions(3);

      const response = await request.get('/provider/facebook/callback').query({ code: 'code' });

      const cookie = response.headers['set-cookie'].find((cookie: string) =>
        cookie.startsWith(`${CookieName.Refresh}=`)
      );

      expect(response.status).toBe(302);
      expect(response.header.location).toEqual(`${configService.config.frontend.url}/auth/callback?access=access`);
      expect(cookie).toEqual(expect.stringContaining(`${CookieName.Refresh}=refresh;`));
    });
  });
});
