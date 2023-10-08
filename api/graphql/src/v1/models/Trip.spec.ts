import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { Trip } from './Trip';

describe('Trip model', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<Trip>>(Trip);

    const trip = new model({ label: 'trip', description: 'description' });

    await trip.save();

    expect(trip.label).toEqual('trip');
    expect(trip.description).toEqual('description');
  });
});
