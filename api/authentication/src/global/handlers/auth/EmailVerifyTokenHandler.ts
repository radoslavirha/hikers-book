import { BaseHandler } from '@hikers-book/tsed-common/handlers';
import { Injectable } from '@tsed/di';
import { Forbidden, NotFound } from '@tsed/exceptions';
import moment from 'moment';
import { EmailVerifyTokenRequest } from '../../models';
import { EmailVerificationMongooseService } from '../../services/mongoose/EmailVerificationMongooseService';
import { CryptographyUtils } from '../../utils';

@Injectable()
export class EmailVerifyTokenHandler extends BaseHandler<EmailVerifyTokenRequest, void> {
  constructor(private emailVerificationService: EmailVerificationMongooseService) {
    super();
  }

  async performOperation(body: EmailVerifyTokenRequest): Promise<void> {
    const invitation = await this.emailVerificationService.findByEmail(body.email);

    if (!invitation) {
      throw new NotFound(`Verification email does not exist!`);
    }

    if (!(await CryptographyUtils.argon2VerifyPassword(invitation.token as string, body.token))) {
      throw new Forbidden(`Invalid verification token!`);
    }

    if (moment().isAfter(invitation.expires_in, 'minutes')) {
      throw new Forbidden(`Verification email expired!`);
    }
  }
}
