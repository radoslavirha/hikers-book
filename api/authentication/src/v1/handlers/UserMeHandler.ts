import { BaseHandler } from '@hikers-book/tsed-common/handlers';
import { Injectable } from '@tsed/di';

@Injectable()
export class UserMeHandler extends BaseHandler<unknown, void> {
  constructor() {
    super();
  }

  async performOperation(): Promise<void> {
    console.log('here');
  }
}
