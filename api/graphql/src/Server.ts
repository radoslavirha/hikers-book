import { BaseServer, getServerDefaultConfig } from '@hikers-book/tsed-common/server';
import '@tsed/ajv';
import { Configuration, Inject } from '@tsed/di';
import '@tsed/ioredis';
import '@tsed/mongoose';
import '@tsed/platform-express'; // /!\ keep this import
import session from 'express-session';
import helmet from 'helmet';
import './connections/Redis';
import { ConfigService } from './services';
import './v1/GraphQLModule';

@Configuration({
  ...getServerDefaultConfig() // must be here because of tests
})
export class Server extends BaseServer {
  @Inject()
  configService!: ConfigService;

  $beforeRoutesInit(): void {
    this.registerMiddlewares();

    this.app.use(
      session({
        resave: false,
        saveUninitialized: true,
        ...this.configService.config.session
      })
    );
    this.app.use(helmet());
  }
}
