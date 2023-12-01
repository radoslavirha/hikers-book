import { BaseMongo } from '@hikers-book/tsed-common/mongo';
import { Model, MongooseDocument, MongooseNextCB, PreHook, Ref, Unique } from '@tsed/mongoose';
import { Description, Enum, Optional, Property, Required } from '@tsed/schema';
import { AuthProviderEnum } from '../enums';
import { CryptographyUtils } from '../utils';
import { UserMongo } from './UserMongo';

@Model({
  collection: 'credentials',
  schemaOptions: { timestamps: true }
})
export class CredentialsMongo extends BaseMongo {
  @Property()
  @Enum(AuthProviderEnum)
  @Required()
  @Description('Credentials provider used for authentication.')
  provider!: AuthProviderEnum;

  @Unique()
  @Required()
  @Description('Unique email for all the providers.')
  email!: string;

  @Property()
  @Optional()
  @Description(`User ID from auth provider. Not used by ${AuthProviderEnum.EMAIL} provider.`)
  provider_id?: string;

  @Property()
  @Optional()
  @Description(`Used only for ${AuthProviderEnum.EMAIL} provider.`)
  password?: string;

  @Ref(() => UserMongo)
  @Required()
  user_id!: Ref<UserMongo>;

  @PreHook('save')
  static async preSave(credentials: MongooseDocument<CredentialsMongo>, next: MongooseNextCB) {
    if (credentials.password && credentials.isModified('password')) {
      credentials.password = await CryptographyUtils.argon2CreateHash(credentials.password);
    }
    next();
  }
}
