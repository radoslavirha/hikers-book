import JWT from 'jsonwebtoken';
import { TestModel } from '../test/TestModel';
import { ACCESS_TOKEN, JWT_PAYLOAD } from '../test/stubs';
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

  it('decodeJWT', async () => {
    const spy = jest.spyOn(JWT, 'decode').mockReturnValue(JWT_PAYLOAD);

    const payload = CommonUtils.decodeJWT(ACCESS_TOKEN);

    expect(spy).toHaveBeenCalledWith(ACCESS_TOKEN);
    expect(payload).toEqual(JWT_PAYLOAD);
  });
});
