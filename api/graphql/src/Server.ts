import { resolve } from 'path';
import { BaseServer, getServerDefaultConfig } from '@hikers-book/tsed-common/server';
import '@tsed/ajv';
import { Configuration, Inject } from '@tsed/di';
import '@tsed/ioredis';
import '@tsed/platform-express'; // /!\ keep this import
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import './global/connections/Redis';
import { ConfigService } from './global/services/ConfigService';
import * as v1Datasources from './v1/datasources';
import * as v1Resolvers from './v1/resolvers';

@Configuration({
  ...getServerDefaultConfig(), // must be here because of tests
  graphql: {
    v1: {
      path: '/v1/',
      playground: false,
      resolvers: [v1Resolvers, v1Datasources],
      buildSchemaOptions: {
        emitSchemaFile: resolve(__dirname, './v1/resources/schema.gql')
      },
      serverConfig: {
        async context(ctx) {
          // No authorization on GraphQL, just extract token and pass to request,
          // other microservicess will handle authorization
          const token = ctx?.req?.headers?.authorization;

          // will be accessible in datasource as this.context.token
          return Promise.resolve({ token });
        }
      }
    }
  }
})
export class Server extends BaseServer {
  @Inject()
  configService!: ConfigService;

  $beforeRoutesInit(): void {
    this.registerMiddlewares();

    this.app.getApp().set('trust proxy', true);
    this.app.use(
      cookieSession({
        signed: false,
        secure: !this.configService.isTest
      })
    );
    this.app.use(helmet());
  }
}
