import { Required } from '@tsed/schema';
import { Model, ObjectID, Ref } from '@tsed/mongoose';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Trip } from './Trip';

@Model({ schemaOptions: { timestamps: true } })
@ObjectType({ description: 'Comment model' })
export class Comment {
  @ObjectID('_id')
  @Field(() => ID, { name: 'id', description: 'MongoDB _id' })
  _id!: ObjectID;

  @Required()
  @Field()
  content!: string;

  @Ref(() => Trip)
  @Field(() => String)
  trip!: Ref<Trip>;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}

@InputType({ description: 'New comment data' })
export class AddCommentInput implements Partial<Comment> {
  @Field()
  content!: string;
}
