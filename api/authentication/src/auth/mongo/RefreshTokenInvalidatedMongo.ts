import { BaseMongo } from '@hikers-book/tsed-common/mongo';
import { Expires, Model, Ref, Unique } from '@tsed/mongoose';
import { Default, Description, Property, Required } from '@tsed/schema';
import { UserMongo } from './UserMongo';

@Model({
  collection: 'refresh-token-invalidated',
  schemaOptions: { timestamps: true }
})
export class RefreshTokenInvalidatedMongo extends BaseMongo {
  @Unique()
  @Required()
  @Description('Invalidated refresh token.')
  token!: string;

  @Ref(() => UserMongo)
  @Required()
  user_id!: Ref<UserMongo>;

  @Property()
  @Expires('90d')
  @Default(Date.now)
  invalidatedAt?: Date = new Date();
}
