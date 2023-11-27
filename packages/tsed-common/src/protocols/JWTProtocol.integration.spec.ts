import { PlatformTest } from '@tsed/common';
import SuperTest from 'supertest';
import { BaseServer } from '../server/ServerBase';
import { AuthenticateService } from '../services/AuthenticateService';
import { TestController } from '../test/TestController';
import { BEARER_TOKEN, JWT_PAYLOAD, JWT_TOKEN } from '../test/stubs/AuthStubs';

describe('JWTProtocol', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let spy: jest.SpyInstance;
  let authService: AuthenticateService;

  beforeAll(
    PlatformTest.bootstrap(BaseServer, {
      mount: {
        '/': [TestController]
      }
    })
  );
  beforeEach(async () => {
    request = SuperTest(PlatformTest.callback());
    authService = PlatformTest.get<AuthenticateService>(AuthenticateService);
    spy = jest.spyOn(authService, 'authenticate').mockResolvedValue(JWT_PAYLOAD);
  });
  afterAll(() => PlatformTest.reset());

  it('Should pass', async () => {
    const response = await request.get('/tests').set({ Authorization: BEARER_TOKEN });

    expect(response.status).toBe(200);
  });

  it('Should fail', async () => {
    const response = await request.get('/tests');

    expect(response.status).toBe(401);
  });

  it('Should call authenticateService.authenticate()', async () => {
    await request.get('/tests').set({ Authorization: BEARER_TOKEN });

    expect(spy).toHaveBeenCalledWith(JWT_TOKEN);
  });

  it('Should return 401 after failed Authentication API request', async () => {
    jest.spyOn(authService, 'authenticate').mockRejectedValue(null);

    const response = await request.get('/tests').set({ Authorization: BEARER_TOKEN });

    expect(response.status).toBe(401);
  });
});
