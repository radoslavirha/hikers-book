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
import { config } from './config/index';
import './v1/GraphQLModule';

@Configuration({
  ...config,
  acceptMimes: ['application/json'],
  disableComponentsScan: true,
  exclude: ['**/*.spec.ts']
})
export class Server {
  @Inject()
  protected app!: PlatformApplication;

  @Configuration()
  protected settings!: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(helmet())
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
