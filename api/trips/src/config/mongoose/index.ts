import cfg from 'config';
import { ConnectOptions } from 'mongoose';

export default [
  {
    id: 'trips',
    url: cfg.get<string>('mongodb.url'),
    connectionOptions: cfg.get<ConnectOptions>('mongodb.connectionOptions')
  }
];
