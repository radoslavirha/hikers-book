import { PlatformTest } from '@tsed/common';
import { PassportMiddleware } from '@tsed/passport';
import SuperTest from 'supertest';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { ProtocolAuthService } from '../../services/ProtocolAuthService';
import { AuthProviderGithubController } from './GithubController';

describe('AuthProviderGithubController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  let authService: ProtocolAuthService;

  beforeAll(
    TestAuthenticationApiContext.bootstrap({
      mount: {
        '/': [AuthProviderGithubController]
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

  describe('GET /auth/provider/github', () => {
    it('Should have 302 status and redirect', async () => {
      expect.assertions(3);

      const response = await request.get('/auth/provider/github');

      expect(response.status).toEqual(302);
      expect(response.redirect).toEqual(true);
      expect(response.headers.location).toEqual(expect.stringContaining('github.com'));
    });
  });

  describe('GET /auth/provider/github/callback', () => {
    it('Should call authService.github()', async () => {
      const passportMiddleware = PlatformTest.get<PassportMiddleware>(PassportMiddleware);

      jest
        // @ts-expect-error ass
        .spyOn(passportMiddleware.protocolsService.strategies.get('github')!._oauth2, 'getOAuthAccessToken')
        // @ts-expect-error ass
        .mockImplementation((code, params, cb) => cb(null, 'accessToken', 'refreshToken', 'params'));

      jest
        // @ts-expect-error ass
        .spyOn(passportMiddleware.protocolsService.strategies.get('github')!, '_loadUserProfile')
        // @ts-expect-error ass
        .mockImplementation((accessToken, cb) => cb(null, {}));

      const spy = jest.spyOn(authService, 'github').mockImplementation();

      expect.assertions(1);

      await request.get('/auth/provider/github/callback').query({ code: 'code' });

      expect(spy).toHaveBeenCalledWith({}, 'accessToken', 'refreshToken');
    });
  });
});
