import { MongooseService } from '@hikers-book/tsed-common/mongo';
import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { AuthProviderEnum } from '../../../global/enums';
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
    const mongo = await this.model.findOne(<CredentialsMongo>{ email }).populate('user_id');

    return this.mapSingle(mongo);
  }

  async findByEmailAndProvider(email: string, provider: AuthProviderEnum): Promise<Credentials | null> {
    const mongo = await this.model.findOne(<CredentialsMongo>{ email, provider }).populate('user_id');

    return this.mapSingle(mongo);
  }

  async findManyByEmail(email: string): Promise<Credentials[]> {
    const mongo = await this.model.find(<CredentialsMongo>{ email }).populate('user_id');

    return this.mapMany(mongo);
  }

  async create(model: Credentials): Promise<Credentials> {
    const mongo = await this.model.create(await this.getCreateObject(model));

    return this.mapSingle(mongo) as Promise<Credentials>;
  }
}
