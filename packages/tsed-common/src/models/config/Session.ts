import { AdditionalProperties, Required } from '@tsed/schema';

@AdditionalProperties(true)
export class SessionConfigModel implements CookieSessionInterfaces.CookieSessionOptions {
  @Required()
  secret!: string;

  [key: string]: unknown;
}
