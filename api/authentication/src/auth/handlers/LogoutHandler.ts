import { BaseHandler } from '@hikers-book/tsed-common/handlers';
import { Req } from '@tsed/common';
import { Injectable } from '@tsed/di';
import { RefreshTokenService } from '../services/RefreshTokenService';

@Injectable()
export class LogoutHandler extends BaseHandler<{ request: Req; refreshToken: string }, void> {
  constructor(private refreshTokenService: RefreshTokenService) {
    super();
  }

  async performOperation(req: { request: Req; refreshToken: string }): Promise<void> {
    const { request, refreshToken } = req;

    try {
      await this.refreshTokenService.verifyRefreshAndRemove(refreshToken);
    } catch (error) {
      this.refreshTokenService.handleError(request, refreshToken);
      throw error;
    }

    this.refreshTokenService.unsetRefreshCookie(request);

    return;
  }
}
