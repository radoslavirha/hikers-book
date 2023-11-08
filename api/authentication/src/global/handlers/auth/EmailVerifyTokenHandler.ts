import { BaseHandler } from '@hikers-book/tsed-common/handlers';
import { Injectable } from '@tsed/di';
import moment from 'moment';
import { VerificationEmailExpired, VerificationEmailNotExist } from '../../exceptions';
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
      throw new VerificationEmailNotExist();
    }

    if (!(await CryptographyUtils.argon2VerifyPassword(invitation.token as string, body.token))) {
      throw new VerificationEmailNotExist();
    }

    if (moment().isAfter(invitation.expires_in, 'minutes')) {
      throw new VerificationEmailExpired();
    }
  }
}
