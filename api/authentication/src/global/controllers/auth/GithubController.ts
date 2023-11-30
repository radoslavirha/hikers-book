import { SwaggerDocsVersion } from '@hikers-book/tsed-common/types';
import { Controller } from '@tsed/di';
import { Authenticate } from '@tsed/passport';
import { Description, Get } from '@tsed/schema';
import { Docs } from '@tsed/swagger';

@Description('Github provider controllers.')
@Controller('/auth/provider/github')
@Docs(SwaggerDocsVersion.GLOBAL)
export class AuthProviderGithubController {
  constructor() {}

  @Get('/')
  @Description('Login with Github.')
  @Authenticate('github', { session: false, scope: ['user', 'email'] })
  // istanbul ignore next
  async authenticated() {}

  @Get('/callback')
  @Description('Login with Github.')
  @Authenticate('github', { session: false, scope: ['user', 'email'] })
  // istanbul ignore next
  async callback() {}
}
