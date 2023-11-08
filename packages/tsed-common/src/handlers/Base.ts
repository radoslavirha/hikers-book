import { $log } from '@tsed/common';

export abstract class BaseHandler<IRequest, IResponse> {
  public async execute(request: IRequest): Promise<IResponse> {
    try {
      const startTime = performance.now();

      const response = await this.performOperation(request);

      const endTime = performance.now();

      const useCaseExecutionTime = endTime - startTime;

      $log.info(`${this.constructor.name}.execute() took +${useCaseExecutionTime} ms to execute!`);

      return response;
    } catch (error) {
      $log.error(`${this.constructor.name}.execute() threw the following error! ${error}`);
      throw error;
    }
  }

  protected abstract performOperation(request: IRequest): Promise<IResponse>;
}
