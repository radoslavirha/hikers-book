import { TestUtils } from './TestUtils';

describe('TestUtils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('stringifyStubTimestamps', async () => {
    const modelWithDate = {
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const model = TestUtils.stringifyStubTimestamps(modelWithDate);

    expect(model).toStrictEqual({
      ...modelWithDate,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });
});
