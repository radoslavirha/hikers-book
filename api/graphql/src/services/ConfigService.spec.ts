import { ConfigService } from './ConfigService';

describe('ConfigService', () => {
  it('should pass', async () => {
    try {
      const config = new ConfigService();

      expect(config.service).toEqual(`Hiker's Book GraphQL API`);
      expect(config.port).toEqual(5502);
    } catch (error) {
      expect(error).not.toBeDefined();
    }
  });
});
