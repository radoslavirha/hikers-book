import { AuthenticateService } from '@hikers-book/tsed-common/services';
import { BEARER_TOKEN, JWT_PAYLOAD } from '@hikers-book/tsed-common/stubs';
import { TestUtils } from '@hikers-book/tsed-common/utils';
import { PlatformTest } from '@tsed/common';
import SuperTest from 'supertest';
import { TestTripsApiContext } from '../../test/TestTripsApiContext';
import { TripMongoService } from '../services/mongo/TripMongoService';
import { TripStub } from '../test/stubs';
import { TripsController } from './TripsController';

describe('TripsController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let service: TripMongoService;

  beforeAll(
    TestTripsApiContext.bootstrap({
      mount: {
        '/': [TripsController]
      }
    })
  );
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
    service = PlatformTest.get<TripMongoService>(TripMongoService);
    const authService = PlatformTest.get<AuthenticateService>(AuthenticateService);

    jest.spyOn(authService, 'authenticate').mockResolvedValue(JWT_PAYLOAD);
  });

  afterAll(TestTripsApiContext.reset);

  describe('GET /', () => {
    let spy: jest.SpyInstance;

    beforeAll(() => {
      spy = jest.spyOn(service, 'find').mockResolvedValue([TripStub]);
    });

    it('Should return 200', async () => {
      const response = await request.get('/trips').set({ Authorization: BEARER_TOKEN });

      expect(response.body).toEqual([TestUtils.stringifyStubTimestamps(TripStub)]);
      expect(response.status).toBe(200);
    });

    it('Should call tripMongoService.find()', async () => {
      await request.get('/trips').set({ Authorization: BEARER_TOKEN });

      expect(spy).toHaveBeenCalled();
    });
  });
});
