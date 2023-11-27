import { TestMongooseContext } from '@tsed/testing-mongoose';
import { createTransport } from 'nodemailer-mock';
import { Server } from '../Server';
import { NODEMAILER_TOKEN } from '../global/connections/InjectionToken';

// istanbul ignore next
export class TestAuthenticationApiContext {
  static bootstrap(options?: Partial<TsED.Configuration>) {
    return TestMongooseContext.bootstrap(Server, {
      imports: [
        {
          token: NODEMAILER_TOKEN,
          use: createTransport({})
        }
      ],
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
