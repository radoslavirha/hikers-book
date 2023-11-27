import { MongoMapper } from '@hikers-book/tsed-common/mappers';
import { MongoPlainObjectCreate, MongoPlainObjectUpdate } from '@hikers-book/tsed-common/types';
import { Service } from '@tsed/di';
import { serialize } from '@tsed/json-mapper';
import { Trip } from '../models';
import { TripMongo } from '../mongo';

@Service()
export class TripMapper extends MongoMapper<TripMongo, Trip> {
  public async mongoToModel(mongo: TripMongo): Promise<Trip> {
    const model = new Trip() as Partial<Trip>;

    model.label = mongo.label;
    model.description = mongo.description;

    this.mongoToModelBase(model, mongo);

    return model as Trip;
  }

  public async modelToMongoCreateObject(model: Trip): Promise<MongoPlainObjectCreate<TripMongo>> {
    const mongo = new TripMongo() as MongoPlainObjectCreate<TripMongo>;

    mongo.label = this.getModelValue(model, 'label');
    mongo.description = this.getModelValue(model, 'description');

    return serialize(mongo);
  }

  public async modelToMongoUpdateObject(model: Trip): Promise<MongoPlainObjectUpdate<TripMongo>> {
    const mongo = new TripMongo() as MongoPlainObjectUpdate<TripMongo>;

    mongo.label = this.getModelValue(model, 'label', true);
    mongo.description = this.getModelValue(model, 'description', true);

    return serialize(mongo);
  }
}
