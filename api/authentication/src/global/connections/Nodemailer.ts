import { registerProvider } from '@tsed/di';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '../services/ConfigService';
import { NODEMAILER_TOKEN } from './InjectionToken';

// TODO: Fix this type and return type SentMessageInfo in EmailService
export type NODEMAILER = Transporter;

registerProvider<NODEMAILER>({
  provide: NODEMAILER_TOKEN,
  deps: [ConfigService],
  async useAsyncFactory(config: ConfigService): Promise<NODEMAILER> {
    const transporter = createTransport(config.config.nodemailer);

    try {
      await new Promise((resolve, reject) => {
        transporter.verify((error, success) => {
          if (error) {
            reject(error);
          }

          resolve(success);
        });
      });
    } catch (error) {
      throw new Error('Nodemailer is not configured properly');
    }

    return transporter;
  }
});
