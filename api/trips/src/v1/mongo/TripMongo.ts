import { BaseMongo } from '@hikers-book/tsed-common/mongo';
import { Model } from '@tsed/mongoose';
import { Property, Required } from '@tsed/schema';

@Model({ collection: 'trip', schemaOptions: { timestamps: true } })
export class TripMongo extends BaseMongo {
  @Required()
  label!: string;

  @Property()
  description?: string;
}
