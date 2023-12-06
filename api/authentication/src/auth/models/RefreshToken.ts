import { Base } from '@hikers-book/tsed-common/models';
import { Format, Property } from '@tsed/schema';
import { User } from './User';

export class RefreshToken extends Base {
  @Property()
  token_jti!: string;

  @Format('date-time')
  issuedAt!: Date;

  @Property()
  user_id!: string;

  @Property(User)
  user?: User;
}
