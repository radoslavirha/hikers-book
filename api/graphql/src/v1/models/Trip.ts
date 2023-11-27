import { Property, Required } from '@tsed/schema';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Trip model' })
export class Trip {
  @Field(() => ID, { name: 'id', description: 'MongoDB _id' })
  @Required()
  @Field()
  label!: string;

  @Property()
  @Field()
  description?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
