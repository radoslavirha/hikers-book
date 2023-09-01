import { CollectionOf, Property, Required } from '@tsed/schema';
import { Model, ObjectID, Ref } from '@tsed/mongoose';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Comment } from './Comment';

@Model({ schemaOptions: { timestamps: true } })
@ObjectType({ description: 'Trip model' })
export class Trip {
  @ObjectID('_id')
  @Field(() => ID, { name: 'id', description: 'MongoDB _id' })
  _id!: ObjectID;

  @Required()
  @Field()
  label!: string;

  @Property()
  @Field()
  description?: string;

  @Ref(() => Comment)
  @CollectionOf(() => Comment)
  comments?: Ref<Comment>[];

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

@InputType({ description: 'New trip data' })
export class AddTripInput implements Partial<Trip> {
  @Field()
  label!: string;

  @Field()
  description?: string;
}
