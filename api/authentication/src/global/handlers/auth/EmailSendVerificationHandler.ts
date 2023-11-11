import { BaseHandler } from '@hikers-book/tsed-common/handlers';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Injectable } from '@tsed/di';
import moment from 'moment';
import { v4 } from 'uuid';
import { CredentialsAlreadyExist, VerificationEmailExist } from '../../exceptions';
import { EmailSendVerificationRequest, EmailVerification } from '../../models';
import { EmailService } from '../../services/EmailService';
import { CredentialsMongooseService } from '../../services/mongoose/CredentialsMongooseService';
import { EmailVerificationMongooseService } from '../../services/mongoose/EmailVerificationMongooseService';
import { CryptographyUtils } from '../../utils';

@Injectable()
export class EmailSendVerificationHandler extends BaseHandler<EmailSendVerificationRequest, void> {
  constructor(
    private credentialsService: CredentialsMongooseService,
    private emailVerificationService: EmailVerificationMongooseService,
    private emailService: EmailService
  ) {
    super();
  }

  async performOperation(body: EmailSendVerificationRequest): Promise<void> {
    const credentials = await this.credentialsService.findByEmail(body.email);

    if (credentials) {
      throw new CredentialsAlreadyExist(body.email, credentials.provider);
    }

    const exist = await this.emailVerificationService.findByEmail(body.email);

    if (exist) {
      if (moment().isBefore(exist.expires_in)) {
        throw new VerificationEmailExist(body.email);
      }

      await this.emailVerificationService.delete(exist.id);
    }

    const token = v4();
    console.log(token);

    const data = CommonUtils.buildModel(EmailVerification, {
      email: body.email,
      token: await CryptographyUtils.argon2CreateHash(token),
      expires_in: moment().add(1, 'days').toDate()
    });

    await this.emailVerificationService.create(data);

    await this.emailService.sendVerificationEamil(body.email, token);
  }
}
