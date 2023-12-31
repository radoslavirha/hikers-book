import { CommonUtils } from '../utils/CommonUtils';

export class BaseConfig<T> {
  #config: T;

  public get config(): T {
    return CommonUtils.cloneDeep(this.#config);
  }

  // public set config(config: T) {
  //   this.#config = config;
  // }

  constructor(config: T) {
    this.#config = config;
  }
}
