import { OS3Security, OpenSpec3, OpenSpecHash, OpenSpecInfo } from '@tsed/openspec';
import { SwaggerSettings } from '@tsed/swagger';
import { SWAGGER_SECURITY_SCHEMES } from '../models/SwaggerSecuritySchemes';
import { SwaggerSecurityScheme } from '../types';
import { ConfigSwaggerOptions, SwaggerDocConfig } from '../types/ConfigSwaggerOptions';

export class ConfigSwagger {
  readonly _settings: SwaggerSettings[];

  public get settings() {
    return this._settings;
  }

  constructor(options: ConfigSwaggerOptions) {
    this._settings = options.documents.map((docsVersion) => this.generateSettings(options, docsVersion));
  }

  private generateSettings(options: ConfigSwaggerOptions, settings: SwaggerDocConfig): SwaggerSettings {
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
          securitySchemes: this.getSecuritySchemes(settings.security)
        }
      },
      options: options.swaggerUIOptions
    };
  }

  private getSecuritySchemes(security: SwaggerSecurityScheme[]): OpenSpecHash<OS3Security> {
    const schemes: OpenSpecHash<OS3Security> = {};

    for (const scheme of security) {
      schemes[scheme] = SWAGGER_SECURITY_SCHEMES[scheme];
    }

    return schemes;
  }
}
