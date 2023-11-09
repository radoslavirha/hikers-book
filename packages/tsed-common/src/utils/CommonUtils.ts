export class CommonUtils {
  public static buildModel<T extends object>(type: { new (): T }, data: Partial<T>): T {
    const instance = new type();
    return Object.assign(instance, data) as T;
  }
}
