import { PlatformTest } from '@tsed/common';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import JWT from 'jsonwebtoken';
import { CryptographyUtils } from '../utils';
import { ConfigService } from './ConfigService';
import { JWTService } from './JWTService';
import { KeysService } from './KeysService';

describe('JWTService', () => {
  let service: JWTService;
  let configService: ConfigService;

  beforeEach(TestMongooseContext.create);
  beforeEach(async () => {
    const keysService = PlatformTest.get<KeysService>(KeysService);

    jest.spyOn(keysService, 'getPrivateKey').mockResolvedValue('PrivateKey');
    jest.spyOn(keysService, 'getPublicKey').mockResolvedValue('PublicKey');

    service = await PlatformTest.invoke<JWTService>(JWTService, [
      {
        token: KeysService,
        use: keysService
      }
    ]);
    configService = PlatformTest.get<ConfigService>(ConfigService);
  });
  afterEach(TestMongooseContext.reset);

  describe('createJWT', () => {
    it('Should be called', async () => {
      const spyJWT = jest.spyOn(JWT, 'sign').mockResolvedValue(<never>'token');
      const spyCrypto = jest.spyOn(CryptographyUtils, 'generateJWTjti').mockReturnValue('jti');

      const response = await service.createJWT({ id: 'test', name: '' });

      expect(response).toBe('token');
      expect(spyJWT).toHaveBeenCalledWith({ id: 'test', name: '' }, 'PrivateKey', {
        algorithm: configService.config.jwt.algorithm,
        expiresIn: configService.config.jwt.expiresIn,
        jwtid: 'jti'
      });
      expect(spyCrypto).toBeCalled();
    });

    it('Should be called for refresh', async () => {
      const spyJWT = jest.spyOn(JWT, 'sign').mockResolvedValue(<never>'token');
      const spyCrypto = jest.spyOn(CryptographyUtils, 'generateJWTjti').mockReturnValue('jti');

      const response = await service.createJWT({ id: 'test', name: '' }, true);

      expect(response).toBe('token');
      expect(spyJWT).toHaveBeenCalledWith({ id: 'test', name: '' }, 'PrivateKey', {
        algorithm: configService.config.jwt.algorithm,
        expiresIn: configService.config.jwt.expiresInRefresh,
        jwtid: 'jti'
      });
      expect(spyCrypto).toHaveBeenCalled();
    });
  });

  describe('decodeJWT', () => {
    it('Should be called', async () => {
      const spyJWT = jest.spyOn(JWT, 'verify').mockResolvedValue(<never>{ id: 'test', name: '' });

      const response = await service.decodeJWT('token');

      expect(response).toEqual({ id: 'test', name: '' });
      expect(spyJWT).toHaveBeenCalledWith('token', 'PublicKey', {
        algorithms: [configService.config.jwt.algorithm],
        ignoreExpiration: false
      });
    });

    it('Should be called for refresh', async () => {
      const spyJWT = jest.spyOn(JWT, 'verify').mockResolvedValue(<never>{ id: 'test', name: '' });

      const response = await service.decodeJWT('token', true);

      expect(response).toEqual({ id: 'test', name: '' });
      expect(spyJWT).toHaveBeenCalledWith('token', 'PublicKey', {
        algorithms: [configService.config.jwt.algorithm],
        ignoreExpiration: true
      });
    });
  });
});
