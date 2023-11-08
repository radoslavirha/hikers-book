import { AdditionalProperties, Property } from '@tsed/schema';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

@AdditionalProperties(true)
export class NodemailerConfigModel implements SMTPTransport.Options {
  @Property()
  service!: string;

  [key: string]: unknown;
}

// service: 'iCloud'
// auth: {
//   user: 'email@icloud.com',
//   pass: 'pass'
// }
