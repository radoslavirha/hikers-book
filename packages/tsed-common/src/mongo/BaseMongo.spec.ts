import { BaseMongo } from './BaseMongo';

describe('BaseMongo', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should have _id, createdAt, updatedAt', async () => {
    const base = new BaseMongo();

    expect(base).toHaveProperty('_id');
    expect(base).toHaveProperty('createdAt');
    expect(base).toHaveProperty('updatedAt');
  });
});
