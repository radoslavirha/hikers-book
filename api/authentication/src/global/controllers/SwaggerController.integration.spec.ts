import { ConfigLoder } from '@hikers-book/tsed-common/server';
import { PlatformTest } from '@tsed/common';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import SuperTest from 'supertest';
import { Server } from '../../Server';
import { ConfigService } from '../services';
import { SwaggerController } from './SwaggerController';

describe('SwaggerController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  const config = new ConfigLoder(ConfigService.service, ConfigService.port, ConfigService.configModel);

  beforeEach(
    TestMongooseContext.bootstrap(Server, {
      mount: {
        '/': [SwaggerController]
      },
      swagger: config.swagger
    })
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(TestMongooseContext.reset);

  it('should call GET /', async () => {
    const response = await request.get('/').expect(200);

    expect(response.text).toContain(`<img src="https://tsed.io/tsed-og.png" alt="Ts.ED">`);
  });
});
