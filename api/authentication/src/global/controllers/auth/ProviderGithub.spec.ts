import { PlatformTest } from '@tsed/common';
import { GithubProviderController } from './ProviderGithub';

describe('GithubProviderController', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('Should be instantiated', async () => {
    const instance: GithubProviderController = await PlatformTest.invoke(GithubProviderController);
    expect(instance).toBeInstanceOf(GithubProviderController);
  });
});
