import { BaseHandler } from '@hikers-book/tsed-common/handlers';
import { JWTPayload } from '@hikers-book/tsed-common/types';
import { Injectable } from '@tsed/di';

@Injectable()
export class AuthenticateHandler extends BaseHandler<unknown, JWTPayload> {
  constructor() {
    super();
  }

  async performOperation(user: JWTPayload): Promise<JWTPayload> {
    return user;
  }
}
