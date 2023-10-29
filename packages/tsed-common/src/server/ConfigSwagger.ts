import { OpenSpec3, OpenSpecInfo } from '@tsed/openspec';
import { SwaggerSettings } from '@tsed/swagger';

export class ConfigSwagger {
  readonly _settings: SwaggerSettings[];

  public get settings() {
    return this._settings;
  }

  constructor(title: string, version: string, description?: string) {
    const info: OpenSpecInfo = {
      title,
      version,
      description
    };

    const spec: Partial<OpenSpec3> = {
      info,
      components: {
        securitySchemes: {
          basic: {
            type: 'http',
            scheme: 'basic',
            bearerFormat: ''
          }
        }
      }
    };

    this._settings = [
      {
        path: '/docs',
        specVersion: '3.0.1',
        spec
      }
    ];
  }
}
