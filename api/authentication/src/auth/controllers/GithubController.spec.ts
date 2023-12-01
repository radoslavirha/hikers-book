import { PlatformTest } from '@tsed/common';
import { AuthProviderGithubController } from './GithubController';

describe('AuthProviderGithubController', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('Should be instantiated', async () => {
    const instance: AuthProviderGithubController = await PlatformTest.invoke(AuthProviderGithubController);
    expect(instance).toBeInstanceOf(AuthProviderGithubController);
  });
});
