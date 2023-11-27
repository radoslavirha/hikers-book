import { MongoService } from '@hikers-book/tsed-common/mongo';
import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { EmailVerificationMapper } from '../../mappers/EmailVerificationMapper';
import { EmailVerification } from '../../models';
import { EmailVerificationMongo } from '../../mongo/EmailVerificationMongo';

@Service()
export class EmailVerificationMongoService extends MongoService<EmailVerificationMongo, EmailVerification> {
  @Inject(EmailVerificationMongo)
  protected model!: MongooseModel<EmailVerificationMongo>;

  @Inject(EmailVerificationMapper)
  protected mapper!: EmailVerificationMapper;

  async findByEmail(email: string): Promise<EmailVerification | null> {
    const mongo = await this.model.findOne(<EmailVerificationMongo>{ email });

    return this.mapSingle(mongo);
  }

  async create(model: EmailVerification): Promise<EmailVerification> {
    const mongo = await this.model.create(await this.getCreateObject(model));

    return this.mapSingle(mongo) as Promise<EmailVerification>;
  }

  async delete(id: string): Promise<EmailVerification | null> {
    const mongo = await this.model.findByIdAndDelete(id);

    return this.mapSingle(mongo);
  }

  async deleteByEmail(email: string): Promise<{ deletedCount: number; acknowledged: boolean }> {
    return this.model.deleteOne({ email });
  }
}
