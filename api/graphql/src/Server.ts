import '@tsed/ajv';
import { PlatformApplication } from '@tsed/common';
import { Configuration, Inject } from '@tsed/di';
import '@tsed/mongoose';
import '@tsed/platform-express'; // /!\ keep this import
import '@tsed/swagger';
import '@tsed/typegraphql';
import { join } from 'path';
import { config } from './config/index';
import * as pages from './controllers/pages/index';
import * as rest from './controllers/rest/index';
import './resolvers/index';

@Configuration({
  ...config,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  mount: {
    '/rest': [...Object.values(rest)],
    '/': [...Object.values(pages)]
  },
  swagger: [
    {
      path: '/doc',
      specVersion: '3.0.1'
    }
  ],
  middlewares: [
    'cors',
    'cookie-parser',
    'compression',
    'method-override',
    'json-parser',
    { use: 'urlencoded-parser', options: { extended: true } }
  ],
  views: {
    root: join(process.cwd(), '../views'),
    extensions: {
      ejs: 'ejs'
    }
  },
  exclude: ['**/*.spec.ts'],
  typegraphql: {
    default: {
      // GraphQL server configuration
      path: '/',
      playground: true, // enable playground GraphQL IDE. Set false to use Apollo Studio

      // resolvers?: (Function | string)[];
      // dataSources?: Function;
      // server?: (config: Config) => ApolloServer;

      // Apollo Server options
      // See options descriptions on https://www.apollographql.com/docs/apollo-server/api/apollo-server.html
      serverConfig: {
        plugins: []
      }

      // middlewareOptions?: ServerRegistration;

      // type-graphql
      // See options descriptions on https://19majkel94.github.io/type-graphql/
      // buildSchemaOptions?: Partial<BuildSchemaOptions>;
    }
  }
})
export class Server {
  @Inject()
  protected app!: PlatformApplication;

  @Configuration()
  protected settings!: Configuration;
}
