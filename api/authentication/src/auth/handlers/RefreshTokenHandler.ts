import { BaseHandler } from '@hikers-book/tsed-common/handlers';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Req } from '@tsed/common';
import { Injectable } from '@tsed/di';
import { TokensPair, TokensResponse } from '../models';
import { RefreshTokenService } from '../services/RefreshTokenService';

@Injectable()
export class RefreshTokenHandler extends BaseHandler<{ request: Req; refreshToken: string }, TokensResponse> {
  constructor(private refreshTokenService: RefreshTokenService) {
    super();
  }

  async performOperation(req: { request: Req; refreshToken: string }): Promise<TokensResponse> {
    const { request, refreshToken } = req;

    let tokens: TokensPair;

    try {
      const token = await this.refreshTokenService.verifyRefreshAndRemove(refreshToken);

      tokens = await this.refreshTokenService.createRefreshTokenAndSave(token);

      this.refreshTokenService.setRefreshCookie(request, tokens.refresh);
    } catch (error) {
      this.refreshTokenService.handleError(request, refreshToken);
      throw error;
    }

    return CommonUtils.buildModel(TokensResponse, tokens);
  }
}
