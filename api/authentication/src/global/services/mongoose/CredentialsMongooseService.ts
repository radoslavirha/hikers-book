import { MongooseService } from '@hikers-book/tsed-common/mongo';
import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { CredentialsMapper } from '../../mappers/CredentialsMapper';
import { Credentials } from '../../models';
import { CredentialsMongo } from '../../mongo/CredentialsMongo';

@Service()
export class CredentialsMongooseService extends MongooseService<CredentialsMongo, Credentials> {
  @Inject(CredentialsMongo)
  protected model!: MongooseModel<CredentialsMongo>;

  @Inject(CredentialsMapper)
  protected mapper!: CredentialsMapper;

  async findById(id: string): Promise<Credentials | null> {
    const mongo = await this.model.findById(id).populate('user_id');

    return this.mapSingle(mongo);
  }

  async findByEmail(email: string): Promise<Credentials | null> {
    const mongo = await this.model.findOne(<CredentialsMongo>{ email });

    return this.mapSingle(mongo);
  }

  async findOne(credentials: Partial<CredentialsMongo>): Promise<Credentials | null> {
    const mongo = await this.model.findOne(credentials).populate('user_id');

    return this.mapSingle(mongo);
  }

  async findManyByEmail(email: string): Promise<Credentials[]> {
    const mongo = await this.model.find(<CredentialsMongo>{ email }).populate('user_id');

    return this.mapMany(mongo);
  }

  async create(credentials: Partial<CredentialsMongo>): Promise<Credentials> {
    const mongo = await this.model.create(credentials);

    return this.mapper.mongoToModel(mongo);
  }
}
