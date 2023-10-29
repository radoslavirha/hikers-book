import { BaseServer, getServerDefaultConfig } from '@hikers-book/tsed-common/server';
import '@tsed/ajv';
import { Configuration, Inject } from '@tsed/di';
import '@tsed/mongoose';
import '@tsed/platform-express'; // /!\ keep this import
import helmet from 'helmet';
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

    this.app.use(helmet());
  }
}
