import { MongoMapper } from '@hikers-book/tsed-common/mappers';
import { Service } from '@tsed/di';
import { User } from '../models';
import { UserMongo } from '../mongo';

@Service()
export class UserMapper extends MongoMapper<UserMongo, User> {
  public async mongoToModel(credentials: UserMongo): Promise<User> {
    const model = new User();

    model.full_name = credentials.full_name;
    model.admin = credentials.admin;

    this.mongoToModelBase(model, credentials);

    return model;
  }
}
