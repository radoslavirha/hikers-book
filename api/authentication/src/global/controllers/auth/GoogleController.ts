import { Controller } from '@tsed/di';
import { Authenticate } from '@tsed/passport';
import { Description, Get } from '@tsed/schema';

@Description('Google provider controllers.')
@Controller('/auth/provider/google')
export class AuthProviderGoogleController {
  constructor() {}

  @Get('/')
  @Description('Login with Google.')
  @Authenticate('google', { session: false, scope: ['email', 'profile'] })
  // istanbul ignore next
  async authenticated() {}

  @Get('/callback')
  @Description('Login with Google.')
  @Authenticate('google', { session: false, scope: ['email', 'profile'] })
  // istanbul ignore next
  async callback() {}
}
