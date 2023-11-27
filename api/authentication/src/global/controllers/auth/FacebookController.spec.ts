import { PlatformTest } from '@tsed/common';
import { AuthProviderFacebookController } from './FacebookController';

describe('AuthProviderFacebookController', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('Should be instantiated', async () => {
    const instance: AuthProviderFacebookController = await PlatformTest.invoke(AuthProviderFacebookController);
    expect(instance).toBeInstanceOf(AuthProviderFacebookController);
  });
});
