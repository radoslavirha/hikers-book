import { PlatformTest } from '@tsed/common';
import { AuthProviderGoogleController } from './GoogleController';

describe('AuthProviderGoogleController', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('Should be instantiated', async () => {
    const instance: AuthProviderGoogleController = await PlatformTest.invoke(AuthProviderGoogleController);
    expect(instance).toBeInstanceOf(AuthProviderGoogleController);
  });
});
