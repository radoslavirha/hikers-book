import { ConfigServiceBase } from '@hikers-book/tsed-common/services';
import { getHelmetDirectives, getSwaggerConfig } from '@hikers-book/tsed-common/swagger';
import '@tsed/ajv';
import { $log, PlatformApplication } from '@tsed/common';
import { Configuration, Inject } from '@tsed/di';
import '@tsed/mongoose';
import '@tsed/platform-express'; // /!\ keep this import
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';
import { join } from 'path';
import * as docs from './docs/controllers/pages/index';
import './providers/ConfigProvider';
import * as v1 from './v1/controllers/index';

@Configuration({
  ...ConfigServiceBase.getServerDefaults(),
  mount: {
    '/v1': [...Object.values(v1)],
    '/': [...Object.values(docs)]
  },
  swagger: getSwaggerConfig(join(__dirname, '../package.json')),
  views: {
    root: join(process.cwd(), '../views'),
    extensions: {
      ejs: 'ejs'
    }
  }
})
export class Server {
  @Inject()
  protected app!: PlatformApplication;

  @Configuration()
  protected settings!: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(
        helmet({
          contentSecurityPolicy: {
            directives: getHelmetDirectives()
          }
        })
      )
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      );
  }

  $onReady(): void {
    $log.info(`${this.settings.api} ${this.settings.version} is ready!`);
  }
}
