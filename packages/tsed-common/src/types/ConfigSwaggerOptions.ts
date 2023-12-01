import { SwaggerDocsVersion } from './SwaggerDocsVersion.enum';

export type ConfigSwaggerOptions = {
  title: string;
  version: string;
  description: string;
  generateDocs: SwaggerDocsVersion[];
};
