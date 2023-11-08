import { Model, Ref } from '@tsed/mongoose';
import { Property } from '@tsed/schema';
import { BaseMongo } from '../mongo/BaseMongo';

@Model({
  collection: 'model-child',
  schemaOptions: { timestamps: true }
})
export class TestModelChildMongo extends BaseMongo {
  @Property()
  label!: string;
}

@Model({
  collection: 'model',
  schemaOptions: { timestamps: true }
})
export class TestModelMongo extends BaseMongo {
  @Property()
  label!: string;

  @Ref(() => TestModelChildMongo)
  child_id!: Ref<TestModelChildMongo>;
}
