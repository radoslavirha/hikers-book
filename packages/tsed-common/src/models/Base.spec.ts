import { Base } from './Base';

describe('Base', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should have id, createdAt, updatedAt', async () => {
    const base = new Base();

    expect(base).toHaveProperty('id');
    expect(base).toHaveProperty('createdAt');
    expect(base).toHaveProperty('updatedAt');
  });
});
