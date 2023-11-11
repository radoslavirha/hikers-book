import { registerProvider } from '@tsed/di';
import { $log } from '@tsed/logger';
import { createTransport } from 'nodemailer';
import Mailer from 'nodemailer/lib/mailer';
import { ConfigService } from '../services/ConfigService';
import { NODEMAILER_TOKEN } from './InjectionToken';

export type NODEMAILER = Mailer;

registerProvider<NODEMAILER>({
  provide: NODEMAILER_TOKEN,
  deps: [ConfigService],
  async useAsyncFactory(config: ConfigService): Promise<NODEMAILER> {
    const transporter = createTransport(config.config.nodemailer);

    // istanbul ignore next
    if (!config.isTest) {
      try {
        $log.info('Verifying Nodemailer configuration');
        await new Promise((resolve, reject) => {
          transporter.verify((error, success) => {
            if (error) {
              reject(error);
            }

            resolve(success);
          });
        });
      } catch (error) {
        $log.error('Nodemailer is not configured properly');
        throw new Error('Nodemailer is not configured properly');
      }
    }

    return transporter;
  }
});
