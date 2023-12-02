import { JWT_PAYLOAD } from '@hikers-book/tsed-common/stubs';
import { PlatformTest } from '@tsed/common';
import SuperTest from 'supertest';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { JWTService } from '../services/JWTService';
import { AuthenticateController } from './AuthenticateController';

describe('AuthenticateController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(
    TestAuthenticationApiContext.bootstrap({
      mount: {
        '/': [AuthenticateController]
      }
    })
  );
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
  });
  beforeEach(() => {
    TestAuthenticationApiContext.clearDatabase();
  });

  afterAll(TestAuthenticationApiContext.reset);

  describe('GET /auth/authenticate', () => {
    it('Should pass', async () => {
      const service = PlatformTest.get<JWTService>(JWTService);
      const access = await service.createAT(JWT_PAYLOAD);

      const response = await request.get('/authenticate').set({ Authorization: `Bearer ${access}` });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(JWT_PAYLOAD);
    });
  });
});
