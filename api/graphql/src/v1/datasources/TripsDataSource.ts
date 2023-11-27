import { DataSource } from '@tsed/typegraphql';
import { ConfigService } from '../../global/services/ConfigService';
import { Trip } from '../models/Trip';
import { DataSourceName } from '../types/Datasources';
import { BaseDataSource } from './BaseDataSource';

@DataSource(DataSourceName.TripsDataSource)
export class TripsDataSource extends BaseDataSource {
  constructor(configService: ConfigService) {
    super(`${configService.config.apis.hikersBook.tripsAPI}/v1/trips`);
  }

  async getTrip(id: string) {
    return this.get(`/${id}`);
  }

  async getTrips(): Promise<Trip[]> {
    return this.get('/');
  }
}
