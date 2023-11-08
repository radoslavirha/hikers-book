import { FSUtils } from '@hikers-book/tsed-common/utils';
import { PlatformTest } from '@tsed/common';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import JWT from 'jsonwebtoken';
import path from 'path';
import { CryptographyUtils } from '../utils';
import { ConfigService } from './ConfigService';
import { JWTService } from './JWTService';

describe('JWTService', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  describe('createJWT', () => {
    it('Should be called', async () => {
      const service = PlatformTest.get<JWTService>(JWTService);
      const configService = PlatformTest.get<ConfigService>(ConfigService);

      const spyJWT = jest.spyOn(JWT, 'sign').mockResolvedValue(<never>'token');
      const spyFS = jest.spyOn(FSUtils, 'readFile').mockResolvedValue('privateKey');
      const spyCrypto = jest.spyOn(CryptographyUtils, 'generateJWTjti').mockReturnValue('jti');

      const response = await service.createJWT({ id: 'test', name: '' });

      expect(response).toBe('token');
      expect(spyJWT).toBeCalledWith({ id: 'test', name: '' }, 'privateKey', {
        algorithm: configService.config.jwt.algorithm,
        expiresIn: configService.config.jwt.expiresIn,
        jwtid: 'jti'
      });
      expect(spyFS).toBeCalledWith(path.resolve(__dirname, '../../../keys/jwt.pem'));
      expect(spyCrypto).toBeCalled();
    });

    it('Should be called for refresh', async () => {
      const service = PlatformTest.get<JWTService>(JWTService);
      const configService = PlatformTest.get<ConfigService>(ConfigService);

      const spyJWT = jest.spyOn(JWT, 'sign').mockResolvedValue(<never>'token');
      const spyFS = jest.spyOn(FSUtils, 'readFile').mockResolvedValue('privateKey');
      const spyCrypto = jest.spyOn(CryptographyUtils, 'generateJWTjti').mockReturnValue('jti');

      const response = await service.createJWT({ id: 'test', name: '' }, true);

      expect(response).toBe('token');
      expect(spyJWT).toBeCalledWith({ id: 'test', name: '' }, 'privateKey', {
        algorithm: configService.config.jwt.algorithm,
        expiresIn: configService.config.jwt.expiresInRefresh,
        jwtid: 'jti'
      });
      expect(spyFS).toBeCalledWith(path.resolve(__dirname, '../../../keys/jwt.pem'));
      expect(spyCrypto).toBeCalled();
    });
  });

  describe('decodeJWT', () => {
    it('Should be called', async () => {
      const service = PlatformTest.get<JWTService>(JWTService);
      const configService = PlatformTest.get<ConfigService>(ConfigService);

      const spyJWT = jest.spyOn(JWT, 'verify').mockResolvedValue(<never>{ id: 'test', name: '' });
      const spyFS = jest.spyOn(FSUtils, 'readFile').mockResolvedValue('publicKey');

      const response = await service.decodeJWT('token');

      expect(response).toEqual({ id: 'test', name: '' });
      expect(spyJWT).toBeCalledWith('token', 'publicKey', {
        algorithms: [configService.config.jwt.algorithm],
        ignoreExpiration: false
      });
      expect(spyFS).toBeCalledWith(path.resolve(__dirname, '../../../keys/jwt.pem.pub'));
    });

    it('Should be called for refresh', async () => {
      const service = PlatformTest.get<JWTService>(JWTService);
      const configService = PlatformTest.get<ConfigService>(ConfigService);

      const spyJWT = jest.spyOn(JWT, 'verify').mockResolvedValue(<never>{ id: 'test', name: '' });
      const spyFS = jest.spyOn(FSUtils, 'readFile').mockResolvedValue('publicKey');

      const response = await service.decodeJWT('token', true);

      expect(response).toEqual({ id: 'test', name: '' });
      expect(spyJWT).toBeCalledWith('token', 'publicKey', {
        algorithms: [configService.config.jwt.algorithm],
        ignoreExpiration: true
      });
      expect(spyFS).toBeCalledWith(path.resolve(__dirname, '../../../keys/jwt.pem.pub'));
    });
  });
});
