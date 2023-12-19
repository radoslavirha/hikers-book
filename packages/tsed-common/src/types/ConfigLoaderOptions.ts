import { Type } from '@tsed/core';

export type ConfigLoaderOptions<T = object> = {
  service: string;
  port: number;
  configModel: Type<T>;
};
