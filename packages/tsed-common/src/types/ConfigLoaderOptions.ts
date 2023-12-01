import { Type } from '@tsed/core';
import { SwaggerDocsVersion } from './SwaggerDocsVersion.enum';

export type ConfigLoaderOptions<T = object> = {
  service: string;
  port: number;
  configModel: Type<T>;
  generateDocs?: SwaggerDocsVersion[];
};
