import { registerConnectionProvider } from '@tsed/ioredis';
import Redis from 'ioredis';

export const REDIS_CONNECTION = Symbol.for('REDIS_CONNECTION');
export type REDIS_CONNECTION = Redis;

registerConnectionProvider({
  provide: REDIS_CONNECTION,
  name: 'default'
});
