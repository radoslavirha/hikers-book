import { BodyParams, Req } from '@tsed/common';
import { Inject } from '@tsed/di';
import { OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { EmailSignInRequest } from '../models';
import { ProtocolAuthService } from '../services/ProtocolAuthService';

@Protocol<IStrategyOptions>({
  name: 'email-sign-in',
  useStrategy: Strategy,
  settings: {
    usernameField: 'email',
    passwordField: 'password'
  }
})
export class EmailSignInProtocol implements OnVerify, OnInstall {
  @Inject()
  private authService!: ProtocolAuthService;

  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }

  async $onVerify(@Req() request: Req, @BodyParams() body: EmailSignInRequest) {
    return this.authService.emailSignIn(body);
  }
}
