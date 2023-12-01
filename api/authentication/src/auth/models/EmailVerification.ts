import { Base } from '@hikers-book/tsed-common/models';
import { Email, Required } from '@tsed/schema';

export class EmailVerification extends Base {
  @Required()
  @Email()
  email!: string;

  @Required()
  token!: string;

  @Required()
  expires_in!: Date;
}
