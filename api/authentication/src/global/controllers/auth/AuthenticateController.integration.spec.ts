import { BEARER_TOKEN, JWT_PAYLOAD } from '@hikers-book/tsed-common/stubs';
import { PlatformTest } from '@tsed/common';
import SuperTest from 'supertest';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
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
      const response = await request.get('/auth/authenticate').set({ Authorization: BEARER_TOKEN });

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(JWT_PAYLOAD);
    });
  });
});
