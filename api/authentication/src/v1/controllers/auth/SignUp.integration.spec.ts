import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import SuperTest from 'supertest';
import { Server } from '../../../Server';
import { User } from '../../mongo/User';
import { UserService } from '../../services/User';
import { SignUpController } from './SignUp';

describe('SignUpHandler', () => {
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

  it('Should return 200 on POST /v1/auth/sign-up', async () => {
    const service = PlatformTest.get<UserService>(UserService);
    const spy = jest.spyOn(service, 'findByEmail').mockResolvedValue(null);

    const response = await request.post('/v1/auth/sign-up').send({
      email: 'tester@email.com',
      password: '8^^3286UhpB$9m'
    });

    expect(response.status).toEqual(200);
    expect(spy).toBeCalledWith('tester@email.com');
    expect(response.body).toEqual({
      jwt: expect.any(String)
    });
  });

  it('Should return 409 on POST /v1/auth/sign-up - user exists', async () => {
    const service = PlatformTest.get<UserService>(UserService);
    const model = PlatformTest.get<MongooseModel<User>>(User);
    jest.spyOn(service, 'findByEmail').mockResolvedValue(new model());

    const response = await request.post('/v1/auth/sign-up').send({
      email: 'tester@email.com',
      password: '8^^3286UhpB$9m'
    });

    expect(response.status).toEqual(409);
    expect(response.body.status).toEqual(409);
    expect(response.body.message).toEqual('User with email tester@email.com already exist!');
  });

  it('Should return 500 on POST /v1/auth/sign-up - something failed', async () => {
    const service = PlatformTest.get<UserService>(UserService);
    jest.spyOn(service, 'findByEmail').mockRejectedValue(new Error('Something failed!'));

    const response = await request.post('/v1/auth/sign-up').send({
      email: 'tester@email.com',
      password: '8^^3286UhpB$9m'
    });

    expect(response.status).toEqual(500);
    expect(response.body.status).toEqual(500);
  });
});
