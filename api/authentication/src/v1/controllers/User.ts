import { SwaggerDocsVersion } from '@hikers-book/tsed-common/types';
import { BodyParams, Req } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Description, Get, Property, Required, Returns } from '@tsed/schema';
import { Docs } from '@tsed/swagger';
import { JWTAuth } from '../../auth/decorators/JWTAuth';

export class UserRequest {
  @Property()
  user!: unknown;
}

@Description('User controllers.')
@Controller('/user')
@Docs(SwaggerDocsVersion.V1)
export class UserController {
  @Get('/')
  @JWTAuth()
  @Description('Returns User model.')
  @Returns(200)
  getUser(@Req('user') user: unknown, @BodyParams() @Required() request: UserRequest): string {
    console.log(user);
    console.log(request);

    return 'bbdfbdb';
  }
}
