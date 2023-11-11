import { MongoMapper } from '@hikers-book/tsed-common/mappers';
import { MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { Inject, Service } from '@tsed/di';
import { serialize } from '@tsed/json-mapper';
import { Credentials } from '../models';
import { CredentialsMongo } from '../mongo';
import { UserMapper } from './UserMapper';

@Service()
export class CredentialsMapper extends MongoMapper<CredentialsMongo, Credentials> {
  @Inject()
  private userMapper!: UserMapper;

  public async mongoToModel(mongo: CredentialsMongo): Promise<Credentials> {
    const model = new Credentials();

    model.provider = mongo.provider;
    model.email = mongo.email;
    model.provider_id = mongo.provider_id;
    model.password = mongo.password as string;
    model.user_id = this.getIdFromPotentiallyPopulated(mongo.user_id);
    model.user = this.canBePopulated(mongo.user_id)
      ? await this.userMapper.mongoToModel(this.getPopulated(mongo.user_id))
      : undefined;

    this.mongoToModelBase(model, mongo);

    return model;
  }

  public async modelToMongoCreateObject(model: Credentials): Promise<MongoPlainObjectCreate<CredentialsMongo>> {
    const mongo = new CredentialsMongo() as MongoPlainObjectCreate<CredentialsMongo>;

    mongo.provider = this.getModelValue(model, 'provider');
    mongo.email = this.getModelValue(model, 'email');
    mongo.provider_id = this.getModelValue(model, 'provider_id');
    mongo.password = this.getModelValue(model, 'password');
    mongo.user_id = this.getModelValue(model, 'user_id');

    return serialize(mongo);
  }

  public async modelToMongoUpdateObject(model: Credentials): Promise<MongoPlainObjectUpdate<CredentialsMongo>> {
    const mongo = new CredentialsMongo() as MongoPlainObjectUpdate<CredentialsMongo>;

    mongo.provider = this.getModelValue(model, 'provider', true);
    mongo.email = this.getModelValue(model, 'email', true);
    mongo.provider_id = this.getModelValue(model, 'provider_id', true);
    mongo.password = this.getModelValue(model, 'password', true);
    mongo.user_id = this.getModelValue(model, 'user_id', true);

    return serialize(mongo);
  }
}
