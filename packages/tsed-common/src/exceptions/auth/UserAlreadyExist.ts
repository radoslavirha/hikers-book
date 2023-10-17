import { Conflict } from '@tsed/exceptions';

export class UserAlreadyExist extends Conflict {
  constructor(email: string) {
    super(`User with email ${email} already exist!`);
  }
}
