import { Forbidden } from '@tsed/exceptions';

export class VerificationEmailExist extends Forbidden {
  constructor(email: string) {
    super(`Verification email already sent to ${email}!`);
  }
}
