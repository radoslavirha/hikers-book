import { Controller } from '@tsed/di';
import { BodyParams } from '@tsed/platform-params';
import { Description, Post, Returns } from '@tsed/schema';
import { UserSignUp } from '../../model/user/SignUp';

@Controller('/auth/sign-up')
export class SignUpController {
  @Post('/')
  @Description('Sign up a new user.')
  @Returns(200)
  signUp(@BodyParams() payload: UserSignUp): UserSignUp {
    return payload;
  }
}
