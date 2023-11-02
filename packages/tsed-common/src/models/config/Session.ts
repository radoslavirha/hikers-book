import { AdditionalProperties, Required } from '@tsed/schema';
// eslint-disable-next-line import/no-unresolved
import { SessionOptions } from 'express-session'; // installed only types

@AdditionalProperties(true)
export class SessionConfigModel implements SessionOptions {
  @Required()
  secret!: string;

  [key: string]: unknown;
}
