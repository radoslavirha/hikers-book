import { MongoService } from '@hikers-book/tsed-common/mongo';
import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { TripMapper } from '../../mappers/TripMapper';
import { Trip } from '../../models';
import { TripMongo } from '../../mongo/TripMongo';

@Service()
export class TripMongoService extends MongoService<TripMongo, Trip> {
  @Inject(TripMongo)
  protected model!: MongooseModel<TripMongo>;

  @Inject(TripMapper)
  protected mapper!: TripMapper;

  async find(): Promise<Trip[]> {
    const trips = await this.model.find();
    return this.mapMany(trips);
  }
}
