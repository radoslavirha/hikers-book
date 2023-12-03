import { BaseMongo } from '@hikers-book/tsed-common/mongo';
import { Expires, Model, Ref, Unique } from '@tsed/mongoose';
import { Default, Description, Property, Required } from '@tsed/schema';
import { UserMongo } from './UserMongo';

@Model({
  collection: 'refresh-token',
  schemaOptions: { timestamps: true }
})
export class RefreshTokenMongo extends BaseMongo {
  @Unique()
  @Required()
  @Description('Refresh token.')
  token!: string;

  @Ref(() => UserMongo)
  @Required()
  user_id!: Ref<UserMongo>;

  @Property()
  @Expires('90d')
  @Default(Date.now)
  issuedAt?: Date = new Date();
}
