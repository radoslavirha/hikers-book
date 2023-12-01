import { OS3Security } from '@tsed/openspec';
import { EnumObject, SwaggerSecurityScheme } from '../types';

export const SWAGGER_SECURITY_SCHEMES: EnumObject<SwaggerSecurityScheme, OS3Security> = {
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
};
