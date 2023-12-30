import { PlatformTest } from '@tsed/common';
import { PlatformViews } from '@tsed/platform-views';
import { NodemailerMockTransporter } from 'nodemailer-mock';
import { NODEMAILER_TOKEN } from '../../global/connections/InjectionToken';
import { ConfigService } from '../../global/services/ConfigService';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { NodemailerFailedSendEmail } from '../exceptions';
import { EmailService } from './EmailService';

describe('EmailService', () => {
  let service: EmailService;
  let config: ConfigService;
  let platformViews: PlatformViews;
  let nodemailer: NodemailerMockTransporter;

  let platformViewsSpy: jest.SpyInstance;

  beforeEach(TestAuthenticationApiContext.bootstrap());
  beforeEach(() => {
    service = PlatformTest.get<EmailService>(EmailService);
    config = PlatformTest.get<ConfigService>(ConfigService);
    platformViews = PlatformTest.get<PlatformViews>(PlatformViews);
    nodemailer = PlatformTest.get<NodemailerMockTransporter>(NODEMAILER_TOKEN);

    platformViewsSpy = jest.spyOn(platformViews, 'render').mockResolvedValue('some html');
  });
  afterEach(TestAuthenticationApiContext.reset);
  afterEach(() => {
    nodemailer.nodemailermock?.mock?.reset();
  });

  describe('sendVerificationEmail', () => {
    it('Should pass', async () => {
      expect.assertions(3);

      await service.sendVerificationEmail('email@domain.com', 'token');

      const sentMail = nodemailer.nodemailermock.mock.getSentMail();

      expect(platformViewsSpy).toHaveBeenCalledWith('email/verify', {
        URL: `${config.config.frontend.url}/auth/invitation?token=token&email=email@domain.com`
      });
      expect(sentMail.length).toEqual(1);
      expect(sentMail[0]).toStrictEqual({
        from: 'email@icloud.com',
        to: 'email@domain.com',
        subject: `Welcome to Hiker's Book`,
        text: `Welcome to Hiker's Book`,
        html: 'some html',
        headers: {}
      });
    });

    it('Should return NodemailerFailedSendEmail', async () => {
      nodemailer.nodemailermock.mock.setShouldFail(true);
      expect.assertions(2);

      try {
        await service.sendVerificationEmail('email@domain.com', 'token');
      } catch (error) {
        expect(error).toBeInstanceOf(NodemailerFailedSendEmail);
        expect((error as NodemailerFailedSendEmail).message).toEqual(`Failed to send email to: email@domain.com!`);
      }
    });
  });
});
