import { PlatformTest } from '@tsed/common';
import { GoogleProviderController } from './ProviderGoogle';

describe('GoogleProviderController', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('Should be instantiated', async () => {
    const instance: GoogleProviderController = await PlatformTest.invoke(GoogleProviderController);
    expect(instance).toBeInstanceOf(GoogleProviderController);
  });
});
