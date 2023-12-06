import { REFRESH_TOKEN } from '@hikers-book/tsed-common/stubs';
import { PlatformTest } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import SuperTest from 'supertest';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { CookieName } from '../models';
import { RefreshTokenService } from '../services/RefreshTokenService';
import { RefreshTokenStub, TokensStub } from '../test/stubs';
import { AuthenticateController } from './AuthenticateController';

describe('AuthenticateController - production', () => {
  process.env.NODE_ENV = 'production';

  let request: SuperTest.SuperTest<SuperTest.Test>;

  let refreshTokenService: RefreshTokenService;

  beforeAll(
    TestAuthenticationApiContext.bootstrap({
      mount: {
        '/': [AuthenticateController]
      }
    })
  );
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
    refreshTokenService = PlatformTest.get<RefreshTokenService>(RefreshTokenService);
  });

  afterAll(TestAuthenticationApiContext.reset);

  describe('GET /auth/refresh', () => {
    it('Should pass', async () => {
      jest.spyOn(refreshTokenService, 'verifyRefreshAndRemove').mockResolvedValue(RefreshTokenStub);
      jest.spyOn(refreshTokenService, 'createRefreshTokenAndSave').mockResolvedValue(TokensStub);

      const response = await request.get('/refresh').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      const cookie = response.headers['set-cookie'].find((cookie: string) =>
        cookie.startsWith(`${CookieName.Refresh}=`)
      );

      expect(response.status).toEqual(200);
      expect(cookie).toEqual(expect.stringContaining(`${CookieName.Refresh}=refresh;`));
    });

    it('Should clear cookies on error', async () => {
      jest
        .spyOn(refreshTokenService, 'verifyRefreshAndRemove')
        .mockRejectedValue(new Unauthorized('Refresh token expired.'));

      const response = await request.get('/refresh').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      const cookie = response.headers['set-cookie'].find((cookie: string) =>
        cookie.startsWith(`${CookieName.Refresh}=`)
      );

      expect(response.status).toEqual(401);
      expect(cookie).toEqual(expect.stringContaining(`${CookieName.Refresh}=;`));
    });
  });

  describe('GET /auth/logout', () => {
    it('Should pass - clear cookies', async () => {
      jest.spyOn(refreshTokenService, 'verifyRefreshAndRemove').mockImplementation();

      const response = await request.get('/logout').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      const cookie = response.headers['set-cookie'].find((cookie: string) =>
        cookie.startsWith(`${CookieName.Refresh}=`)
      );

      expect(response.status).toEqual(200);
      expect(cookie).toEqual(expect.stringContaining(`${CookieName.Refresh}=;`));
    });

    it('Should clear cookies on error', async () => {
      jest
        .spyOn(refreshTokenService, 'verifyRefreshAndRemove')
        .mockRejectedValue(new Unauthorized('Refresh token expired.'));

      const response = await request.get('/logout').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      const cookie = response.headers['set-cookie'].find((cookie: string) =>
        cookie.startsWith(`${CookieName.Refresh}=`)
      );

      expect(response.status).toEqual(401);
      expect(cookie).toEqual(expect.stringContaining(`${CookieName.Refresh}=;`));
    });
  });
});
