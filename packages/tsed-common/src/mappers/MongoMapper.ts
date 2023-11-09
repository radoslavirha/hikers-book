import { MongooseDocumentMethods, Ref } from '@tsed/mongoose';
import { Base } from '../models/Base';
import { BaseMongo } from '../mongo/BaseMongo';

export abstract class MongoMapper<MONGO extends BaseMongo, MODEL extends Base> {
  public abstract mongoToModel(mongo: MONGO): Promise<MODEL>;

  protected mongoToModelBase(model: MODEL, mongo: MONGO): MODEL {
    model.id = String(mongo._id);
    model.createdAt = mongo.createdAt;
    model.updatedAt = mongo.createdAt;

    return model;
  }

  protected getIdFromPotentiallyPopulated<T extends BaseMongo>(value: Ref<T>): string {
    return this.canBePopulated(value) ? (value as unknown as MongooseDocumentMethods<T>).toClass()._id : String(value);
  }

  protected getPopulated<T>(value: Ref<T>): T {
    return (value as MongooseDocumentMethods<T>).toClass();
  }

  protected canBePopulated<T>(value: Ref<T>): boolean {
    try {
      (value as MongooseDocumentMethods<T>).toClass();
      return true;
    } catch (error) {
      return false;
    }
  }
}
