import { PlatformTest } from '@tsed/common';
import { ConfigService } from './ConfigService';

describe('ConfigService', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('Should pass', async () => {
    try {
      const service = PlatformTest.get<ConfigService>(ConfigService);

      expect(service.service).toEqual(`Hiker's Book Authentication API`);
      expect(service.fallbackPort).toEqual(5501);
    } catch (error) {
      expect(error).not.toBeDefined();
    }
  });
});
