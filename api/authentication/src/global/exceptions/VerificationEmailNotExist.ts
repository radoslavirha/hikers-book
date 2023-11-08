import { NotFound } from '@tsed/exceptions';

export class VerificationEmailNotExist extends NotFound {
  constructor() {
    super(`Verification email does not exist!`);
  }
}
