import { registerConnectionProvider } from '@tsed/ioredis';
import Redis from 'ioredis';
import { REDIS_TOKEN } from './InjectionToken';

export type REDIS_CONNECTION = Redis;

registerConnectionProvider({
  provide: REDIS_TOKEN,
  name: 'default'
});
