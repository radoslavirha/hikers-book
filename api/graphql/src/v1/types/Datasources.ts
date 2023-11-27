import { StagesDataSource, TripsDataSource } from '../datasources';

export enum DataSourceName {
  // values must start with lowercase
  StagesDataSource = 'stagesDataSource',
  TripsDataSource = 'tripsDataSource'
}

export type Datasources = {
  [DataSourceName.StagesDataSource]: StagesDataSource;
  [DataSourceName.TripsDataSource]: TripsDataSource;
};
