import { AdditionalProperties, Required } from '@tsed/schema';
import { RedisOptions } from 'ioredis';

@AdditionalProperties(true)
export class IORedisConnectionModel implements RedisOptions {
  @Required()
  host!: string;

  @Required()
  port!: number;

  [key: string]: unknown;
}

@AdditionalProperties(false)
export class RedisConfigModel {
  @Required()
  default!: IORedisConnectionModel;
}
