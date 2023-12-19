import { SwaggerDocsVersion, SwaggerSecurityScheme } from '@hikers-book/tsed-common/types';
import { Controller } from '@tsed/di';
import { BadRequest, Forbidden, NotFound, UnprocessableEntity } from '@tsed/exceptions';
import { Authenticate } from '@tsed/passport';
import { BodyParams, HeaderParams } from '@tsed/platform-params';
import { Description, Example, Get, Post, Required, Returns, Security } from '@tsed/schema';
import { Docs } from '@tsed/swagger';
import { CredentialsAlreadyExist } from '../exceptions';
import { EmailSendVerificationHandler, EmailVerifyTokenHandler } from '../handlers';
import { EmailSendVerificationRequest, EmailSignUpRequest, EmailVerifyTokenRequest } from '../models';
import { TokensResponse } from '../models/auth/TokensResponse';

@Description('Email provider controllers.')
@Controller('/provider/email')
@Docs(SwaggerDocsVersion.AUTH)
export class AuthProviderEmailController {
  constructor(
    private sendVerificationHandler: EmailSendVerificationHandler,
    private verifyTokenHandler: EmailVerifyTokenHandler
  ) {}

  @Post('/send-verification')
  @Description('Sends verification email to the user. Then user can sign up.')
  @Returns(200)
  @Returns(CredentialsAlreadyExist.STATUS, CredentialsAlreadyExist)
  @Returns(Forbidden.STATUS, Forbidden)
  async sendVerification(@Required() @BodyParams() body: EmailSendVerificationRequest): Promise<void> {
    return this.sendVerificationHandler.execute(body);
  }

  @Post('/verify-token')
  @Description('Verify registration token sent to email.')
  @Returns(200)
  @Returns(NotFound.STATUS, NotFound)
  @Returns(Forbidden.STATUS, Forbidden)
  async verifyToken(@Required() @BodyParams() body: EmailVerifyTokenRequest): Promise<void> {
    return this.verifyTokenHandler.execute(body);
  }

  @Post('/sign-up')
  @Description('Sign up user with email and password.')
  @Authenticate('email-sign-up', { session: false })
  @Returns(200, TokensResponse)
  @Returns(NotFound.STATUS, NotFound)
  @Returns(Forbidden.STATUS, Forbidden)
  @Returns(BadRequest.STATUS, BadRequest)
  @Returns(UnprocessableEntity.STATUS, UnprocessableEntity)
  @Returns(CredentialsAlreadyExist.STATUS, CredentialsAlreadyExist)
  // istanbul ignore next
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signUp(@Required() @BodyParams() body: EmailSignUpRequest) {}

  @Get('/sign-in')
  @Description('Sign in user with email and password.')
  @Authenticate('email-sign-in', { session: false })
  @Security(SwaggerSecurityScheme.BASIC)
  @Returns(200, TokensResponse)
  @Returns(Forbidden.STATUS, Forbidden)
  // istanbul ignore next
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(@Required() @Example('Basic base64') @HeaderParams('Authorization') authorization: string) {}
}
