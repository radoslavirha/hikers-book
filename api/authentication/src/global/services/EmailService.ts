import { Inject, Service } from '@tsed/di';
import { PlatformViews } from '@tsed/platform-views';
import { SentMessageInfo } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { NODEMAILER_TOKEN } from '../connections/InjectionToken';
import { NODEMAILER } from '../connections/Nodemailer';
import { NodemailerFailedSendEmail } from '../exceptions/NodemailerFailedSendEmail';
import { ConfigService } from './ConfigService';

@Service()
export class EmailService {
  @Inject(NODEMAILER_TOKEN)
  private nodemailer!: NODEMAILER;

  @Inject()
  private platformViews!: PlatformViews;

  @Inject()
  private configService!: ConfigService;

  async sendVerificationEamil(email: string, token: string): Promise<SentMessageInfo> {
    const html = (await this.platformViews.render('email/verify', {
      URL: `${this.configService.config.frontend.url}/auth/sign-up/email?token=${token}&email=${email}`
    })) as string;

    return this.sendMail({
      to: email,
      subject: 'Hello ✔',
      text: 'Hello world?',
      html
    });
  }

  private async sendMail(options: MailOptions): Promise<SentMessageInfo> {
    try {
      const response = await this.nodemailer.sendMail({
        from: this.configService.config.nodemailer.from as string,
        ...options
      });
      return response;
    } catch (error) {
      throw new NodemailerFailedSendEmail(options.to as string);
    }
  }
}
