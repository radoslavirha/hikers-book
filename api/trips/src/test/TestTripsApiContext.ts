import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Server } from '../Server';

// istanbul ignore next
export class TestTripsApiContext {
  static bootstrap(options?: Partial<TsED.Configuration>) {
    return TestMongooseContext.bootstrap(Server, {
      imports: [],
      ...options
    });
  }

  static clearDatabase(): Promise<void> {
    return TestMongooseContext.clearDatabase();
  }

  static reset(): Promise<void> {
    return TestMongooseContext.reset();
  }
}
