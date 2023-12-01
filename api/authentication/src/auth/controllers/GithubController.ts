import { SwaggerDocsVersion } from '@hikers-book/tsed-common/types';
import { Controller } from '@tsed/di';
import { Authenticate } from '@tsed/passport';
import { Description, Get } from '@tsed/schema';
import { Docs } from '@tsed/swagger';
import { OAuth2ReturnStatuses } from '../decorators';

@Description('Github provider controllers.')
@Controller('/provider/github')
@Docs(SwaggerDocsVersion.AUTH)
export class AuthProviderGithubController {
  constructor() {}

  @Get('/')
  @Description('Login with Github.')
  @OAuth2ReturnStatuses()
  @Authenticate('github', { session: false, scope: ['user', 'email'] })
  // istanbul ignore next
  async authenticated() {}

  @Get('/callback')
  @Description('Login with Github.')
  @OAuth2ReturnStatuses()
  @Authenticate('github', { session: false, scope: ['user', 'email'] })
  // istanbul ignore next
  async callback() {}
}
