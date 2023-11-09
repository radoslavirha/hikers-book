import { TestModel } from '../test/TestModel';
import { CommonUtils } from './CommonUtils';

describe('CommonUtils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('buildModel', async () => {
    const model = CommonUtils.buildModel(TestModel, { label: 'label' });

    expect(model).toBeInstanceOf(TestModel);
    expect(model.label).toEqual('label');
  });
});
