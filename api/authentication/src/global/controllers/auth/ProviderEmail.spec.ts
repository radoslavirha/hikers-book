import { PlatformTest } from '@tsed/common';
import { TestAuthenticationApiContext } from '../../../test/TestAuthenticationApiContext';
import { EmailProviderController } from './ProviderEmail';

describe('EmailProviderController', () => {
  beforeEach(TestAuthenticationApiContext.bootstrap());
  afterEach(TestAuthenticationApiContext.reset);

  it('Should be instantiated', async () => {
    const instance: EmailProviderController = await PlatformTest.invoke(EmailProviderController);
    expect(instance).toBeInstanceOf(EmailProviderController);
  });
});
