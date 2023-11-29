import { PlatformTest } from '@tsed/common';
import { ConfigService } from '../../global/services/ConfigService';
import { StagesDataSource } from './StagesDataSource';

describe('StagesDataSource', () => {
  let datasource: StagesDataSource;

  beforeAll(PlatformTest.create);
  beforeAll(async () => {
    datasource = await PlatformTest.invoke<StagesDataSource>(StagesDataSource, [
      {
        token: ConfigService,
        use: {
          config: {
            apis: {
              hikersBook: {
                stagesAPI: 'https://fake.stages.api'
              }
            }
          }
        }
      }
    ]);
  });
  afterAll(PlatformTest.reset);

  it('Should have baseURL', () => {
    expect(datasource.baseURL).toBe('https://fake.stages.api/v1/stages');
  });
});
