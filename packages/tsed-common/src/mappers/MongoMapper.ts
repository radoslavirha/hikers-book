import { MongooseDocumentMethods, Ref } from '@tsed/mongoose';
import { SpecTypes, getJsonSchema } from '@tsed/schema';
import _ from 'lodash';
import { Base } from '../models/Base';
import { BaseMongo } from '../mongo/BaseMongo';
import { MongoPlainObjectCreate, MongoPlainObjectUpdate } from '../types';

export abstract class MongoMapper<MONGO extends BaseMongo, MODEL extends Base> {
  public abstract mongoToModel(mongo: MONGO): Promise<MODEL>;
  public abstract modelToMongoCreateObject(model: MODEL): Promise<MongoPlainObjectCreate<MONGO>>;
  public abstract modelToMongoUpdateObject(model: MODEL): Promise<MongoPlainObjectUpdate<MONGO>>;

  protected mongoToModelBase(model: Partial<MODEL>, mongo: MONGO): MODEL {
    model.id = String(mongo._id);
    model.createdAt = mongo.createdAt;
    model.updatedAt = mongo.createdAt;

    return model as MODEL;
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

  protected getModelValue<PROPERTY extends keyof MODEL>(
    model: MODEL,
    property: PROPERTY,
    patch: boolean = false
  ): MODEL[PROPERTY] | undefined {
    if (!_.isUndefined(model[property])) {
      return model[property];
    } else if (!patch) {
      return this.getModelDefault(model, property);
    }
    return undefined;
  }

  private getModelDefault<PROPERTY extends keyof MODEL>(model: MODEL, property: PROPERTY): MODEL[PROPERTY] | undefined {
    const spec = getJsonSchema(model, { specType: SpecTypes.JSON });
    return spec?.properties[property]?.default;
  }
}
