import { AT_PRIVATE_KEY, AT_PUBLIC_KEY, RT_PRIVATE_KEY, RT_PUBLIC_KEY } from '@hikers-book/tsed-common/stubs';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { createTransport } from 'nodemailer-mock';
import { Server } from '../Server';
import { KeysService } from '../auth/services/KeysService';
import { NODEMAILER_TOKEN } from '../global/connections/InjectionToken';

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
            algorithm: 'RS256',
            getATPrivateKey: jest.fn().mockResolvedValue(AT_PRIVATE_KEY),
            getATPublicKey: jest.fn().mockResolvedValue(AT_PUBLIC_KEY),
            getRTPrivateKey: jest.fn().mockResolvedValue(RT_PRIVATE_KEY),
            getRTPublicKey: jest.fn().mockResolvedValue(RT_PUBLIC_KEY)
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
