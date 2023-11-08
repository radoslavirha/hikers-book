import { MongoMapper } from '@hikers-book/tsed-common/mappers';
import { Service } from '@tsed/di';
import { EmailVerification } from '../models';
import { EmailVerificationMongo } from '../mongo';

@Service()
export class EmailVerificationMapper extends MongoMapper<EmailVerificationMongo, EmailVerification> {
  public async mongoToModel(credentials: EmailVerificationMongo): Promise<EmailVerification> {
    const model = new EmailVerification();

    model.email = credentials.email;
    model.token = credentials.token;
    model.expires_in = credentials.expires_in;

    this.mongoToModelBase(model, credentials);

    return model;
  }
}
