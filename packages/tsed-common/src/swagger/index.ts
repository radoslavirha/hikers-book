import { OpenSpec3, OpenSpecInfo } from '@tsed/openspec';
// eslint-disable-next-line import/no-duplicates
import '@tsed/swagger';
// eslint-disable-next-line import/no-duplicates
import { SwaggerSettings } from '@tsed/swagger';
import { sync as readPackageJsonSync } from 'read-pkg';

export const getSwaggerConfig = (): SwaggerSettings[] => {
  const info: OpenSpecInfo = {
    title: readPackageJsonSync().name,
    version: readPackageJsonSync().version,
    description: readPackageJsonSync().description
  };

  const specOS3: Partial<OpenSpec3> = {
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

  return [
    {
      path: '/v3/docs',
      specVersion: '3.0.1',
      spec: specOS3
    }
  ];
};

export const getHelmetDirectives = () => ({
  defaultSrc: [`'self'`],
  styleSrc: [`'self'`, `'unsafe-inline'`],
  imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
  scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
});
