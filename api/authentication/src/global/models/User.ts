import { Base } from '@hikers-book/tsed-common/models';
import { Property } from '@tsed/schema';

export class User extends Base {
  @Property()
  full_name!: string;

  @Property()
  admin!: boolean;
}
