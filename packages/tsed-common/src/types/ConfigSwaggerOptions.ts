import { SwaggerDocsVersion } from './SwaggerDocsVersion.enum';
import { SwaggerSecurityScheme } from './SwaggerSecurityScheme.enum';

export type SwaggerDocConfig = {
  doc: SwaggerDocsVersion;
  security: SwaggerSecurityScheme[];
};

export type ConfigSwaggerOptions = {
  title: string;
  version: string;
  description: string;
  swagger: SwaggerDocConfig[];
};
