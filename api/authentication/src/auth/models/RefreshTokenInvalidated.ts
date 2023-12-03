import { Base } from '@hikers-book/tsed-common/models';
import { Format, Property } from '@tsed/schema';
import { User } from './User';

export class RefreshTokenInvalidated extends Base {
  @Property()
  token?: string;

  @Format('date-time')
  invalidatedAt!: Date;

  @Property()
  user_id!: string;

  @Property(User)
  user?: User;
}
