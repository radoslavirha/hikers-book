import { Req } from '@tsed/common';
import { ClientException } from '@tsed/exceptions';
import { Args, BeforeInstall, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-facebook';
import { ConfigService } from '../../global/services/ConfigService';
import { ProtocolAuthService } from '../services/ProtocolAuthService';

@Protocol<StrategyOptions>({
  name: 'facebook',
  useStrategy: Strategy,
  settings: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    profileFields: ['id', 'displayName', 'photos', 'email']
  }
})
export class FacebookProtocol implements OnVerify, OnInstall, BeforeInstall {
  constructor(
    private authService: ProtocolAuthService,
    private configService: ConfigService
  ) {}

  async $beforeInstall(settings: StrategyOptions): Promise<StrategyOptions> {
    settings.clientID = this.configService.config.auth.facebook.clientID;
    settings.clientSecret = this.configService.config.auth.facebook.clientSecret;
    settings.callbackURL = this.configService.config.auth.facebook.callbackURL;
    return settings;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $onInstall(strategy: Strategy): void {}

  async $onVerify(@Req() request: Req, @Args() [accessToken, refreshToken, body]: [string, string, Profile]) {
    try {
      const tokens = await this.authService.facebook(body, accessToken, refreshToken);

      return this.authService.redirectOAuth2Success(request, tokens);
    } catch (error) {
      return this.authService.redirectOAuth2Failure(request, error as ClientException);
    }
  }
}
