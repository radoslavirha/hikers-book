/**
 * Returns default server configuration.
 */
export const getServerDefaultConfig = (): Partial<TsED.Configuration> => ({
  httpPort: 4000,
  acceptMimes: ['application/json'],
  httpsPort: false,
  exclude: ['**/*.spec.ts'],
  disableComponentsScan: true,
  jsonMapper: {
    additionalProperties: false
  }
});

/**
 * Returns helmet directives to allow swagger-ui to work.
 */
export const getSwaggerHelmetDirectives = () => ({
  defaultSrc: [`'self'`],
  styleSrc: [`'self'`, `'unsafe-inline'`],
  imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
  scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
});
