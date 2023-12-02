import { FSUtils } from '@hikers-book/tsed-common/utils';
import { Service } from '@tsed/di';
import { Algorithm } from 'jsonwebtoken';
import path from 'path';

@Service()
export class KeysService {
  #algorithm: Algorithm = 'RS256';
  #path: string = path.resolve(__dirname, '../../../keys');

  public get algorithm() {
    return this.#algorithm;
  }

  public async getATPrivateKey(): Promise<string | Buffer> {
    return this.getKey('access.pem');
  }

  public async getATPublicKey(): Promise<string | Buffer> {
    return this.getKey('access.pem.pub');
  }

  public async getRTPrivateKey(): Promise<string | Buffer> {
    return this.getKey('refresh.pem');
  }

  public async getRTPublicKey(): Promise<string | Buffer> {
    return this.getKey('refresh.pem.pub');
  }

  private async getKey(key: string): Promise<string | Buffer> {
    return FSUtils.readFile(path.join(this.#path, key));
  }
}
