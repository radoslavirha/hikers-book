import { Type } from '@tsed/core';
import { SwaggerDocConfig } from './ConfigSwaggerOptions';

export type ConfigLoaderOptions<T = object> = {
  service: string;
  port: number;
  configModel: Type<T>;
  swagger?: SwaggerDocConfig[];
};
