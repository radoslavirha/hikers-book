import { SwaggerDocsVersion } from '@hikers-book/tsed-common/types';
import { Controller } from '@tsed/di';
import { Authenticate } from '@tsed/passport';
import { Description, Get } from '@tsed/schema';
import { Docs } from '@tsed/swagger';
import { OAuth2ReturnStatuses } from '../decorators';

@Description('Google provider controllers.')
@Controller('/provider/google')
@Docs(SwaggerDocsVersion.AUTH)
export class AuthProviderGoogleController {
  constructor() {}

  @Get('/')
  @Description('Login with Google.')
  @OAuth2ReturnStatuses()
  @Authenticate('google', { session: false, scope: ['email', 'profile'] })
  // istanbul ignore next
  async authenticated() {}

  @Get('/callback')
  @Description('Login with Google.')
  @OAuth2ReturnStatuses()
  @Authenticate('google', { session: false, scope: ['email', 'profile'] })
  // istanbul ignore next
  async callback() {}
}
