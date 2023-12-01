import { PlatformTest } from '@tsed/common';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { AuthProviderEmailController } from './EmailController';

describe('AuthProviderEmailController', () => {
  beforeEach(TestAuthenticationApiContext.bootstrap());
  afterEach(TestAuthenticationApiContext.reset);

  it('Should be instantiated', async () => {
    const instance: AuthProviderEmailController = await PlatformTest.invoke(AuthProviderEmailController);
    expect(instance).toBeInstanceOf(AuthProviderEmailController);
  });
});
