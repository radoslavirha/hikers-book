import { MongooseService } from '@hikers-book/tsed-common/mongo';
import { MongoCreate } from '@hikers-book/types';
import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { EmailVerificationMapper } from '../../mappers/EmailVerificationMapper';
import { EmailVerification } from '../../models';
import { EmailVerificationMongo } from '../../mongo/EmailVerificationMongo';

@Service()
export class EmailVerificationMongooseService extends MongooseService<EmailVerificationMongo, EmailVerification> {
  @Inject(EmailVerificationMongo)
  protected model!: MongooseModel<EmailVerificationMongo>;

  @Inject(EmailVerificationMapper)
  protected mapper!: EmailVerificationMapper;

  async findByEmail(email: string): Promise<EmailVerification | null> {
    const mongo = await this.model.findOne(<EmailVerificationMongo>{ email });

    return this.mapSingle(mongo);
  }

  async create(verification: MongoCreate<EmailVerificationMongo>): Promise<EmailVerification> {
    const mongo = await this.model.create(verification);

    return this.mapper.mongoToModel(mongo);
  }

  async delete(id: string): Promise<EmailVerification | null> {
    const mongo = await this.model.findByIdAndDelete(id);

    return this.mapSingle(mongo);
  }
}
