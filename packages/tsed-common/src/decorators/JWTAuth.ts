import { useDecorators } from '@tsed/core';
import { Unauthorized } from '@tsed/exceptions';
import { Authenticate, AuthorizeOptions } from '@tsed/passport';
import { In, Returns, Security } from '@tsed/schema';

/**
 * Set JWTAuth access on decorated route
 * @param options
 */
export function JWTAuth(options: AuthorizeOptions = {}) {
  return useDecorators(
    Authenticate('jwt', { ...options, session: false }),
    Security('jwt'),
    Returns(401, Unauthorized).Description('Unauthorized'),
    In('header').Name('Authorization').Description('JWT Bearer token').Type(String).Required(false)
  );
}
