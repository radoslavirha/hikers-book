import { $log, Configuration, Inject, PlatformApplication } from '@tsed/common';
import '@tsed/platform-express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import '../protocols/JWTProtocol';

// For tests
@Configuration({
  disableComponentsScan: true,
  api: {
    service: 'test',
    version: '0.0.1'
  },
  passport: {
    disableSession: true
  }
})
export class BaseServer {
  @Inject()
  protected app!: PlatformApplication;

  @Configuration()
  protected settings!: Configuration;

  $onReady(): void {
    $log.info(`${ this.settings?.api?.service } ${ this.settings?.api?.version } is ready!`);
  }

  protected registerMiddlewares(): void {
    $log.info('Registering common middlewares...');

    this.app
      .use(
        cors({
          origin: true,
          credentials: true
        })
      )
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
