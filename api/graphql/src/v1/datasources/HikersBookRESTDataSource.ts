import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { ClientException, Forbidden, Unauthorized } from '@tsed/exceptions';
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Request } from 'apollo-server-env';
import { ApolloError } from 'apollo-server-express';

export class HikersBookRESTDataSource extends RESTDataSource {
  constructor(baseURL: string) {
    super();
    this.baseURL = baseURL;
  }

  cacheKeyFor(request: Request) {
    return `${ request.url }::${ request.headers.get('Authorization') }`;
  }

  async willSendRequest(request: RequestOptions) {
    if (process.env.NODE_ENV !== 'test') {
      if (!this.context.token) {
        this.generateError(new Forbidden('No authorization header present.'));
      }
    }

    const decoded = CommonUtils.decodeJWT(this.context.token.replace('Bearer ', ''));

    const now = new Date();

    if (now.getTime() > decoded!.exp! * 1000) {
      this.generateError(new Unauthorized('Token expired.'));
    }

    request.headers.set('Authorization', this.context.token);
  }

  private generateError(exception: ClientException): ApolloError {
    const error = new ApolloError(`${ exception.status }: ${ exception.message }`, exception.name);

    Object.assign(error.extensions, {
      response: {
        status: exception.status,
        statusText: exception.message
        // url: response.url,
        // body,
      }
    });

    throw error;
  }
}
