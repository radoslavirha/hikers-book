import { MongooseService } from '@hikers-book/tsed-common/mongo';
import { MongoCreate } from '@hikers-book/types';
import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { UserMapper } from '../../mappers/UserMapper';
import { User } from '../../models';
import { UserMongo } from '../../mongo/UserMongo';

@Service()
export class UserMongooseService extends MongooseService<UserMongo, User> {
  @Inject(UserMongo)
  protected model!: MongooseModel<UserMongo>;

  @Inject(UserMapper)
  protected mapper!: UserMapper;

  async create(user: MongoCreate<UserMongo>): Promise<User> {
    const mongo = await this.model.create(user);

    return this.mapper.mongoToModel(mongo);
  }
}
