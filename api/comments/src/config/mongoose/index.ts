import cfg from 'config';
import { ConnectOptions } from 'mongoose';

export default [
  {
    id: 'comments',
    url: cfg.get<string>('mongodb.url'),
    connectionOptions: cfg.get<ConnectOptions>('mongodb.connectionOptions')
  }
];
