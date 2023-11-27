import { Base } from '@hikers-book/tsed-common/models';
import { Property, Required } from '@tsed/schema';

export class Trip extends Base {
  @Required()
  label!: string;

  @Property()
  description!: string;
}
