import { Format, Property } from '@tsed/schema';

export class Base {
  @Property()
  id!: string;

  @Format('date-time')
  createdAt!: Date;

  @Format('date-time')
  updatedAt!: Date;
}
