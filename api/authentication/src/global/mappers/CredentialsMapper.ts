import { MongoMapper } from '@hikers-book/tsed-common/mappers';
import { Inject, Service } from '@tsed/di';
import { Credentials } from '../models';
import { CredentialsMongo } from '../mongo';
import { UserMapper } from './UserMapper';

@Service()
export class CredentialsMapper extends MongoMapper<CredentialsMongo, Credentials> {
  @Inject()
  private userMapper!: UserMapper;

  public async mongoToModel(credentials: CredentialsMongo): Promise<Credentials> {
    const model = new Credentials();

    model.provider = credentials.provider;
    model.email = credentials.email;
    model.provider_id = credentials.provider_id;
    model.password = credentials.password as string;
    model.user_id = this.getIdFromPotentiallyPopulated(credentials.user_id);
    model.user = this.canBePopulated(credentials.user_id)
      ? await this.userMapper.mongoToModel(this.getPopulated(credentials.user_id))
      : undefined;

    this.mongoToModelBase(model, credentials);

    return model;
  }
}
