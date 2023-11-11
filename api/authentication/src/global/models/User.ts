import { Base } from '@hikers-book/tsed-common/models';
import { Required } from '@tsed/schema';

export class User extends Base {
  @Required()
  full_name!: string;

  @Required()
  admin!: boolean;
}
