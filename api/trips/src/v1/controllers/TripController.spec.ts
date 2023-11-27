import { PlatformTest } from '@tsed/common';
import { TripsController } from './TripsController';

describe('HelloWorldController', () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it('Should do something', () => {
    const instance = PlatformTest.get<TripsController>(TripsController);

    expect(instance).toBeInstanceOf(TripsController);
  });
});
