import { Inject, Service } from '@tsed/di';
import { PlatformViews } from '@tsed/platform-views';
import { SentMessageInfo } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { NODEMAILER_TOKEN } from '../../global/connections/InjectionToken';
import { NODEMAILER } from '../../global/connections/Nodemailer';
import { ConfigService } from '../../global/services/ConfigService';
import { NodemailerFailedSendEmail } from '../exceptions/NodemailerFailedSendEmail';

@Service()
export class EmailService {
  @Inject(NODEMAILER_TOKEN)
  private nodemailer!: NODEMAILER;

  constructor(
    private platformViews: PlatformViews,
    private configService: ConfigService
  ) {}

  async sendVerificationEmail(email: string, token: string): Promise<SentMessageInfo> {
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
