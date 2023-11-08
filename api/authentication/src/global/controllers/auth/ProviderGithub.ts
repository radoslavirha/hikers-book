import { Controller } from '@tsed/di';
import { Authenticate } from '@tsed/passport';
import { Description, Get } from '@tsed/schema';

@Description('Github provider controllers.')
@Controller('/auth/provider/github')
export class GithubProviderController {
  constructor() {}

  @Get('/')
  @Description('Login with Github.')
  @Authenticate('github', { session: false, scope: ['user', 'email'] })
  async authenticated() {}

  @Get('/callback')
  @Description('Login with Github.')
  @Authenticate('github', { session: false, scope: ['user', 'email'] })
  async callback() {}
}
