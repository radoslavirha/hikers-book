import SuperTest from 'supertest';
import { HelloWorldController } from './HelloWorldController';
import { Server } from '../../Server';
import { TestMongooseContext } from '@tsed/testing-mongoose';

describe('HelloWorldController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    TestMongooseContext.bootstrap(Server, {
      mount: {
        '/': [HelloWorldController]
      }
    })
  );
  beforeEach(() => {
    request = SuperTest(TestMongooseContext.callback());
  });

  afterEach(TestMongooseContext.reset);

  it('should call GET /hello-world', async () => {
    const response = await request.get('/hello-world').expect(200);

    expect(response.text).toEqual('hello');
  });
});
