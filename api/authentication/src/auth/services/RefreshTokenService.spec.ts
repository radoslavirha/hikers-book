import { JWT_PAYLOAD, REFRESH_TOKEN } from '@hikers-book/tsed-common/stubs';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { PlatformTest } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import ms from 'ms';
import { ConfigService } from '../../global/services/ConfigService';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { CookieName, RefreshToken } from '../models';
import { CredentialsStub, CredentialsStubPopulated, RefreshTokenStub, TokensStub, UserStubId } from '../test/stubs';
import { JWTService } from './JWTService';
import { RefreshTokenService } from './RefreshTokenService';
import { CredentialsMongoService } from './mongo/CredentialsMongoService';
import { RefreshTokenMongoService } from './mongo/RefreshTokenMongoService';

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;
  let jwtService: JWTService;
  let configService: ConfigService;
  let refreshTokenMongoService: RefreshTokenMongoService;
  let credentialsService: CredentialsMongoService;

  beforeAll(TestAuthenticationApiContext.bootstrap());
  beforeAll(() => {
    service = PlatformTest.get<RefreshTokenService>(RefreshTokenService);
    jwtService = PlatformTest.get<JWTService>(JWTService);
    configService = PlatformTest.get<ConfigService>(ConfigService);
    refreshTokenMongoService = PlatformTest.get<RefreshTokenMongoService>(RefreshTokenMongoService);
    credentialsService = PlatformTest.get<CredentialsMongoService>(CredentialsMongoService);
  });
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(TestAuthenticationApiContext.reset);

  describe('verifyRefreshAndRemove', () => {
    beforeEach(() => {
      // @ts-expect-error private method
      jest.spyOn(service, 'decode').mockResolvedValue({ ...JWT_PAYLOAD, jti: 'jti' });
      // @ts-expect-error private method
      jest.spyOn(service, 'findRefreshToken').mockResolvedValue(RefreshTokenStub);
      // @ts-expect-error private method
      jest.spyOn(service, 'deleteRefreshToken').mockImplementation();
      jest.spyOn(service, 'unsetRefreshCookie').mockImplementation();
    });

    it('Should call checkIfRTExist()', async () => {
      // @ts-expect-error private method
      const spy = jest.spyOn(service, 'checkIfRTExist');

      await service.verifyRefreshAndRemove(REFRESH_TOKEN);

      expect(spy).toHaveBeenCalledWith(REFRESH_TOKEN);
    });

    it('Should call decode()', async () => {
      // @ts-expect-error private method
      const spy = jest.spyOn(service, 'decode');

      await service.verifyRefreshAndRemove(REFRESH_TOKEN);

      expect(spy).toHaveBeenCalledWith(REFRESH_TOKEN);
    });

    it('Should call findRefreshToken()', async () => {
      // @ts-expect-error private method
      const spy = jest.spyOn(service, 'findRefreshToken');

      await service.verifyRefreshAndRemove(REFRESH_TOKEN);

      expect(spy).toHaveBeenCalledWith('jti', JWT_PAYLOAD.id);
    });

    it('Should call deleteRefreshToken()', async () => {
      // @ts-expect-error private method
      const spy = jest.spyOn(service, 'deleteRefreshToken');

      await service.verifyRefreshAndRemove(REFRESH_TOKEN);

      expect(spy).toHaveBeenCalledWith(RefreshTokenStub);
    });

    it('Should return token', async () => {
      const response = await service.verifyRefreshAndRemove(REFRESH_TOKEN);

      expect(response).toEqual(RefreshTokenStub);
    });
  });

  describe('createRefreshTokenAndSave', () => {
    beforeEach(() => {
      jest.spyOn(credentialsService, 'findByUserId').mockResolvedValue(CredentialsStubPopulated);
      // @ts-expect-error private method
      jest.spyOn(service, 'checkIfCredentialsExist').mockImplementation();
      jest.spyOn(jwtService, 'createTokenPair').mockResolvedValue(TokensStub);
      jest.spyOn(jwtService, 'decodeRT').mockResolvedValue({ ...JWT_PAYLOAD, jti: 'jti' });
      jest.spyOn(service, 'createRefreshToken').mockImplementation();
    });

    it('Should call credentialsService.findByUserId()', async () => {
      const spy = jest.spyOn(credentialsService, 'findByUserId');

      await service.createRefreshTokenAndSave(RefreshTokenStub);

      expect(spy).toHaveBeenCalledWith(RefreshTokenStub.user_id);
    });

    it('Should call checkIfCredentialsExist()', async () => {
      // @ts-expect-error private method
      const spy = jest.spyOn(service, 'checkIfCredentialsExist');

      await service.createRefreshTokenAndSave(RefreshTokenStub);

      expect(spy).toHaveBeenCalledWith(CredentialsStubPopulated);
    });

    it('Should call jwtService.createTokenPair()', async () => {
      const spy = jest.spyOn(jwtService, 'createTokenPair');

      await service.createRefreshTokenAndSave(RefreshTokenStub);

      expect(spy).toHaveBeenCalledWith(CredentialsStubPopulated);
    });

    it('Should call jwtService.decodeRT()', async () => {
      const spy = jest.spyOn(jwtService, 'decodeRT');

      await service.createRefreshTokenAndSave(RefreshTokenStub);

      expect(spy).toHaveBeenCalledWith(TokensStub.refresh);
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

  describe('checkIfRTExist', () => {
    it('Should return error', async () => {
      expect.assertions(2);

      try {
        // @ts-expect-error private method
        service.checkIfRTExist();
      } catch (error) {
        expect(error).toBeInstanceOf(Unauthorized);
        expect((error as Unauthorized).message).toEqual('Refresh token is missing.');
      }
    });

    it('Should pass', async () => {
      expect.assertions(0);

      try {
        // @ts-expect-error private method
        service.checkIfRTExist(TokensStub.refresh);
      } catch (error) {
        expect(error).not.toBeDefined();
      }
    });
  });

  describe('checkIfCredentialsExist', () => {
    it('Should return error', async () => {
      expect.assertions(2);

      try {
        // @ts-expect-error private method
        service.checkIfCredentialsExist(null);
      } catch (error) {
        expect(error).toBeInstanceOf(Unauthorized);
        expect((error as Unauthorized).message).toEqual('Invalid credentials.');
      }
    });

    it('Should pass', async () => {
      expect.assertions(0);

      try {
        // @ts-expect-error private method
        service.checkIfCredentialsExist(CredentialsStub);
      } catch (error) {
        expect(error).not.toBeDefined();
      }
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

  describe('findRefreshToken', () => {
    it('Should call refreshTokenMongoService.create()', async () => {
      const spy = jest.spyOn(refreshTokenMongoService, 'find').mockResolvedValue(RefreshTokenStub);
      expect.assertions(1);

      // @ts-expect-error private method
      await service.findRefreshToken('jti', UserStubId);

      expect(spy).toHaveBeenCalledWith('jti', UserStubId);
    });

    it('Should return 401', async () => {
      jest.spyOn(refreshTokenMongoService, 'find').mockResolvedValue(null);

      expect.assertions(2);

      try {
        // @ts-expect-error private method
        await service.findRefreshToken('jti', UserStubId);
      } catch (error) {
        expect(error).toBeInstanceOf(Unauthorized);
        expect((error as Unauthorized).message).toEqual('Refresh token does not exist.');
      }
    });

    it('Should pass', async () => {
      jest.spyOn(refreshTokenMongoService, 'find').mockResolvedValue(RefreshTokenStub);

      expect.assertions(1);

      // @ts-expect-error private method
      const response = await service.findRefreshToken('jti', UserStubId);

      expect(response).toStrictEqual(RefreshTokenStub);
    });
  });

  describe('deleteRefreshToken', () => {
    it('Should call refreshTokenMongoService.delete()', async () => {
      const spy = jest.spyOn(refreshTokenMongoService, 'deleteByJTI').mockImplementation();
      expect.assertions(1);

      // @ts-expect-error private method
      await service.deleteRefreshToken(RefreshTokenStub);

      expect(spy).toHaveBeenCalledWith(RefreshTokenStub.token_jti);
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
});
