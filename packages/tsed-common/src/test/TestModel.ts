import { Default, Property } from '@tsed/schema';
import { Base } from '../models/Base';

export class TestModelChild extends Base {
  @Property()
  label!: string;
}

export class TestModel extends Base {
  @Property()
  @Default('label')
  label!: string;

  @Property()
  child_id!: string;

  @Property(TestModelChild)
  child?: TestModelChild;
}
