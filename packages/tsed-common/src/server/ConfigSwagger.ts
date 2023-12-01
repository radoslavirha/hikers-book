import { OpenSpec3, OpenSpecInfo } from '@tsed/openspec';
import { SwaggerSettings } from '@tsed/swagger';
import { SwaggerSecurityScheme } from '../types';
import { ConfigSwaggerOptions } from '../types/ConfigSwaggerOptions';
import { SwaggerDocsVersion } from '../types/SwaggerDocsVersion.enum';

export class ConfigSwagger {
  readonly _settings: SwaggerSettings[];

  public get settings() {
    return this._settings;
  }

  constructor(options: ConfigSwaggerOptions) {
    this._settings = options.generateDocs.map((docsVersion) =>
      this.generateSettings(options.title, options.version, options.description, docsVersion)
    );
  }

  // eslint-disable-next-line max-params
  private generateSettings(
    title: string,
    version: string,
    description: string,
    docsVersion: SwaggerDocsVersion
  ): SwaggerSettings {
    return {
      path: `/${docsVersion}/docs`,
      doc: docsVersion,
      specVersion: '3.0.3',
      spec: <Partial<OpenSpec3>>{
        info: <OpenSpecInfo>{
          title,
          version,
          description
        },
        components: {
          securitySchemes: {
            [SwaggerSecurityScheme.BEARER_JWT]: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description: 'Bearer JWT token'
            },
            [SwaggerSecurityScheme.BASIC]: {
              type: 'http',
              scheme: 'basic',
              description: 'Basic authentication'
            }
          }
        }
      }
    };
  }
}
