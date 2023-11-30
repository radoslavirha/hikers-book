import { JWTAuth } from '@hikers-book/tsed-common/decorators';
import { SwaggerDocsVersion } from '@hikers-book/tsed-common/types';
import { Controller } from '@tsed/di';
import { Description, Get, Returns } from '@tsed/schema';
import { Docs } from '@tsed/swagger';
import { GetTripsHandler } from '../handlers/trips/GetTripsHandler';
import { Trip } from '../models';

@Description('Trips controllers.')
@Controller('/trips')
@JWTAuth()
@Docs(SwaggerDocsVersion.V1)
export class TripsController {
  constructor(private getTripsHandler: GetTripsHandler) {}

  @Get('/')
  @Description('Returns list of trips.')
  @Returns(200, Array).Of(Trip)
  async get(): Promise<Trip[]> {
    return this.getTripsHandler.execute();
  }
}
