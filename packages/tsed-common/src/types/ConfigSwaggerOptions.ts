import { SwaggerUIOptionsConfigModel } from '../models';
import { SwaggerDocsVersion } from './SwaggerDocsVersion.enum';
import { SwaggerSecurityScheme } from './SwaggerSecurityScheme.enum';

export type SwaggerDocConfig = {
  doc: SwaggerDocsVersion;
  security: SwaggerSecurityScheme[];
  outFile?: string;
};

export type ConfigSwaggerOptions = {
  title: string;
  version: string;
  description?: string;
  documents: SwaggerDocConfig[];
  swaggerUIOptions?: SwaggerUIOptionsConfigModel;
};
