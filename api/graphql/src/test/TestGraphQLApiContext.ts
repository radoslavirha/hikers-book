import { PlatformTest } from '@tsed/common';
import { Server } from '../Server';

export class TestGraphQLApiContext {
  static bootstrap(options?: Partial<TsED.Configuration>) {
    return PlatformTest.bootstrap(Server, {
      imports: [],
      ...options
    });
  }

  static reset(): Promise<void> {
    return PlatformTest.reset();
  }
}
