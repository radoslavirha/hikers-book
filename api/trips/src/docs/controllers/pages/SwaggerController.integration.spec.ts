import { PlatformTest } from '@tsed/common';
import SuperTest from 'supertest';
import { Server } from '../../../Server';
import { SwaggerController } from './SwaggerController';

describe('IndexController (swagger)', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(Server, {
      mount: {
        '/': [SwaggerController]
      }
    })
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it('should call GET /', async () => {
    const response = await request.get('/').expect(200);

    expect(response.text).toContain(`<img src="https://tsed.io/tsed-og.png" alt="Ts.ED">`);
  });
});
