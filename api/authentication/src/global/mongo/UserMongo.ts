import { BaseMongo } from '@hikers-book/tsed-common/mongo';
import { Model } from '@tsed/mongoose';
import { Required } from '@tsed/schema';

@Model({
  collection: 'user',
  schemaOptions: { timestamps: true }
})
export class UserMongo extends BaseMongo {
  @Required()
  full_name!: string;

  @Required()
  admin!: boolean;
}
