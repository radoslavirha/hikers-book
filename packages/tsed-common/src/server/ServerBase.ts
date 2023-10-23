import { $log, Configuration, Inject, PlatformApplication } from '@tsed/common';
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import { ConfigServiceBase } from '../services';

@Configuration({
  ...ConfigServiceBase.getServerDefaults()
})
export class BaseServer {
  @Inject()
  protected app!: PlatformApplication;

  @Configuration()
  protected settings!: Configuration;

  $onReady(): void {
    $log.info(`${this.settings.api} ${this.settings.version} is ready!`);
  }

  protected registerMiddlewares(): void {
    $log.info('Registering common middlewares...');

    this.app
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
}
