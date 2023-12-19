import { $log } from '@tsed/common';
import { Required } from '@tsed/schema';
import { ConfigLoder } from '.';
import { SwaggerUIOptionsConfigModel } from '../models';
import { ConfigLoaderOptions, SwaggerDocsVersion, SwaggerSecurityScheme } from '../types';
import { CommonUtils } from '../utils';

// Must match the config file in config/test.json
class ConfigModel {
  @Required()
  test!: string;
}

class ConfigModelInvalid extends ConfigModel {
  @Required()
  test2!: string;
}

const options: ConfigLoaderOptions = {
  service: 'test',
  port: 4000,
  configModel: ConfigModel
};

describe('ConfigLoder', () => {
  it('Should pass', async () => {
    const loader = new ConfigLoder(options);

    expect(loader.service).toEqual('test');
    expect(loader.port).toEqual(4000);
    expect(loader.api).toEqual({ service: 'test', version: expect.any(String), description: expect.any(String) });
    expect(loader.isProduction).toEqual(false);
    expect(loader.config).toEqual({ test: 'value' });
    expect(loader.server).toEqual({
      httpPort: 4000,
      acceptMimes: ['application/json'],
      httpsPort: false,
      exclude: ['**/*.spec.ts'],
      disableComponentsScan: true,
      jsonMapper: {
        additionalProperties: false
      },
      envs: expect.any(Object)
    });
    expect(loader.swagger).toBeUndefined();
  });

  it('Should pass - isProduction', async () => {
    const loader = new ConfigLoder(options);
    loader._envs.NODE_ENV = 'production';

    expect(loader.isProduction).toEqual(true);
  });

  it('Should pass - isTest', async () => {
    const loader = new ConfigLoder(options);
    loader._envs.NODE_ENV = 'test';

    expect(loader.isTest).toEqual(true);
  });

  it('buildSwagger', async () => {
    const loader = new ConfigLoder(options);

    const swaggerConfig = loader.buildSwagger(
      [
        {
          doc: SwaggerDocsVersion.GLOBAL,
          security: [SwaggerSecurityScheme.BASIC]
        },
        {
          doc: SwaggerDocsVersion.V1,
          security: [SwaggerSecurityScheme.BEARER_JWT],
          outFile: 'swagger.json'
        }
      ],
      CommonUtils.buildModel(SwaggerUIOptionsConfigModel, {})
    );

    expect(swaggerConfig).toEqual([
      {
        path: `/${SwaggerDocsVersion.GLOBAL}/docs`,
        doc: SwaggerDocsVersion.GLOBAL,
        specVersion: '3.0.3',
        outFile: undefined,
        spec: {
          info: {
            title: `test - ${SwaggerDocsVersion.GLOBAL}`,
            version: expect.any(String),
            description: expect.any(String)
          },
          components: {
            securitySchemes: {
              BASIC: {
                type: 'http',
                scheme: 'basic',
                description: 'Basic authentication'
              }
            }
          }
        },
        options: {}
      },
      {
        path: `/${SwaggerDocsVersion.V1}/docs`,
        doc: SwaggerDocsVersion.V1,
        specVersion: '3.0.3',
        outFile: 'swagger.json',
        spec: {
          info: {
            title: `test - ${SwaggerDocsVersion.V1}`,
            version: expect.any(String),
            description: expect.any(String)
          },
          components: {
            securitySchemes: {
              BEARER_JWT: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Bearer JWT token'
              }
            }
          }
        },
        options: {}
      }
    ]);
  });

  it('Should fail', async () => {
    const spy = jest.spyOn($log, 'error').mockImplementation();
    const options: ConfigLoaderOptions = {
      service: 'test',
      port: 4000,
      configModel: ConfigModelInvalid
    };

    try {
      new ConfigLoder(options);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toEqual('Invalid configuration!');
      expect(spy).toBeCalledWith(expect.stringContaining('Config file: '));
    }
  });
});
