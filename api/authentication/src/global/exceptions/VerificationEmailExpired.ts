import { Forbidden } from '@tsed/exceptions';

export class VerificationEmailExpired extends Forbidden {
  constructor() {
    super(`Verification email expired!`);
  }
}
