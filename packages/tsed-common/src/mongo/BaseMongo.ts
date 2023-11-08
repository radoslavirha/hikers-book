import { ObjectID } from '@tsed/mongoose';
import { Property } from '@tsed/schema';

export class BaseMongo {
  @ObjectID('id')
  _id!: string;

  @Property()
  createdAt!: Date;

  @Property()
  updatedAt!: Date;
}
