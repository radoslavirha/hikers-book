import { PlatformTest } from '@tsed/common';
import { FacebookProviderController } from './ProviderFacebook';

describe('FacebookProviderController', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('Should be instantiated', async () => {
    const instance: FacebookProviderController = await PlatformTest.invoke(FacebookProviderController);
    expect(instance).toBeInstanceOf(FacebookProviderController);
  });
});
