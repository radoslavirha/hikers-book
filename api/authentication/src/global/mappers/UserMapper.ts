import { MongoMapper } from '@hikers-book/tsed-common/mappers';
import { MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { Service } from '@tsed/di';
import { serialize } from '@tsed/json-mapper';
import { User } from '../models';
import { UserMongo } from '../mongo';

@Service()
export class UserMapper extends MongoMapper<UserMongo, User> {
  public async mongoToModel(mongo: UserMongo): Promise<User> {
    const model = new User();

    model.full_name = mongo.full_name;
    model.admin = mongo.admin;

    this.mongoToModelBase(model, mongo);

    return model;
  }

  public async modelToMongoCreateObject(model: User): Promise<MongoPlainObjectCreate<UserMongo>> {
    const mongo = new UserMongo() as MongoPlainObjectCreate<UserMongo>;

    mongo.full_name = this.getModelValue(model, 'full_name');
    mongo.admin = this.getModelValue(model, 'admin');

    return serialize(mongo);
  }

  public async modelToMongoUpdateObject(model: User): Promise<MongoPlainObjectUpdate<UserMongo>> {
    const mongo = new UserMongo() as MongoPlainObjectUpdate<UserMongo>;

    mongo.full_name = this.getModelValue(model, 'full_name', true);
    mongo.admin = this.getModelValue(model, 'admin', true);

    return serialize(mongo);
  }
}
