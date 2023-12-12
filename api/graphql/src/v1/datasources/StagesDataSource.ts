import { DataSource } from '@tsed/typegraphql';
import { ConfigService } from '../../global/services/ConfigService';
import { DataSourceName } from '../types/Datasources';
import { HikersBookRESTDataSource } from './HikersBookRESTDataSource';

@DataSource(DataSourceName.StagesDataSource)
export class StagesDataSource extends HikersBookRESTDataSource {
  constructor(configService: ConfigService) {
    super(`${configService.config.apis.hikersBook.stagesAPI}/v1/stages`);
  }
}
