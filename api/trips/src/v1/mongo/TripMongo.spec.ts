import { PlatformTest } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { TestMongooseContext } from '@tsed/testing-mongoose';
import { TripMongo } from './TripMongo';

describe('Trip model', () => {
  beforeEach(TestMongooseContext.create);
  afterEach(TestMongooseContext.reset);

  it('Should save', async () => {
    const model = PlatformTest.get<MongooseModel<TripMongo>>(TripMongo);

    const trip = new model({ label: 'trip', description: 'description' });

    await trip.save();

    expect(trip.id).toBeDefined();
    expect(trip.label).toEqual('trip');
    expect(trip.description).toEqual('description');
    expect(trip.createdAt).toBeDefined();
    expect(trip.updatedAt).toBeDefined();
  });
});
