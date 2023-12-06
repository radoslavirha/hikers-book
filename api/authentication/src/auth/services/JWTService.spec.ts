import { PlatformTest } from '@tsed/common';
import { UnprocessableEntity } from '@tsed/exceptions';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import JWT from 'jsonwebtoken';
import { ConfigService } from '../../global/services/ConfigService';
import { TokensPair } from '../models';
import { CredentialsStub, CredentialsStubPopulated } from '../test/stubs';
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

      expect(response).toEqual('token');
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

      expect(response).toEqual('token');
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

  describe('createTokenPair', () => {
    let spyAT: jest.SpyInstance;
    let spyRT: jest.SpyInstance;

    beforeEach(() => {
      spyAT = jest.spyOn(service, 'createAT').mockResolvedValueOnce('access');
      spyRT = jest.spyOn(service, 'createRT').mockResolvedValueOnce('refresh');
    });

    it('Should throw 422', async () => {
      expect.assertions(3);

      try {
        await service.createTokenPair(CredentialsStub);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntity);
        expect((error as UnprocessableEntity).status).toBe(422);
        expect((error as UnprocessableEntity).message).toEqual('Cannot generate JWT.');
      }
    });

    it('Should call createAT() and createRT()', async () => {
      expect.assertions(4);

      await service.createTokenPair(CredentialsStubPopulated);

      expect(spyAT).toHaveBeenCalledTimes(1);
      expect(spyRT).toHaveBeenCalledTimes(1);
      expect(spyAT).toHaveBeenCalledWith({
        id: CredentialsStubPopulated.user_id,
        name: CredentialsStubPopulated.user!.full_name
      });
      expect(spyRT).toHaveBeenCalledWith({
        id: CredentialsStubPopulated.user_id,
        name: CredentialsStubPopulated.user!.full_name
      });
    });

    it('Should return access', async () => {
      expect.assertions(2);

      const tokens = await service.createTokenPair(CredentialsStubPopulated);

      expect(tokens).toBeInstanceOf(TokensPair);
      expect(tokens).toEqual({
        access: 'access',
        refresh: 'refresh'
      });
    });
  });
});
