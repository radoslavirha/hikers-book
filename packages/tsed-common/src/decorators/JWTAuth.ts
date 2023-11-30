import { useDecorators } from '@tsed/core';
import { Unauthorized } from '@tsed/exceptions';
import { Authenticate, AuthorizeOptions } from '@tsed/passport';
import { Returns, Security } from '@tsed/schema';
import { SwaggerSecurityScheme } from '../types';

/**
 * Set JWTAuth access on decorated route
 * @param options
 */
export function JWTAuth(options: AuthorizeOptions = {}) {
  return useDecorators(
    Authenticate('jwt', { ...options, session: false }),
    Security(SwaggerSecurityScheme.BEARER_JWT),
    Returns(401, Unauthorized).Description('Unauthorized')
    // Do not set .Required(true), as it will cause Swagger to require Authorization header.
    // Properly set securitySchemes will unlock Authorize header which automatically uses Bearer JWT token.
    // In('header').Name('Authorization').Description('Bearer JWT token').Type(String)
  );
}
