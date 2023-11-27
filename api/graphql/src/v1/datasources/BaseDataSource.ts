import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class BaseDataSource extends RESTDataSource {
  constructor(baseURL: string) {
    super();
    this.baseURL = baseURL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }
}
