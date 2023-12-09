import * as restCommon from '@hikers-book/tsed-common/controllers';
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
import * as restAuth from './auth/controllers/index';
import { User } from './auth/models';
import './auth/protocols/EmailSignInProtocol';
import './auth/protocols/EmailSignUpProtocol';
import './auth/protocols/FacebookProtocol';
import './auth/protocols/GithubProtocol';
import './auth/protocols/GoogleProtocol';
import './auth/protocols/JWTProtocol';
import './global/connections/Nodemailer';
import './global/connections/Redis';
import { ConfigService } from './global/services/ConfigService';
import * as restV1 from './v1/controllers/index';

@Configuration({
  ...getServerDefaultConfig(), // must be here because of tests
  passport: {
    userInfoModel: User,
    disableSession: true
  },
  mount: {
    '/': [...Object.values(restCommon)],
    '/auth': [...Object.values(restAuth)],
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
        secure: !this.configService.isTest
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
