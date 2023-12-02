import { PlatformTest } from '@tsed/common';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import JWT from 'jsonwebtoken';
import { ConfigService } from '../../global/services/ConfigService';
import { CryptographyUtils } from '../utils';
import { JWTService } from './JWTService';
import { KeysService } from './KeysService';

describe('JWTService', () => {
  let service: JWTService;
  let configService: ConfigService;

  beforeEach(TestMongooseContext.create);
  beforeEach(async () => {
    const keysService = PlatformTest.get<KeysService>(KeysService);

    jest.spyOn(keysService, 'getATPrivateKey').mockResolvedValue('ATPrivateKey');
    jest.spyOn(keysService, 'getATPublicKey').mockResolvedValue('ATPublicKey');
    jest.spyOn(keysService, 'getRTPrivateKey').mockResolvedValue('RTPrivateKey');
    jest.spyOn(keysService, 'getRTPublicKey').mockResolvedValue('RTPublicKey');

    service = await PlatformTest.invoke<JWTService>(JWTService, [
      {
        token: KeysService,
        use: keysService
      }
    ]);
    configService = PlatformTest.get<ConfigService>(ConfigService);
  });
  afterEach(TestMongooseContext.reset);

  describe('createAT', () => {
    it('Should be called', async () => {
      const spyJWT = jest.spyOn(JWT, 'sign').mockResolvedValue(<never>'token');
      const spyCrypto = jest.spyOn(CryptographyUtils, 'generateJWTjti').mockReturnValue('jti');

      const response = await service.createAT({ id: 'test', name: '' });

      expect(response).toBe('token');
      expect(spyJWT).toHaveBeenCalledWith({ id: 'test', name: '' }, 'ATPrivateKey', {
        algorithm: 'RS256',
        expiresIn: configService.config.jwt.expiresIn,
        jwtid: 'jti'
      });
      expect(spyCrypto).toBeCalled();
    });
  });

  describe('createRT', () => {
    it('Should be called', async () => {
      const spyJWT = jest.spyOn(JWT, 'sign').mockResolvedValue(<never>'token');
      const spyCrypto = jest.spyOn(CryptographyUtils, 'generateJWTjti').mockReturnValue('jti');

      const response = await service.createRT({ id: 'test', name: '' });

      expect(response).toBe('token');
      expect(spyJWT).toHaveBeenCalledWith({ id: 'test', name: '' }, 'RTPrivateKey', {
        algorithm: 'RS256',
        expiresIn: configService.config.jwt.expiresInRefresh,
        jwtid: 'jti'
      });
      expect(spyCrypto).toHaveBeenCalled();
    });
  });

  describe('decodeAT', () => {
    it('Should be called', async () => {
      const spyJWT = jest.spyOn(JWT, 'verify').mockResolvedValue(<never>{ id: 'test', name: '' });

      const response = await service.decodeAT('token');

      expect(response).toEqual({ id: 'test', name: '' });
      expect(spyJWT).toHaveBeenCalledWith('token', 'ATPublicKey', {
        algorithms: ['RS256'],
        ignoreExpiration: false
      });
    });

    it('Should be called - ignore expiration', async () => {
      const spyJWT = jest.spyOn(JWT, 'verify').mockResolvedValue(<never>{ id: 'test', name: '' });

      const response = await service.decodeAT('token', true);

      expect(response).toEqual({ id: 'test', name: '' });
      expect(spyJWT).toHaveBeenCalledWith('token', 'ATPublicKey', {
        algorithms: ['RS256'],
        ignoreExpiration: true
      });
    });
  });

  describe('decodeRT', () => {
    it('Should be called', async () => {
      const spyJWT = jest.spyOn(JWT, 'verify').mockResolvedValue(<never>{ id: 'test', name: '' });

      const response = await service.decodeRT('token');

      expect(response).toEqual({ id: 'test', name: '' });
      expect(spyJWT).toHaveBeenCalledWith('token', 'RTPublicKey', {
        algorithms: ['RS256'],
        ignoreExpiration: false
      });
    });

    it('Should be called - ignore expiration', async () => {
      const spyJWT = jest.spyOn(JWT, 'verify').mockResolvedValue(<never>{ id: 'test', name: '' });

      const response = await service.decodeRT('token', true);

      expect(response).toEqual({ id: 'test', name: '' });
      expect(spyJWT).toHaveBeenCalledWith('token', 'RTPublicKey', {
        algorithms: ['RS256'],
        ignoreExpiration: true
      });
    });
  });
});
