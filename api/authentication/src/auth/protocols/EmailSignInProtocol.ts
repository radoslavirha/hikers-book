import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Req } from '@tsed/common';
import { Args, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { BasicStrategy, BasicStrategyOptions } from 'passport-http';
import { TokensResponse } from '../models';
import { ProtocolAuthService } from '../services/ProtocolAuthService';
import { RefreshTokenService } from '../services/RefreshTokenService';

@Protocol<BasicStrategyOptions>({
  name: 'email-sign-in',
  useStrategy: BasicStrategy,
  settings: {}
})
export class EmailSignInProtocol implements OnVerify, OnInstall {
  constructor(
    private authService: ProtocolAuthService,
    private refreshTokenService: RefreshTokenService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $onInstall(strategy: BasicStrategy): void {
    // intercept the strategy instance to adding extra configuration
  }

  async $onVerify(@Req() request: Req, @Args() [email, password]: [string, string]): Promise<TokensResponse> {
    const tokens = await this.authService.emailSignIn(email, password);
    this.refreshTokenService.setRefreshCookie(request, tokens.refresh);
    return CommonUtils.buildModel(TokensResponse, tokens);
  }
}
