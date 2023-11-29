import { JWTAuthenticationResponse } from '@hikers-book/tsed-common/models';
import { JWTPayload } from '@hikers-book/tsed-common/types';
import { Req } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Description, Get, Returns } from '@tsed/schema';
import { JWTAuth } from '../../decorators/JWTAuth';
import { AuthenticateHandler } from '../../handlers';

@Description('Authentication/Authorization controllers.')
@Controller('/auth')
export class AuthenticateController {
  constructor(private authenticateHandler: AuthenticateHandler) {}

  @Get('/authenticate')
  @JWTAuth()
  @Description('Returns User model based on JWT token.')
  @Returns(200, JWTAuthenticationResponse)
  authenticate(@Req('user') user: JWTPayload): Promise<JWTAuthenticationResponse> {
    // @Context() ctx: Context,
    // console.log(ctx.getRequest().user);

    return this.authenticateHandler.execute(user);
  }
}
