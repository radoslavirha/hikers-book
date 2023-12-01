import { FSUtils } from '@hikers-book/tsed-common/utils';
import { PlatformTest } from '@tsed/common';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import path from 'path';
import { KeysService } from './KeysService';

describe('KeysService', () => {
  let service: KeysService;
  let spy: jest.SpyInstance;
  let spyPath: jest.SpyInstance;
  const fileBuffer = Buffer.from('some content');

  beforeAll(TestMongooseContext.create);
  beforeAll(async () => {
    service = await PlatformTest.get<KeysService>(KeysService);
    spy = jest.spyOn(FSUtils, 'readFile').mockResolvedValue(fileBuffer);
    spyPath = jest.spyOn(path, 'resolve').mockReturnValue('path');
  });
  afterAll(TestMongooseContext.reset);

  describe('getPrivateKey', () => {
    it('Should call FSUtils.readFile()', async () => {
      const response = await service.getPrivateKey();

      expect(response).toBe(fileBuffer);
      expect(spyPath).toHaveBeenCalledWith(__dirname, '../../../keys', 'jwt.pem');
      expect(spy).toHaveBeenCalledWith('path');
    });
  });

  describe('getPublicKey', () => {
    it('Should call FSUtils.readFile()', async () => {
      const response = await service.getPublicKey();

      expect(response).toBe(fileBuffer);
      expect(spyPath).toHaveBeenCalledWith(__dirname, '../../../keys', 'jwt.pem.pub');
      expect(spy).toHaveBeenCalledWith('path');
    });
  });
});
