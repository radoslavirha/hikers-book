import { MongooseService } from '@hikers-book/tsed-common/mongo';
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

  async create(model: User): Promise<User> {
    const mongo = await this.model.create(await this.getCreateObject(model));

    return this.mapSingle(mongo) as Promise<User>;
  }
}
