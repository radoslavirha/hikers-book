import { DataSource } from '@tsed/typegraphql';
import { ConfigService } from '../../global/services/ConfigService';
import { DataSourceName } from '../types/Datasources';
import { BaseDataSource } from './BaseDataSource';

@DataSource(DataSourceName.StagesDataSource)
export class StagesDataSource extends BaseDataSource {
  constructor(configService: ConfigService) {
    super(`${configService.config.apis.hikersBook.stagesAPI}/v1/stages`);
  }
}
