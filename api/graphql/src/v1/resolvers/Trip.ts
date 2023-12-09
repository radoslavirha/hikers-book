import { ResolverController } from '@tsed/typegraphql';
import { Ctx, Query } from 'type-graphql';
import { Trip } from '../models/Trip';
import { DataSourceName, Datasources } from '../types/Datasources';

@ResolverController()
export class TripResolver {
  @Query(() => [Trip], { description: 'Get all the trips' })
  async Trips(@Ctx('dataSources') dataSources: Datasources) {
    const trips = dataSources[DataSourceName.TripsDataSource];
    const response = await trips.getTrips();
    return response;
  }
}
