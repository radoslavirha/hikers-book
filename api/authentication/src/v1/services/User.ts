import { Inject, Service } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { User } from '../models';
import { User as MongoUser } from '../mongo/User';

@Service()
export class UserService {
  @Inject(MongoUser)
  private MongoUser!: MongooseModel<MongoUser>;

  async create(user: User): Promise<MongoUser> {
    return this.MongoUser.create(user);
  }

  async findByEmail(email: string): Promise<MongoUser | null> {
    return this.MongoUser.findOne({ email });
  }
}
