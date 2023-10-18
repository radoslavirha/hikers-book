import { OpenSpec3, OpenSpecInfo } from '@tsed/openspec';
// eslint-disable-next-line import/no-duplicates
import '@tsed/swagger';
// eslint-disable-next-line import/no-duplicates
import { SwaggerSettings } from '@tsed/swagger';
import { readFileSync } from 'fs';

export const getSwaggerConfig = (path: string): SwaggerSettings[] => {
  const pkg = JSON.parse(readFileSync(path, { encoding: 'utf8' }));

  const info: OpenSpecInfo = {
    title: pkg.name,
    version: pkg.version,
    description: pkg.description
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
