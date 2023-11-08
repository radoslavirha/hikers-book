import { BodyParams, Req } from '@tsed/common';
import { Inject } from '@tsed/di';
import { BadRequest } from '@tsed/exceptions';
import { OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { EmailVerifyTokenHandler } from '../handlers';
import { EmailSignUpRequest } from '../models';
import { ProtocolAuthService } from '../services/ProtocolAuthService';

@Protocol<IStrategyOptions>({
  name: 'email-sign-up',
  useStrategy: Strategy,
  settings: {
    usernameField: 'email',
    passwordField: 'password'
  }
})
export class EmailSignUpProtocol implements OnVerify, OnInstall {
  @Inject()
  private authService!: ProtocolAuthService;

  constructor(private verifyTokenHandler: EmailVerifyTokenHandler) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }

  async $onVerify(@Req() request: Req, @BodyParams() body: EmailSignUpRequest) {
    if (body.password !== body.password_confirm) {
      throw new BadRequest('Passwords do not match.');
    }

    await this.verifyTokenHandler.execute({ email: body.email, token: body.token });

    return this.authService.emailSignUp(body);
  }
}
