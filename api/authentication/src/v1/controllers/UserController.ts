import { Controller } from '@tsed/di';
import { Description, Get, Returns } from '@tsed/schema';
import { UserMeHandler } from '../handlers';

@Description('User controllers.')
@Controller('/user')
export class UserController {
  constructor(private userMeHandler: UserMeHandler) {}

  @Get('/me')
  @Description('Returns User model based on JWT token.')
  @Returns(200)
  me() {
    return this.userMeHandler.execute(undefined);
  }
}
