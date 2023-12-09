import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
// @ts-expect-error missing types
// eslint-disable-next-line import/no-unresolved
import { Request } from 'apollo-server-env';

export class BaseDataSource extends RESTDataSource {
  constructor(baseURL: string) {
    super();
    this.baseURL = baseURL;
  }

  cacheKeyFor(request: Request) {
    return `${request.url}::${request.headers.get('Authorization')}`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }
}
