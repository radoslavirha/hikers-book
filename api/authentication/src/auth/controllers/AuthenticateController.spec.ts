import { PlatformTest } from '@tsed/common';
import { TestAuthenticationApiContext } from '../../test/TestAuthenticationApiContext';
import { AuthenticateController } from './AuthenticateController';

describe('AuthenticateController', () => {
  beforeEach(TestAuthenticationApiContext.bootstrap());
  afterEach(TestAuthenticationApiContext.reset);

  it('Should be instantiated', async () => {
    const instance: AuthenticateController = await PlatformTest.invoke(AuthenticateController);
    expect(instance).toBeInstanceOf(AuthenticateController);
  });
});
