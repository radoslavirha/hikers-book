import { Controller } from '@tsed/di';
import { Authenticate } from '@tsed/passport';
import { Description, Get } from '@tsed/schema';

@Description('Google provider controllers.')
@Controller('/auth/provider/google')
export class GoogleProviderController {
  constructor() {}

  @Get('/')
  @Description('Login with Google.')
  @Authenticate('google', { session: false, scope: ['email', 'profile'] })
  async authenticated() {}

  @Get('/callback')
  @Description('Login with Google.')
  @Authenticate('google', { session: false, scope: ['email', 'profile'] })
  async callback() {}
}
