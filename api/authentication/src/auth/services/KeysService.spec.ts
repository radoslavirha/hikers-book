import path from 'path';
import { FSUtils } from '@hikers-book/tsed-common/utils';
import { PlatformTest } from '@tsed/common';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { KeysService } from './KeysService';

describe('KeysService', () => {
  let service: KeysService;
  let spy: jest.SpyInstance;
  let spyPath: jest.SpyInstance;
  const dir = path.resolve(__dirname, '../../../keys');
  const fileBuffer = Buffer.from('some content');

  beforeAll(TestMongooseContext.create);
  beforeAll(async () => {
    service = await PlatformTest.get<KeysService>(KeysService);
    spy = jest.spyOn(FSUtils, 'readFile').mockResolvedValue(fileBuffer);
    spyPath = jest.spyOn(path, 'join').mockReturnValue('path');
  });
  afterAll(TestMongooseContext.reset);

  describe('getATPrivateKey', () => {
    it('Should call FSUtils.readFile()', async () => {
      const response = await service.getATPrivateKey();

      expect(response).toBe(fileBuffer);
      expect(spyPath).toHaveBeenCalledWith(dir, 'access.pem');
      expect(spy).toHaveBeenCalledWith('path');
    });
  });

  describe('getATPublicKey', () => {
    it('Should call FSUtils.readFile()', async () => {
      const response = await service.getATPublicKey();

      expect(response).toBe(fileBuffer);
      expect(spyPath).toHaveBeenCalledWith(dir, 'access.pem.pub');
      expect(spy).toHaveBeenCalledWith('path');
    });
  });

  describe('getRTPrivateKey', () => {
    it('Should call FSUtils.readFile()', async () => {
      const response = await service.getRTPrivateKey();

      expect(response).toBe(fileBuffer);
      expect(spyPath).toHaveBeenCalledWith(dir, 'refresh.pem');
      expect(spy).toHaveBeenCalledWith('path');
    });
  });

  describe('getRTPublicKey', () => {
    it('Should call FSUtils.readFile()', async () => {
      const response = await service.getRTPublicKey();

      expect(response).toBe(fileBuffer);
      expect(spyPath).toHaveBeenCalledWith(dir, 'refresh.pem.pub');
      expect(spy).toHaveBeenCalledWith('path');
    });
  });
});
