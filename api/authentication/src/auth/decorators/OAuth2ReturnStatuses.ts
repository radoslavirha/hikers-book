import { useDecorators } from '@tsed/core';
import { Forbidden, UnprocessableEntity } from '@tsed/exceptions';
import { Returns } from '@tsed/schema';
import { CredentialsAlreadyExist } from '../exceptions';

/**
 * Set Swagger return statuses for UAuth2
 * @param options
 */
export function OAuth2ReturnStatuses() {
  return useDecorators(
    Returns(301),
    Returns(UnprocessableEntity.STATUS, UnprocessableEntity),
    Returns(Forbidden.STATUS, Forbidden),
    Returns(CredentialsAlreadyExist.STATUS, CredentialsAlreadyExist)
  );
}
