import { ObjectID } from '@tsed/mongoose';
import { Format, Property } from '@tsed/schema';

export class BaseMongo {
  @ObjectID('id')
  _id!: string;

  @Property()
  @Format('date-time')
  createdAt!: Date;

  @Property()
  @Format('date-time')
  updatedAt!: Date;
}
