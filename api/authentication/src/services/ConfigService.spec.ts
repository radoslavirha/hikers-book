import { ConfigService } from './ConfigService';

describe('ConfigService', () => {
  it('should pass', async () => {
    try {
      const config = new ConfigService();

      expect(config.service).toEqual(`Hiker's Book Authentication API`);
      expect(config.port).toEqual(5501);
    } catch (error) {
      expect(error).not.toBeDefined();
    }
  });
});
