import { SwaggerDocsVersion } from '@hikers-book/tsed-common/types';
import { Controller } from '@tsed/di';
import { Authenticate } from '@tsed/passport';
import { Description, Get } from '@tsed/schema';
import { Docs } from '@tsed/swagger';
import { OAuth2ReturnStatuses } from '../../decorators';

@Description('Facebook provider controllers.')
@Controller('/auth/provider/facebook')
@Docs(SwaggerDocsVersion.GLOBAL)
export class AuthProviderFacebookController {
  constructor() {}

  @Get('/')
  @Description('Login with Facebook.')
  @OAuth2ReturnStatuses()
  @Authenticate('facebook', { session: false, scope: ['email'] })
  // istanbul ignore next
  async authenticated() {}

  @Get('/callback')
  @Description('Login with Facebook.')
  @OAuth2ReturnStatuses()
  @Authenticate('facebook', { session: false, scope: ['email'] })
  // istanbul ignore next
  async callback() {}
}
