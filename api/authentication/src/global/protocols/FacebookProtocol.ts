import { Req } from '@tsed/common';
import { Inject } from '@tsed/di';
import { Args, BeforeInstall, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-facebook';
import { ConfigService } from '../services/ConfigService';
import { ProtocolAuthService } from '../services/ProtocolAuthService';

// {
//   id: '7111452635532992',
//   username: undefined,
//   displayName: 'Radoslav Irha',
//   name: {
//     familyName: undefined,
//     givenName: undefined,
//     middleName: undefined
//   },
//   gender: undefined,
//   profileUrl: undefined,
//   provider: 'facebook',
//   _raw: '{"name":"Radoslav Irha","id":"7111452635532992"}',
//   _json: { name: 'Radoslav Irha', id: '7111452635532992' }
// }

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
  @Inject()
  private configService!: ConfigService;

  @Inject()
  private authService!: ProtocolAuthService;

  async $beforeInstall(settings: StrategyOptions): Promise<StrategyOptions> {
    settings.clientID = this.configService.config.auth.facebook.clientID;
    settings.clientSecret = this.configService.config.auth.facebook.clientSecret;
    settings.callbackURL = this.configService.config.auth.facebook.callbackURL;
    return settings;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $onInstall(strategy: Strategy): void {}

  async $onVerify(@Req() _request: Req, @Args() [accessToken, refreshToken, body]: [string, string, Profile]) {
    return this.authService.facebook(body, accessToken, refreshToken);
  }
}
