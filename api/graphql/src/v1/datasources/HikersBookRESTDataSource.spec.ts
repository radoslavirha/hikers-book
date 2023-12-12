import { ACCESS_TOKEN, BEARER_TOKEN, JWT_PAYLOAD } from '@hikers-book/tsed-common/stubs';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { PlatformTest } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { RequestOptions } from 'apollo-datasource-rest';
import { Headers, Request, URLSearchParams } from 'apollo-server-env';
import { ApolloError } from 'apollo-server-express';
import { HikersBookRESTDataSource } from './HikersBookRESTDataSource';

describe('HikersBookRESTDataSource', () => {
  let datasource: HikersBookRESTDataSource;
  let requestOptions: RequestOptions;

  beforeEach(PlatformTest.create);
  beforeEach(async () => {
    datasource = await PlatformTest.invoke<HikersBookRESTDataSource>(HikersBookRESTDataSource);
    datasource.initialize({
      context: { token: BEARER_TOKEN },
      cache: { get: jest.fn(), set: jest.fn(), delete: jest.fn() }
    });
    requestOptions = {
      path: 'path',
      params: new URLSearchParams(),
      headers: new Headers()
    };
    jest.spyOn(CommonUtils, 'decodeJWT').mockReturnValue({ ...JWT_PAYLOAD, exp: new Date().getTime() + 1000 });
  });
  afterEach(PlatformTest.reset);

  it('Should set cache key from URL and Authorization header', () => {
    const headers = new Headers();
    headers.set('Authorization', 'token');
    const request: Request = {
      url: 'url',
      headers
    } as Request;

    const response = datasource.cacheKeyFor(request);

    expect(response).toEqual('url::token');
  });

  it('Should call CommonUtils.decodeJWT', async () => {
    const spy = jest
      .spyOn(CommonUtils, 'decodeJWT')
      .mockReturnValue({ ...JWT_PAYLOAD, exp: new Date().getTime() + 1000 });

    await datasource.willSendRequest(requestOptions);

    expect(spy).toHaveBeenCalledWith(ACCESS_TOKEN);
  });

  it('Should throw error for expired token', async () => {
    jest.spyOn(CommonUtils, 'decodeJWT').mockReturnValue({ ...JWT_PAYLOAD, exp: 0 });

    expect.assertions(3);

    try {
      await datasource.willSendRequest(requestOptions);
    } catch (error) {
      expect(error).toBeInstanceOf(ApolloError);
      expect((error as ApolloError).extensions.response.status).toEqual(Unauthorized.STATUS);
      expect((error as ApolloError).extensions.response.statusText).toEqual('Token expired.');
    }
  });

  it('Should set Authorization header', async () => {
    await datasource.willSendRequest(requestOptions);

    expect(requestOptions.headers.get('Authorization')).toBe(BEARER_TOKEN);
  });
});
