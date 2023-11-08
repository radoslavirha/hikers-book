import { TestMongooseContext } from '@tsed/testing-mongoose';
import { createTransport } from 'nodemailer-mock';
import { Server } from '../src/Server';
import { NODEMAILER_TOKEN } from '../src/global/connections/InjectionToken';

export const TestServer = (options: Partial<TsED.Configuration> = {}) => {
  return TestMongooseContext.bootstrap(Server, {
    imports: [
      {
        token: NODEMAILER_TOKEN,
        use: {
          useAsyncFactory: jest.fn().mockResolvedValue(createTransport({}))
        }
      }
    ],
    ...options
  });
};
