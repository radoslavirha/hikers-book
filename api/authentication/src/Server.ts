import * as restGlobalCommon from '@hikers-book/tsed-common/controllers';
import { BaseServer, getServerDefaultConfig, getSwaggerHelmetDirectives } from '@hikers-book/tsed-common/server';
import '@tsed/ajv';
import { Configuration, Inject } from '@tsed/di';
import '@tsed/ioredis';
import '@tsed/mongoose';
import '@tsed/passport';
import '@tsed/platform-express'; // /!\ keep this import
import '@tsed/swagger';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import { join } from 'path';
import './global/connections/Nodemailer';
import './global/connections/Redis';
import * as restGlobal from './global/controllers/index';
import { User } from './global/models';
import './global/protocols/EmailSignInProtocol';
import './global/protocols/EmailSignUpProtocol';
import './global/protocols/FacebookProtocol';
import './global/protocols/GithubProtocol';
import './global/protocols/GoogleProtocol';
import './global/protocols/JWTProtocol';
import { ConfigService } from './global/services/ConfigService';
import * as restV1 from './v1/controllers/index';

@Configuration({
  ...getServerDefaultConfig(), // must be here because of tests
  passport: {
    userInfoModel: User,
    disableSession: true
  },
  mount: {
    '/': [...Object.values(restGlobal), ...Object.values(restGlobalCommon)],
    '/v1': [...Object.values(restV1)]
  },
  views: {
    root: join(process.cwd(), '../views'),
    extensions: {
      ejs: 'ejs'
    }
  }
})
export class Server extends BaseServer {
  @Inject()
  configService!: ConfigService;

  $beforeRoutesInit(): void {
    this.registerMiddlewares();

    this.app.getApp().set('trust proxy', true);
    this.app.use(
      cookieSession({
        signed: false,
        secure: !this.configService.isTest,
        ...this.configService.config.session
      })
    );
    this.app.use(
      helmet({
        contentSecurityPolicy: this.configService.isProduction
          ? {
              directives: getSwaggerHelmetDirectives()
            }
          : false
      })
    );
  }
}
