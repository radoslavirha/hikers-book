import cfg from 'config';
import { ConnectOptions } from 'mongoose';

export default [
  {
    id: 'authentication',
    url: cfg.get<string>('mongodb.url'),
    connectionOptions: cfg.get<ConnectOptions>('mongodb.connectionOptions')
  }
];
