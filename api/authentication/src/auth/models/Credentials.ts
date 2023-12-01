import { Base } from '@hikers-book/tsed-common/models';
import { Email, Enum, Property } from '@tsed/schema';
import { AuthProviderEnum } from '../enums';
import { User } from './User';

export class Credentials extends Base {
  @Enum(AuthProviderEnum)
  provider!: AuthProviderEnum;

  @Property()
  @Email()
  email!: string;

  @Property()
  provider_id?: string;

  @Property()
  password!: string;

  @Property()
  user_id!: string;

  @Property(User)
  user?: User;
}
