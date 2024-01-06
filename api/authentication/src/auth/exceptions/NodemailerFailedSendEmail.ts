import { BadRequest } from '@tsed/exceptions';

export class NodemailerFailedSendEmail extends BadRequest {
  constructor(email: string) {
    super(`Failed to send email to: ${ email }!`);
  }
}
