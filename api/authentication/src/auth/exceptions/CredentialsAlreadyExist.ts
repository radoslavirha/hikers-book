import { Forbidden } from '@tsed/exceptions';
import { AuthProviderEnum } from '../enums/AuthProviderEnum';

export class CredentialsAlreadyExist extends Forbidden {
  constructor(email: string, provider: AuthProviderEnum) {
    super(`User with email ${email} is already registered with ${provider}!`);
  }
}
