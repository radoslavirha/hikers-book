import { JWT_PAYLOAD, REFRESH_TOKEN } from '@hikers-book/tsed-common/stubs';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { PlatformTest } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import ms from 'ms';
import { ConfigService } from '../../global/services/ConfigService';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { CookieName, RefreshToken } from '../models';
import { CredentialsStubPopulated, RefreshTokenStub, TokensStub } from '../test/stubs';
import { JWTService } from './JWTService';
import { CredentialsMongoService } from './mongo/CredentialsMongoService';
import { RefreshTokenMongoService } from './mongo/RefreshTokenMongoService';
import { RefreshTokenService } from './RefreshTokenService';

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;
  let jwtService: JWTService;
  let configService: ConfigService;
  let refreshTokenMongoService: RefreshTokenMongoService;
  let credentialsService: CredentialsMongoService;

  let deleteSpy: jest.SpyInstance;

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeEach(async () => {
    service = PlatformTest.get<RefreshTokenService>(RefreshTokenService);
    jwtService = PlatformTest.get<JWTService>(JWTService);
    configService = PlatformTest.get<ConfigService>(ConfigService);
    refreshTokenMongoService = PlatformTest.get<RefreshTokenMongoService>(RefreshTokenMongoService);
    credentialsService = PlatformTest.get<CredentialsMongoService>(CredentialsMongoService);

    jest.spyOn(jwtService, 'decodeRT').mockResolvedValue({ ...JWT_PAYLOAD, jti: 'jti' });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(TestAuthenticationApiContext.reset);

  describe('verifyRefreshAndRemove', () => {
    beforeEach(() => {
      jest.spyOn(service, 'unsetRefreshCookie').mockImplementation();
      jest.spyOn(refreshTokenMongoService, 'find').mockResolvedValue(RefreshTokenStub);
      deleteSpy = jest.spyOn(refreshTokenMongoService, 'deleteByJTI').mockImplementation();
    });

    it('Should return token', async () => {
      const response = await service.verifyRefreshAndRemove(REFRESH_TOKEN);

      expect(response).toEqual(RefreshTokenStub);
    });

    it('Should delete token', async () => {
      await service.verifyRefreshAndRemove(REFRESH_TOKEN);

      expect(deleteSpy).toHaveBeenCalledWith(RefreshTokenStub.token_jti);
    });

    it('Should handle missing token', async () => {
      expect.assertions(2);

      try {
        await service.verifyRefreshAndRemove();
      } catch (error) {
        expect(error).toBeInstanceOf(Unauthorized);
        expect((error as Unauthorized).message).toEqual('Refresh token is missing.');
      }
    });

    it('Should return 401 - refresh token not found', async () => {
      jest.spyOn(refreshTokenMongoService, 'find').mockResolvedValue(null);

      expect.assertions(2);

      try {
        await service.verifyRefreshAndRemove(REFRESH_TOKEN);
      } catch (error) {
        expect(error).toBeInstanceOf(Unauthorized);
        expect((error as Unauthorized).message).toEqual('Refresh token does not exist.');
      }
    });
  });

  describe('createRefreshTokenAndSave', () => {
    beforeEach(() => {
      jest.spyOn(credentialsService, 'findByUserId').mockResolvedValue(CredentialsStubPopulated);
      jest.spyOn(jwtService, 'createTokenPair').mockResolvedValue(TokensStub);
      jest.spyOn(jwtService, 'decodeRT').mockResolvedValue({ ...JWT_PAYLOAD, jti: 'jti' });
      jest.spyOn(service, 'createRefreshToken').mockImplementation();
    });

    it('Should throw 401 when no credentials', async () => {
      jest.spyOn(credentialsService, 'findByUserId').mockResolvedValue(null);

      expect.assertions(2);

      try {
        await service.createRefreshTokenAndSave(RefreshTokenStub);
      } catch (error) {
        expect(error).toBeInstanceOf(Unauthorized);
        expect((error as Unauthorized).message).toEqual('Invalid credentials.');
      }
    });

    it('Should call credentialsService.findByUserId()', async () => {
      const spy = jest.spyOn(credentialsService, 'findByUserId');

      await service.createRefreshTokenAndSave(RefreshTokenStub);

      expect(spy).toHaveBeenCalledWith(RefreshTokenStub.user_id);
    });

    it('Should call jwtService.createTokenPair()', async () => {
      const spy = jest.spyOn(jwtService, 'createTokenPair');

      await service.createRefreshTokenAndSave(RefreshTokenStub);

      expect(spy).toHaveBeenCalledWith(CredentialsStubPopulated);
    });

    it('Should call createRefreshToken()', async () => {
      const spy = jest.spyOn(service, 'createRefreshToken');

      await service.createRefreshTokenAndSave(RefreshTokenStub);

      expect(spy).toHaveBeenCalledWith(
        CommonUtils.buildModel(RefreshToken, { token_jti: 'jti', user_id: CredentialsStubPopulated.user!.id })
      );
    });

    it('Should return tokens', async () => {
      const response = await service.createRefreshTokenAndSave(RefreshTokenStub);

      expect(response).toEqual(TokensStub);
    });
  });

  describe('createRefreshToken', () => {
    it('Should call refreshTokenMongoService.create()', async () => {
      const spy = jest.spyOn(refreshTokenMongoService, 'create').mockResolvedValue(RefreshTokenStub);
      expect.assertions(1);

      await service.createRefreshToken(RefreshTokenStub);

      expect(spy).toHaveBeenCalledWith(RefreshTokenStub);
    });

    it('Should pass', async () => {
      jest.spyOn(refreshTokenMongoService, 'create').mockResolvedValue(RefreshTokenStub);

      expect.assertions(1);

      const response = await service.createRefreshToken(RefreshTokenStub);

      expect(response).toEqual(RefreshTokenStub);
    });
  });

  describe('handleError', () => {
    it('Should call unsetRefreshCookie()', async () => {
      const spy = jest.spyOn(service, 'unsetRefreshCookie').mockImplementation();

      // @ts-expect-error types
      await service.handleError({ res: { clearCookie: jest.fn() } }, TokensStub.refresh);

      expect(spy).toHaveBeenCalled();
    });

    it('Should call decode()', async () => {
      jest.spyOn(service, 'unsetRefreshCookie').mockImplementation();
      // @ts-expect-error private method
      const spy = jest.spyOn(service, 'decode').mockImplementation();

      // @ts-expect-error types
      await service.handleError({ res: { clearCookie: jest.fn() } }, TokensStub.refresh);

      expect(spy).toHaveBeenCalled();
    });

    it('Should call refreshTokenMongoService.deleteByJTI()', async () => {
      jest.spyOn(service, 'unsetRefreshCookie').mockImplementation();
      // @ts-expect-error private method
      jest.spyOn(service, 'decode').mockResolvedValue({ ...JWT_PAYLOAD, jti: 'jti' });
      const spy = jest.spyOn(refreshTokenMongoService, 'deleteByJTI').mockImplementation();

      // @ts-expect-error types
      await service.handleError({ res: { clearCookie: jest.fn() } }, TokensStub.refresh);

      expect(spy).toHaveBeenCalledWith('jti');
    });
  });

  describe('setRefreshCookie', () => {
    it('Should call res.cookie()', async () => {
      const cookie = jest.fn();

      expect.assertions(1);

      // @ts-expect-error types
      await service.setRefreshCookie({ res: { cookie } }, TokensStub.refresh);

      expect(cookie).toHaveBeenCalledWith(CookieName.Refresh, TokensStub.refresh, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: new URL(configService.config.frontend.url).hostname,
        maxAge: ms(configService.config.jwt.expiresInRefresh)
      });
    });
  });

  describe('unsetRefreshCookie', () => {
    it('Should call res.cookie()', async () => {
      const clearCookie = jest.fn();

      expect.assertions(1);

      // @ts-expect-error types
      await service.unsetRefreshCookie({ res: { clearCookie } });

      expect(clearCookie).toHaveBeenCalledWith(CookieName.Refresh);
    });
  });

  describe('decode', () => {
    it('Should call jwtService.decodeRT()', async () => {
      const spy = jest.spyOn(jwtService, 'decodeRT').mockImplementation();
      expect.assertions(1);

      try {
        // @ts-expect-error private method
        await service.decode(TokensStub.refresh);
      } catch (error) {
        expect(error).not.toBeDefined();
      }

      expect(spy).toHaveBeenCalledWith(TokensStub.refresh);
    });

    it('Should handle TokenExpiredError', async () => {
      jest.spyOn(jwtService, 'decodeRT').mockRejectedValue(new TokenExpiredError('expired', new Date()));
      expect.assertions(2);

      try {
        // @ts-expect-error private method
        await service.decode(TokensStub.refresh);
      } catch (error) {
        expect(error).toBeInstanceOf(Unauthorized);
        expect((error as Unauthorized).message).toEqual('Refresh token expired.');
      }
    });

    it('Should handle JsonWebTokenError', async () => {
      jest.spyOn(jwtService, 'decodeRT').mockRejectedValue(new JsonWebTokenError('error'));
      expect.assertions(2);

      try {
        // @ts-expect-error private method
        await service.decode(TokensStub.refresh);
      } catch (error) {
        expect(error).toBeInstanceOf(Unauthorized);
        expect((error as Unauthorized).message).toEqual('Refresh token is invalid.');
      }
    });

    it('Should throw error', async () => {
      const error = new Error('error');
      jest.spyOn(jwtService, 'decodeRT').mockRejectedValue(error);
      expect.assertions(1);

      try {
        // @ts-expect-error private method
        await service.decode(TokensStub.refresh);
      } catch (error) {
        expect(error).toEqual(error);
      }
    });
  });
});
