import { MongoMapper } from '@hikers-book/tsed-common/mappers';
import { MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { Inject, Service } from '@tsed/di';
import { serialize } from '@tsed/json-mapper';
import { RefreshToken } from '../models';
import { RefreshTokenMongo } from '../mongo';
import { UserMapper } from './UserMapper';

@Service()
export class RefreshTokenMapper extends MongoMapper<RefreshTokenMongo, RefreshToken> {
  @Inject()
  private userMapper!: UserMapper;

  public async mongoToModel(mongo: RefreshTokenMongo): Promise<RefreshToken> {
    const model = new RefreshToken();

    model.token = mongo.token;
    model.issuedAt = mongo.issuedAt!;
    model.user_id = this.getIdFromPotentiallyPopulated(mongo.user_id);
    model.user = this.canBePopulated(mongo.user_id)
      ? await this.userMapper.mongoToModel(this.getPopulated(mongo.user_id))
      : undefined;

    this.mongoToModelBase(model, mongo);

    return model;
  }

  public async modelToMongoCreateObject(model: RefreshToken): Promise<MongoPlainObjectCreate<RefreshTokenMongo>> {
    const mongo = new RefreshTokenMongo() as MongoPlainObjectCreate<RefreshTokenMongo>;

    mongo.token = this.getModelValue(model, 'token');
    mongo.issuedAt = this.getModelValue(model, 'issuedAt');
    mongo.user_id = this.getModelValue(model, 'user_id');

    return serialize(mongo);
  }

  public async modelToMongoUpdateObject(model: RefreshToken): Promise<MongoPlainObjectUpdate<RefreshTokenMongo>> {
    const mongo = new RefreshTokenMongo() as MongoPlainObjectUpdate<RefreshTokenMongo>;

    mongo.token = this.getModelValue(model, 'token', true);
    mongo.issuedAt = this.getModelValue(model, 'issuedAt');
    mongo.user_id = this.getModelValue(model, 'user_id', true);

    return serialize(mongo);
  }
}
