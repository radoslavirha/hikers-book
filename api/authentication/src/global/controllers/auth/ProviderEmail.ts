import { Controller } from '@tsed/di';
import { BadRequest, Forbidden, NotFound } from '@tsed/exceptions';
import { Authenticate } from '@tsed/passport';
import { BodyParams } from '@tsed/platform-params';
import { Description, Post, Returns } from '@tsed/schema';
import { CredentialsAlreadyExist } from '../../exceptions';
import { EmailSendVerificationHandler, EmailVerifyTokenHandler } from '../../handlers';
import { EmailSendVerificationRequest, EmailVerifyTokenRequest } from '../../models';

@Description('Email provider controllers.')
@Controller('/auth/provider/email')
export class EmailProviderController {
  constructor(
    private sendVerificationHandler: EmailSendVerificationHandler,
    private verifyTokenHandler: EmailVerifyTokenHandler
  ) {}

  @Post('/send-verification')
  @Description('Sends verification email to the user. Then user can sign up.')
  @Returns(200)
  @Returns(CredentialsAlreadyExist.STATUS, CredentialsAlreadyExist)
  @Returns(Forbidden.STATUS, Forbidden)
  async sendVerification(@BodyParams() body: EmailSendVerificationRequest): Promise<void> {
    return this.sendVerificationHandler.execute(body);
  }

  @Post('/verify-token')
  @Description('Verify registration token sent to email.')
  @Returns(200)
  @Returns(NotFound.STATUS, NotFound)
  @Returns(Forbidden.STATUS, Forbidden)
  async verifyToken(@BodyParams() body: EmailVerifyTokenRequest): Promise<void> {
    return this.verifyTokenHandler.execute(body);
  }

  @Post('/sign-up')
  @Description('Sign up user with email and password.')
  @Authenticate('email-sign-up', { session: false })
  @Returns(200)
  @Returns(NotFound.STATUS, NotFound)
  @Returns(Forbidden.STATUS, Forbidden)
  @Returns(BadRequest.STATUS, BadRequest)
  // istanbul ignore next
  async signUp() {}

  @Post('/sign-in')
  @Description('Sign in user with email and password.')
  @Authenticate('email-sign-in', { session: false })
  @Returns(200)
  // istanbul ignore next
  async signIn() {}
}
