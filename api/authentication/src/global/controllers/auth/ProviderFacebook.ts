import { Controller } from '@tsed/di';
import { Authenticate } from '@tsed/passport';
import { Description, Get } from '@tsed/schema';

@Description('Facebook provider controllers.')
@Controller('/auth/provider/facebook')
export class FacebookProviderController {
  constructor() {}

  @Get('/')
  @Description('Login with Facebook.')
  @Authenticate('facebook', { session: false, scope: ['email'] })
  async authenticated() {}

  @Get('/callback')
  @Description('Login with Facebook.')
  @Authenticate('facebook', { session: false, scope: ['email'] })
  async callback() {}
}
