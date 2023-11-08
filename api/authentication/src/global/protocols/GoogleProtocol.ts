import { Req } from '@tsed/common';
import { Inject } from '@tsed/di';
import { Args, BeforeInstall, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20';
import { ConfigService } from '../services/ConfigService';
import { ProtocolAuthService } from '../services/ProtocolAuthService';

// {
//   id: '101290332297136230786',
//   displayName: 'Radoslav Irha',
//   name: { familyName: 'Irha', givenName: 'Radoslav' },
//   emails: [ { value: 'radoslav.irha@gmail.com', verified: true } ],
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/ACg8ocKbjwlfmb1Sj4JWKckIiHIZ1-UqC0O6fCYCcTk929X60kE=s96-c'
//     }
//   ]
// }

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
  @Inject()
  private configService!: ConfigService;

  @Inject()
  private authService!: ProtocolAuthService;

  async $beforeInstall(settings: StrategyOptions): Promise<StrategyOptions> {
    settings.clientID = this.configService.config.auth.google.clientID;
    settings.clientSecret = this.configService.config.auth.google.clientSecret;
    settings.callbackURL = this.configService.config.auth.google.callbackURL;
    return settings;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $onInstall(strategy: Strategy): void {}

  async $onVerify(@Req() _request: Req, @Args() [accessToken, refreshToken, body]: [string, string, Profile]) {
    return this.authService.google(body, accessToken, refreshToken);
  }
}
