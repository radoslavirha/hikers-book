import { BaseHandler } from '@hikers-book/tsed-common/handlers';
import { Injectable } from '@tsed/di';
import { Trip } from '../../models';
import { TripMongoService } from '../../services/mongo/TripMongoService';

@Injectable()
export class GetTripsHandler extends BaseHandler<unknown, Trip[]> {
  constructor(private tripMongoService: TripMongoService) {
    super();
  }

  async performOperation(): Promise<Trip[]> {
    const trips = await this.tripMongoService.find();
    return trips;
  }
}
