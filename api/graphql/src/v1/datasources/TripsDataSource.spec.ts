import { PlatformTest } from '@tsed/common';
import { ConfigService } from '../../global/services/ConfigService';
import { TripsDataSource } from './TripsDataSource';

describe('TripsDataSource', () => {
  let datasource: TripsDataSource;

  beforeAll(PlatformTest.create);
  beforeAll(async () => {
    datasource = await PlatformTest.invoke<TripsDataSource>(TripsDataSource, [
      {
        token: ConfigService,
        use: {
          config: {
            apis: {
              hikersBook: {
                tripsAPI: 'https://fake.trips.api'
              }
            }
          }
        }
      }
    ]);
  });
  afterAll(PlatformTest.reset);

  it('Should have baseURL', () => {
    expect(datasource.baseURL).toBe('https://fake.trips.api/v1/trips');
  });
});
