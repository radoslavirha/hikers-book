import { TestMongooseContext } from '@tsed/testing-mongoose';
import SuperTest from 'supertest';
import { Server } from '../../../Server';
import { SignUpController } from './SignUp';

describe('HelloWorldController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    TestMongooseContext.bootstrap(Server, {
      mount: {
        '/': [SignUpController]
      }
    })
  );
  beforeEach(() => {
    request = SuperTest(TestMongooseContext.callback());
  });

  afterEach(TestMongooseContext.reset);

  it('should call POST /v1/auth/sign-up', async () => {
    const response = await request.post('/v1/auth/sign-up').send({
      email: 'teser@email.com',
      password: '8^^3286UhpB$9m'
    });

    expect(response.statusCode).toEqual(200);
  });
});
