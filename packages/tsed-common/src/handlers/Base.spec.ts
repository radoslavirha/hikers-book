import { $log } from '@tsed/common';
import { BaseHandler } from './Base';

interface IRequest {}
interface IResponse {}

class Handler extends BaseHandler<IRequest, IResponse> {
  protected async performOperation(request: IRequest): Promise<IResponse> {
    return request;
  }
}

describe('BaseHandler', () => {
  let handler: Handler;

  beforeEach(() => {
    handler = new Handler();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should call performOperation', async () => {
    // @ts-expect-error protected
    const spy = jest.spyOn(handler, 'performOperation');

    await handler.execute({ test: 'test' });

    expect(spy).toHaveBeenCalledWith({ test: 'test' });
  });

  it('Should return value', async () => {
    // @ts-expect-error protected
    jest.spyOn(handler, 'performOperation').mockResolvedValue({ key: 'value' });
    const spy = jest.spyOn($log, 'info');

    expect.assertions(3);

    const response = await handler.execute({ test: 'test' });

    expect(response).toEqual({ key: 'value' });
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Handler.execute() took '));
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(' ms to execute!'));
  });

  it('Should return error', async () => {
    // @ts-expect-error protected
    jest.spyOn(handler, 'performOperation').mockRejectedValue(new Error('test'));
    const spy = jest.spyOn($log, 'error');

    expect.assertions(2);
    try {
      await handler.execute({ test: 'test' });
    } catch (error) {
      expect(error).toEqual(new Error('test'));
      expect(spy).toHaveBeenCalledWith(`Handler.execute() threw the following error! ${ new Error('test') }`);
    }
  });
});
