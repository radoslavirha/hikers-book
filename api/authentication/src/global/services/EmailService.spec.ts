import { PlatformTest } from '@tsed/common';
import { PlatformViews } from '@tsed/platform-views';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { NODEMAILER_TOKEN } from '../connections/InjectionToken';
import { NODEMAILER } from '../connections/Nodemailer';
import { NodemailerFailedSendEmail } from '../exceptions';
import { ConfigService } from './ConfigService';
import { EmailService } from './EmailService';

describe('EmailService', () => {
  let service: EmailService;
  let config: ConfigService;
  let platformViews: PlatformViews;
  let nodemailer: NODEMAILER;

  beforeEach(TestAuthenticationApiContext.bootstrap());
  beforeEach(() => {
    service = PlatformTest.get<EmailService>(EmailService);
    config = PlatformTest.get<ConfigService>(ConfigService);
    platformViews = PlatformTest.get<PlatformViews>(PlatformViews);
    nodemailer = PlatformTest.get<NODEMAILER>(NODEMAILER_TOKEN);
  });
  afterEach(PlatformTest.reset);

  describe('sendVerificationEamil', () => {
    it('Should pass', async () => {
      // @ts-expect-error private
      const spy = jest.spyOn(service, 'sendMail').mockResolvedValue({});
      const platformViewsSpy = jest.spyOn(platformViews, 'render').mockResolvedValue('some html');

      expect.assertions(3);

      const result = await service.sendVerificationEamil('email@domain.com', 'token');

      expect(result).toEqual({});
      expect(platformViewsSpy).toHaveBeenCalledWith('email/verify', {
        URL: `${config.config.frontend.url}/auth/sign-up/email?token=token&email=email@domain.com`
      });
      expect(spy).toHaveBeenCalledWith({
        to: 'email@domain.com',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: 'some html'
      });
    });
  });

  describe('sendMail', () => {
    it('Should pass', async () => {
      const spy = jest.spyOn(nodemailer, 'sendMail').mockResolvedValue({});
      const options = {
        to: 'email@domain.com'
      };

      expect.assertions(2);

      // @ts-expect-error private
      const result = await service.sendMail(options);

      expect(result).toEqual({});
      expect(spy).toHaveBeenCalledWith({
        from: config.config.nodemailer.from,
        ...options
      });
    });

    it('Should throw error', async () => {
      jest.spyOn(nodemailer, 'sendMail').mockRejectedValue(new Error());
      const options = {
        to: 'email@domain.com'
      };

      expect.assertions(2);

      try {
        // @ts-expect-error private
        await service.sendMail(options);
      } catch (error) {
        expect(error).toBeInstanceOf(NodemailerFailedSendEmail);
        expect((error as NodemailerFailedSendEmail).message).toEqual(`Failed to send email to: ${options.to}!`);
      }
    });
  });
});
