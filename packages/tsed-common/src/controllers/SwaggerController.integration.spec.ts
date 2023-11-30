import { PlatformTest } from '@tsed/common';
import { join } from 'path';
import SuperTest from 'supertest';
import { BaseServer } from '../server/ServerBase';
import { SwaggerController } from './SwaggerController';

describe('SwaggerController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(BaseServer, {
      mount: {
        '/': [SwaggerController]
      },
      views: {
        root: join(process.cwd(), 'src/views'),
        extensions: {
          ejs: 'ejs'
        }
      },
      swagger: []
    })
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  fit('Should call GET /', async () => {
    const response = await request.get('/');

    expect(response.text).toContain(`<img src="https://tsed.io/tsed-og.png" alt="Ts.ED">`);
    expect(response.status).toEqual(200);
  });
});
