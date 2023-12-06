import { JWTAuthenticationResponse } from '@hikers-book/tsed-common/models';
import { JWTPayload, SwaggerDocsVersion } from '@hikers-book/tsed-common/types';
import { Cookies, Req } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Description, Get, Returns } from '@tsed/schema';
import { Docs } from '@tsed/swagger';
import { JWTAuth } from '../decorators/JWTAuth';
import { AuthenticateHandler, LogoutHandler, RefreshTokenHandler } from '../handlers';
import { CookieName, TokensResponse } from '../models';

@Description('Authentication/Authorization controllers.')
@Controller('/')
@Docs(SwaggerDocsVersion.AUTH)
export class AuthenticateController {
  constructor(
    private authenticateHandler: AuthenticateHandler,
    private refreshTokenHandler: RefreshTokenHandler,
    private logoutHandler: LogoutHandler
  ) {}

  @Get('/authenticate')
  @JWTAuth()
  @Description('Returns User model based on JWT token.')
  @Returns(200, JWTAuthenticationResponse)
  authenticate(@Req('user') user: JWTPayload): Promise<JWTAuthenticationResponse> {
    return this.authenticateHandler.execute(user);
  }

  @Get('/refresh')
  @Description('Refresh token controller.')
  @Returns(200, TokensResponse)
  refresh(@Req() request: Req, @Cookies(CookieName.Refresh) refreshToken: string): Promise<TokensResponse> {
    return this.refreshTokenHandler.execute({ request, refreshToken });
  }

  @Get('/logout')
  @Description('Logout controller.')
  @Returns(200)
  logout(@Req() request: Req, @Cookies(CookieName.Refresh) refreshToken: string): Promise<void> {
    return this.logoutHandler.execute({ request, refreshToken });
  }
}
