import { Required } from '@tsed/schema';

export class JWTConfigModel {
  @Required()
  expiresIn!: string;

  @Required()
  expiresInRefresh!: string;
}
