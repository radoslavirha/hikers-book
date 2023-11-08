import { Property } from '@tsed/schema';

export class Base {
  @Property()
  id!: string;

  @Property()
  createdAt!: Date;

  @Property()
  updatedAt!: Date;
}
