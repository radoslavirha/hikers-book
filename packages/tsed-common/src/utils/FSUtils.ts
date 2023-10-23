import { promises } from 'fs';

export class FSUtils {
  public static async readFile(file: string): Promise<string | Buffer> {
    return promises.readFile(file);
  }
}
