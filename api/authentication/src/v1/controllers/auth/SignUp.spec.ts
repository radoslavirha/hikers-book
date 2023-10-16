import { PlatformTest } from '@tsed/common';
import { SignUpController } from './SignUp';

describe('SignUpController', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('should do something', () => {
    const instance = PlatformTest.get<SignUpController>(SignUpController);

    expect(instance).toBeInstanceOf(SignUpController);
  });
});
