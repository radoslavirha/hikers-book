import { BaseServer } from '@hikers-book/tsed-common/server';
import { ConfigServiceBase } from '@hikers-book/tsed-common/services';
import '@tsed/ajv';
import { Configuration } from '@tsed/di';
import '@tsed/mongoose';
import '@tsed/platform-express'; // /!\ keep this import
import helmet from 'helmet';
import './providers/ConfigProvider';
import './v1/GraphQLModule';

@Configuration({
  // @Configuration decorator from base class is not working
  ...ConfigServiceBase.getServerDefaults()
})
export class Server extends BaseServer {
  $beforeRoutesInit(): void {
    this.registerMiddlewares();

    this.app.use(helmet());
  }
}
