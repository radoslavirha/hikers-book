import { PlatformTest } from '@tsed/common';
import { Forbidden } from '@tsed/exceptions';
import { RequestOptions } from 'apollo-datasource-rest';
import { Headers, URLSearchParams } from 'apollo-server-env';
import { ApolloError } from 'apollo-server-express';
import { HikersBookRESTDataSource } from './HikersBookRESTDataSource';

describe('HikersBookRESTDataSource production', () => {
  process.env.NODE_ENV = 'production';
  let datasource: HikersBookRESTDataSource;
  let requestOptions: RequestOptions;

  beforeAll(PlatformTest.create);
  beforeAll(async () => {
    datasource = await PlatformTest.invoke<HikersBookRESTDataSource>(HikersBookRESTDataSource);
    datasource.initialize({
      context: {},
      cache: { get: jest.fn(), set: jest.fn(), delete: jest.fn() }
    });
    requestOptions = {
      path: 'path',
      params: new URLSearchParams(),
      headers: new Headers()
    };
  });
  afterAll(PlatformTest.reset);

  it('Should throw error for missing tok', async () => {
    expect.assertions(3);

    try {
      await datasource.willSendRequest(requestOptions);
    } catch (error) {
      expect(error).toBeInstanceOf(ApolloError);
      expect((error as ApolloError).extensions.response.status).toEqual(Forbidden.STATUS);
      expect((error as ApolloError).extensions.response.statusText).toEqual('No authorization header present.');
    }
  });
});
