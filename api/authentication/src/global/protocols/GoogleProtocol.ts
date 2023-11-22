import { Req } from '@tsed/common';
import { Forbidden } from '@tsed/exceptions';
import { Args, BeforeInstall, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20';
import { ConfigService } from '../services/ConfigService';
import { ProtocolAuthService } from '../services/ProtocolAuthService';

@Protocol<StrategyOptions>({
  name: 'google',
  useStrategy: Strategy,
  settings: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    scope: ['email', 'profile']
  }
})
export class GoogleProtocol implements OnVerify, OnInstall, BeforeInstall {
  constructor(
    private authService: ProtocolAuthService,
    private configService: ConfigService
  ) {}

  async $beforeInstall(settings: StrategyOptions): Promise<StrategyOptions> {
    settings.clientID = this.configService.config.auth.google.clientID;
    settings.clientSecret = this.configService.config.auth.google.clientSecret;
    settings.callbackURL = this.configService.config.auth.google.callbackURL;
    return settings;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $onInstall(strategy: Strategy): void {}

  async $onVerify(@Req() request: Req, @Args() [accessToken, refreshToken, body]: [string, string, Profile]) {
    try {
      const tokens = await this.authService.google(body, accessToken, refreshToken);

      return request.res?.redirect(
        `${this.configService.config.frontend.url}/auth/callback?jwt=${tokens.jwt}&refresh=${tokens.refresh}`
      );
    } catch (error) {
      return request.res?.redirect(
        `${this.configService.config.frontend.url}/auth/error?code=${(error as Forbidden).status}&message=${
          (error as Forbidden).message
        }`
      );
    }
  }
}
