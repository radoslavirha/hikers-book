import { BadRequest } from '@tsed/exceptions';
import { AuthProviderEnum } from '../enums';

export class OAuth2ProviderEmailNotProvided extends BadRequest {
  constructor(provider: AuthProviderEnum) {
    super(`Email address not provided by ${provider}!`);
  }
}
