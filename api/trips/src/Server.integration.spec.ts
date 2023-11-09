import { PlatformTest } from '@tsed/common';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import SuperTest from 'supertest';
import { Server } from './Server';

describe('Server', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(TestMongooseContext.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(TestMongooseContext.reset);

  it('Should call GET /rest', async () => {
    const response = await request.get('/rest').expect(404);

    expect(response.body).toEqual({
      errors: [],
      message: 'Resource "/rest" not found',
      name: 'NOT_FOUND',
      status: 404
    });
  });

  it('Should not have CSP header', async () => {
    const response = await request.get('/rest');

    expect(response.headers['content-security-policy']).not.toBeDefined();
  });
});

describe('Server - production', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });
  beforeEach(TestMongooseContext.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(TestMongooseContext.reset);

  it('Should have CSP header', async () => {
    const response = await request.get('/rest');

    expect(response.headers['content-security-policy']).toBeDefined();
  });
});
