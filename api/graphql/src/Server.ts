import { BaseServer, getServerDefaults } from '@hikers-book/tsed-common/server';
import '@tsed/ajv';
import { Configuration } from '@tsed/di';
import '@tsed/mongoose';
import '@tsed/platform-express'; // /!\ keep this import
import helmet from 'helmet';
import './v1/GraphQLModule';

@Configuration({
  ...getServerDefaults() // must be here because of tests
})
export class Server extends BaseServer {
  $beforeRoutesInit(): void {
    this.registerMiddlewares();

    this.app.use(helmet());
  }
}
