import { $log, PlatformTest } from '@tsed/common';
import SuperTest from 'supertest';
import { BaseServer } from './ServerBase';

describe('ServerBase', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let server: BaseServer;

  beforeEach(
    PlatformTest.bootstrap(BaseServer, {
      api: {
        service: 'test',
        version: '0.0.1'
      }
    })
  );
  beforeEach(() => {
    server = PlatformTest.get<BaseServer>(BaseServer);
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it('$onReady', async () => {
    const spy = jest.spyOn($log, 'info').mockImplementation();

    server.$onReady();

    expect(spy).toBeCalledWith('test 0.0.1 is ready!');
  });

  it('registerMiddlewares', async () => {
    const logSpy = jest.spyOn($log, 'info').mockImplementation();
    // @ts-expect-error protected method
    const appSpy = jest.spyOn(server.app, 'use');

    // @ts-expect-error protected method
    server.registerMiddlewares();

    expect(logSpy).toBeCalledWith('Registering common middlewares...');
    expect(appSpy).toBeCalledTimes(6);
  });

  it('Should call GET /rest', async () => {
    const response = await request.get('/rest').expect(404);

    expect(response.body).toEqual({
      errors: [],
      message: 'Resource "/rest" not found',
      name: 'NOT_FOUND',
      status: 404
    });
  });
});
