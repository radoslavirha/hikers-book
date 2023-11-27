import { JWTAuth } from '@hikers-book/tsed-common/decorators';
import { Controller } from '@tsed/di';
import { Description, Get, Returns } from '@tsed/schema';
import { GetTripsHandler } from '../handlers/trips/GetTripsHandler';
import { Trip } from '../models';

@Description('Trips controllers.')
@Controller('/trips')
@JWTAuth()
export class TripsController {
  constructor(private getTripsHandler: GetTripsHandler) {}

  @Get('/')
  @Description('Returns list of trips.')
  @Returns(200, [Trip])
  async get(): Promise<Trip[]> {
    return this.getTripsHandler.execute();
  }
}
