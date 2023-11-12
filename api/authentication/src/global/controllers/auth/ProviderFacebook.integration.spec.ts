import { PlatformTest } from '@tsed/common';
import { PassportMiddleware } from '@tsed/passport';
import {} from 'passport-facebook';
import SuperTest from 'supertest';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { ProtocolAuthService } from '../../services/ProtocolAuthService';
import { FacebookProviderController } from './ProviderFacebook';

describe('FacebookProviderController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  let authService: ProtocolAuthService;

  beforeAll(
    TestAuthenticationApiContext.bootstrap({
      mount: {
        '/': [FacebookProviderController]
      }
    })
  );
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());

    authService = PlatformTest.get<ProtocolAuthService>(ProtocolAuthService);
  });
  beforeEach(() => {
    TestAuthenticationApiContext.clearDatabase();
  });

  afterAll(TestAuthenticationApiContext.reset);

  describe('GET /auth/provider/facebook', () => {
    it('Should have 302 status and redirect', async () => {
      expect.assertions(3);

      const response = await request.get('/auth/provider/facebook');

      expect(response.status).toEqual(302);
      expect(response.redirect).toEqual(true);
      expect(response.headers.location).toEqual(expect.stringContaining('facebook.com'));
    });
  });

  describe('GET /auth/provider/facebook/callback', () => {
    it('Should call authService.facebook()', async () => {
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

      const spy = jest.spyOn(authService, 'facebook').mockImplementation();

      expect.assertions(1);

      await request.get('/auth/provider/facebook/callback').query({ code: 'code' });

      expect(spy).toHaveBeenCalledWith({}, 'accessToken', 'refreshToken');
    });
  });
});
