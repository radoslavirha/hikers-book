import { argon2CreateHash } from '@hikers-book/cryptography';
import { Model, MongooseDocument, MongooseNextCB, ObjectID, PreHook, Unique } from '@tsed/mongoose';
import { Default, Enum, Property, Required } from '@tsed/schema';
import { AuthProviderEnum } from '../types/enum';

@Model({
  schemaOptions: { timestamps: true }
})
export class User {
  @ObjectID('id')
  _id!: string;

  @Unique()
  @Required()
  email!: string;

  @Required()
  password!: string;

  @Property()
  @Enum(AuthProviderEnum)
  @Default(AuthProviderEnum.LOCAL)
  auth_provider?: string;

  @PreHook('save')
  static async preSave(user: MongooseDocument<User>, next: MongooseNextCB) {
    if (user.isModified('password')) {
      user.password = await argon2CreateHash(user.password);
    }
    next();
  }
}
