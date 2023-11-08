import { AdditionalProperties, Required } from '@tsed/schema';

class OAuth2ConfigModel {
  @Required()
  clientID!: string;

  @Required()
  clientSecret!: string;

  @Required()
  callbackURL!: string;
}

@AdditionalProperties(false)
export class AuthConfigModel {
  @Required()
  facebook!: OAuth2ConfigModel;

  @Required()
  github!: OAuth2ConfigModel;

  @Required()
  google!: OAuth2ConfigModel;
}
