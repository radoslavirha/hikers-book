import { TestUtils } from './TestUtils';

describe('TestUtils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('stringifyStubTimestamps', async () => {
    const modelWithDate = {
      createdAt: new Date('2023-12-09T21:08:36.576Z'),
      updatedAt: new Date('2023-12-09T21:08:36.576Z')
    };

    const model = TestUtils.stringifyStubTimestamps(modelWithDate);

    expect(model).toStrictEqual({
      ...modelWithDate,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });
});
