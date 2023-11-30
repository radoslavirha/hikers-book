import { OpenSpec3, OpenSpecInfo } from '@tsed/openspec';
import { SwaggerSettings } from '@tsed/swagger';
import { SwaggerSecurityScheme } from '../types';
import { SwaggerDocsVersion } from '../types/SwaggerDocsVersion.enum';

export class ConfigSwagger {
  readonly _settings: SwaggerSettings[];

  public get settings() {
    return this._settings;
  }

  constructor(title: string, version: string, description: string) {
    this._settings = [
      this.generateSettings(title, version, description, SwaggerDocsVersion.GLOBAL),
      this.generateSettings(title, version, description, SwaggerDocsVersion.V1)
    ];
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
      options: {
        requestSnippets: true
      },
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
            }
          }
        }
      }
    };
  }
}
