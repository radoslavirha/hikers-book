import { TripNotFoundError } from './TripNotFoundError';

describe('TripNotFoundError', () => {
  it('Should have message', async () => {
    const error = new TripNotFoundError('id');

    expect(error.message).toEqual('Trip id not found');
    expect(error.status).toEqual(404);
  });
});
