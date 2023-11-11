import { MongoMapper } from '@hikers-book/tsed-common/mappers';
import { MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { Service } from '@tsed/di';
import { serialize } from '@tsed/json-mapper';
import { EmailVerification } from '../models';
import { EmailVerificationMongo } from '../mongo';

@Service()
export class EmailVerificationMapper extends MongoMapper<EmailVerificationMongo, EmailVerification> {
  public async mongoToModel(mongo: EmailVerificationMongo): Promise<EmailVerification> {
    const model = new EmailVerification();

    model.email = mongo.email;
    model.token = mongo.token;
    model.expires_in = mongo.expires_in;

    this.mongoToModelBase(model, mongo);

    return model;
  }

  public async modelToMongoCreateObject(
    model: EmailVerification
  ): Promise<MongoPlainObjectCreate<EmailVerificationMongo>> {
    const mongo = new EmailVerificationMongo() as MongoPlainObjectCreate<EmailVerificationMongo>;

    mongo.email = this.getModelValue(model, 'email');
    mongo.token = this.getModelValue(model, 'token');
    mongo.expires_in = this.getModelValue(model, 'expires_in');

    return serialize(mongo);
  }

  public async modelToMongoUpdateObject(
    model: EmailVerification
  ): Promise<MongoPlainObjectUpdate<EmailVerificationMongo>> {
    const mongo = new EmailVerificationMongo() as MongoPlainObjectUpdate<EmailVerificationMongo>;

    mongo.email = this.getModelValue(model, 'email', true);
    mongo.token = this.getModelValue(model, 'token', true);
    mongo.expires_in = this.getModelValue(model, 'expires_in', true);

    return serialize(mongo);
  }
}
