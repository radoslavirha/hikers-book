import { BaseHandler } from '@hikers-book/tsed-common/handlers';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Injectable } from '@tsed/di';
import { Forbidden } from '@tsed/exceptions';
import moment from 'moment';
import { v4 } from 'uuid';
import { CredentialsAlreadyExist } from '../exceptions';
import { EmailSendVerificationRequest, EmailVerification } from '../models';
import { EmailService } from '../services/EmailService';
import { CredentialsMongoService } from '../services/mongo/CredentialsMongoService';
import { EmailVerificationMongoService } from '../services/mongo/EmailVerificationMongoService';
import { CryptographyUtils } from '../utils';

@Injectable()
export class EmailSendVerificationHandler extends BaseHandler<EmailSendVerificationRequest, void> {
  constructor(
    private credentialsService: CredentialsMongoService,
    private emailVerificationService: EmailVerificationMongoService,
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
        throw new Forbidden(`Verification email already sent to ${body.email}!`);
      }

      await this.emailVerificationService.delete(exist.id);
    }

    const token = v4();
    // console.log(token);

    const data = CommonUtils.buildModel(EmailVerification, {
      email: body.email,
      token: await CryptographyUtils.argon2CreateHash(token),
      expires_in: moment().add(1, 'days').toDate() // put it in config?
    });

    await this.emailVerificationService.create(data);

    await this.emailService.sendVerificationEmail(body.email, token);
  }
}
