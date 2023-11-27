import { JWTAuth } from '@hikers-book/tsed-common/decorators';
import { ResolverController } from '@tsed/typegraphql';
import { Ctx, Query } from 'type-graphql';
import { Trip } from '../models/Trip';
import { DataSourceName, Datasources } from '../types/Datasources';

@ResolverController()
@JWTAuth()
export class TripResolver {
  @Query(() => [Trip], { description: 'Get all the trips' })
  async Trips(@Ctx('dataSources') dataSources: Datasources) {
    console.log('ahojjj');

    const trips = dataSources[DataSourceName.TripsDataSource];
    const response = await trips.getTrips();
    console.log(response);
    return response;
  }
}
