import { PRIVATE_KEY, PUBLIC_KEY } from '@hikers-book/tsed-common/stubs';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { createTransport } from 'nodemailer-mock';
import { Server } from '../Server';
import { NODEMAILER_TOKEN } from '../global/connections/InjectionToken';
import { KeysService } from '../global/services/KeysService';

// istanbul ignore next
export class TestAuthenticationApiContext {
  static bootstrap(options?: Partial<TsED.Configuration>) {
    return TestMongooseContext.bootstrap(Server, {
      imports: [
        {
          token: NODEMAILER_TOKEN,
          use: createTransport({})
        },
        {
          token: KeysService,
          use: {
            getPrivateKey: jest.fn().mockResolvedValue(PRIVATE_KEY),
            getPublicKey: jest.fn().mockResolvedValue(PUBLIC_KEY)
          }
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
