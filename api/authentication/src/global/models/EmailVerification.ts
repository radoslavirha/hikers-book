import { Base } from '@hikers-book/tsed-common/models';
import { Email, Property } from '@tsed/schema';

export class EmailVerification extends Base {
  @Property()
  @Email()
  email!: string;

  @Property()
  token!: string;

  @Property()
  expires_in!: Date;
}
