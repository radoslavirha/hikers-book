import { JWT_PAYLOAD, REFRESH_TOKEN } from '@hikers-book/tsed-common/stubs';
import { PlatformTest } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import SuperTest from 'supertest';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { CookieName } from '../models';
import { JWTService } from '../services/JWTService';
import { RefreshTokenService } from '../services/RefreshTokenService';
import { RefreshTokenStub, TokensStub } from '../test/stubs';
import { AuthenticateController } from './AuthenticateController';

describe('AuthenticateController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(
    TestAuthenticationApiContext.bootstrap({
      mount: {
        '/': [AuthenticateController]
      }
    })
  );
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterAll(TestAuthenticationApiContext.reset);

  describe('GET /auth/authenticate', () => {
    it('Should pass', async () => {
      const service = PlatformTest.get<JWTService>(JWTService);
      const access = await service.createAT(JWT_PAYLOAD);

      const response = await request.get('/authenticate').set({ Authorization: `Bearer ${access}` });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(JWT_PAYLOAD);
    });
  });

  describe('GET /auth/refresh', () => {
    let refreshTokenService: RefreshTokenService;

    beforeEach(() => {
      refreshTokenService = PlatformTest.get<RefreshTokenService>(RefreshTokenService);

      jest.spyOn(refreshTokenService, 'verifyRefreshAndRemove').mockResolvedValue(RefreshTokenStub);
      jest.spyOn(refreshTokenService, 'createRefreshTokenAndSave').mockResolvedValue(TokensStub);
      jest.spyOn(refreshTokenService, 'setRefreshCookie').mockImplementation();
    });

    it('Should pass and return 200', async () => {
      const response = await request.get('/refresh').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        access: TokensStub.access
      });
    });

    it('Should call refreshTokenService.verifyRefreshAndRemove()', async () => {
      const spy = jest.spyOn(refreshTokenService, 'verifyRefreshAndRemove');

      await request.get('/refresh').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      // How to test this? Cannot have request instance
      expect(spy).toHaveBeenCalledWith(REFRESH_TOKEN);
    });

    it('Should call refreshTokenService.createRefreshTokenAndSave()', async () => {
      const spy = jest.spyOn(refreshTokenService, 'createRefreshTokenAndSave');

      await request.get('/refresh').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      expect(spy).toHaveBeenCalledWith(RefreshTokenStub);
    });

    it('Should call refreshTokenService.setRefreshCookie()', async () => {
      const spy = jest.spyOn(refreshTokenService, 'setRefreshCookie');

      await request.get('/refresh').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      // How to test this? Cannot have request instance
      expect(spy).toHaveBeenCalledWith(expect.anything(), TokensStub.refresh);
    });

    it('Should call refreshTokenService.handleError()', async () => {
      jest.spyOn(refreshTokenService, 'verifyRefreshAndRemove').mockImplementation(() => {
        throw new Unauthorized('Refresh token expired.');
      });
      const spy = jest.spyOn(refreshTokenService, 'handleError');

      await request.get('/refresh').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      // How to test this? Cannot have request instance
      expect(spy).toHaveBeenCalledWith(expect.anything(), REFRESH_TOKEN);
    });
  });

  describe('GET /auth/logout', () => {
    let refreshTokenService: RefreshTokenService;

    beforeEach(() => {
      refreshTokenService = PlatformTest.get<RefreshTokenService>(RefreshTokenService);

      jest.spyOn(refreshTokenService, 'verifyRefreshAndRemove').mockImplementation();
    });

    it('Should pass and return 200', async () => {
      const response = await request.get('/logout').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      expect(response.statusCode).toBe(200);
    });

    it('Should call refreshTokenService.unsetRefreshCookie()', async () => {
      const spy = jest.spyOn(refreshTokenService, 'unsetRefreshCookie');

      await request.get('/logout').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      // How to test this? Cannot have request instance
      expect(spy).toHaveBeenCalledWith(expect.anything());
    });

    it('Should call refreshTokenService.verifyRefreshAndRemove()', async () => {
      const spy = jest.spyOn(refreshTokenService, 'verifyRefreshAndRemove');

      await request.get('/logout').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      // How to test this? Cannot have request instance
      expect(spy).toHaveBeenCalledWith(REFRESH_TOKEN);
    });

    it('Should call refreshTokenService.handleError()', async () => {
      jest.spyOn(refreshTokenService, 'verifyRefreshAndRemove').mockImplementation(() => {
        throw new Unauthorized('Refresh token expired.');
      });
      const spy = jest.spyOn(refreshTokenService, 'handleError');

      await request.get('/logout').set('Cookie', [`${CookieName.Refresh}=${REFRESH_TOKEN}`]);

      // How to test this? Cannot have request instance
      expect(spy).toHaveBeenCalledWith(expect.anything(), REFRESH_TOKEN);
    });
  });
});
