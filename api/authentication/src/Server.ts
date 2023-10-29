import { BaseServer, getServerDefaults } from '@hikers-book/tsed-common/server';
import { getHelmetDirectives, getSwaggerConfig } from '@hikers-book/tsed-common/swagger';
import '@tsed/ajv';
import { Configuration } from '@tsed/di';
import '@tsed/mongoose';
import '@tsed/platform-express'; // /!\ keep this import
import helmet from 'helmet';
import { join } from 'path';
import * as docs from './docs/controllers/pages/index';
import * as v1 from './v1/controllers/index';

@Configuration({
  ...getServerDefaults(), // must be here because of tests
  mount: {
    '/v1': [...Object.values(v1)],
    '/': [...Object.values(docs)]
  },
  swagger: getSwaggerConfig(),
  views: {
    root: join(process.cwd(), '../views'),
    extensions: {
      ejs: 'ejs'
    }
  }
})
export class Server extends BaseServer {
  $beforeRoutesInit(): void {
    this.registerMiddlewares();

    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: getHelmetDirectives()
        }
      })
    );
  }
}
