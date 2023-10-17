import { UserAlreadyExist } from '@hikers-book/tsed-common/exceptions';
import { Controller } from '@tsed/di';
import { InternalServerError } from '@tsed/exceptions';
import { BodyParams } from '@tsed/platform-params';
import { Description, Groups, Post, Returns } from '@tsed/schema';
import { SignUpHandler } from '../../handlers/auth/SignUp';
import { GROUP_CREATE, SignUpLocalResponse, User } from '../../models';

@Description('Sign up controllers.')
@Controller('/auth/sign-up')
export class SignUpController {
  constructor(private signUpHandler: SignUpHandler) {}

  @Post('/')
  @Description('Sign up a new user.')
  @Returns(200, SignUpLocalResponse)
  @Returns(UserAlreadyExist.STATUS, UserAlreadyExist)
  @Returns(InternalServerError.STATUS, InternalServerError)
  async local(@BodyParams() @Groups(GROUP_CREATE) payload: User): Promise<SignUpLocalResponse> {
    return this.signUpHandler.local(payload);
  }
}
