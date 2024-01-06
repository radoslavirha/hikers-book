import { DataSource } from '@tsed/typegraphql';
import { ConfigService } from '../../global/services/ConfigService';
import { Trip } from '../models/Trip';
import { DataSourceName } from '../types/Datasources';
import { HikersBookRESTDataSource } from './HikersBookRESTDataSource';

@DataSource(DataSourceName.TripsDataSource)
export class TripsDataSource extends HikersBookRESTDataSource {
  constructor(configService: ConfigService) {
    super(`${ configService.config.apis.hikersBook.tripsAPI }/v1/trips`);
  }

  async getTrips(): Promise<Trip[]> {
    return this.get('/');
  }
}
