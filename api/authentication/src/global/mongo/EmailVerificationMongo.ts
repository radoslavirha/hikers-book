import { BaseMongo } from '@hikers-book/tsed-common/mongo';
import { Model, Unique } from '@tsed/mongoose';
import { Default, Description, Property, Required } from '@tsed/schema';

@Model({
  collection: 'email-verification',
  schemaOptions: { timestamps: true }
})
export class EmailVerificationMongo extends BaseMongo {
  @Unique()
  @Required()
  @Description('Verification email.')
  email!: string;

  @Unique()
  @Required()
  @Description('Token for registration confirmation.')
  token!: string;

  @Property()
  @Required()
  @Description(`Expiration for verification email.`)
  @Default(Date.now)
  expires_in: Date = new Date();
}
