import { OS3Security, OpenSpec3, OpenSpecHash, OpenSpecInfo } from '@tsed/openspec';
import { SwaggerSettings } from '@tsed/swagger';
import { SwaggerUIOptionsConfigModel } from '../models';
import { SWAGGER_SECURITY_SCHEMES } from '../models/SwaggerSecuritySchemes';
import { SwaggerDocsVersion } from '../types/SwaggerDocsVersion.enum';
import { SwaggerSecurityScheme } from '../types/SwaggerSecurityScheme.enum';
import { BaseConfig } from './BaseConfig';

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

export class ConfigSwagger extends BaseConfig<SwaggerSettings[]> {
  constructor(options: ConfigSwaggerOptions) {
    const settings = options.documents.map((docsVersion) => ConfigSwagger.generateSettings(options, docsVersion));
    super(settings);
  }

  static generateSettings(options: ConfigSwaggerOptions, settings: SwaggerDocConfig): SwaggerSettings {
    return {
      path: `/${settings.doc}/docs`,
      doc: settings.doc,
      specVersion: '3.0.3',
      outFile: settings.outFile,
      spec: <Partial<OpenSpec3>>{
        info: <OpenSpecInfo>{
          title: `${options.title} - ${settings.doc}`,
          version: options.version,
          description: options.description
        },
        components: {
          securitySchemes: ConfigSwagger.getSecuritySchemes(settings.security)
        }
      },
      options: options.swaggerUIOptions
    };
  }

  static getSecuritySchemes(security: SwaggerSecurityScheme[]): OpenSpecHash<OS3Security> {
    const schemes: OpenSpecHash<OS3Security> = {};

    for (const scheme of security) {
      schemes[scheme] = SWAGGER_SECURITY_SCHEMES[scheme];
    }

    return schemes;
  }
}
