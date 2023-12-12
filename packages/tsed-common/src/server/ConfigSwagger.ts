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
    this._settings = options.swagger.map((docsVersion) =>
      this.generateSettings(options.title, options.version, options.description, docsVersion)
    );
  }

  // eslint-disable-next-line max-params
  private generateSettings(
    title: string,
    version: string,
    description: string,
    settings: SwaggerDocConfig
  ): SwaggerSettings {
    return {
      path: `/${settings.doc}/docs`,
      doc: settings.doc,
      specVersion: '3.0.3',
      outFile: settings.outFile,
      spec: <Partial<OpenSpec3>>{
        info: <OpenSpecInfo>{
          title: `${title} - ${settings.doc}`,
          version,
          description
        },
        components: {
          securitySchemes: this.getSecuritySchemes(settings.security)
        }
      }
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
