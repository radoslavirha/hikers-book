import { FSUtils } from '@hikers-book/tsed-common/utils';
import { Service } from '@tsed/di';
import path from 'path';

@Service()
export class KeysService {
  public async getPrivateKey(): Promise<string | Buffer> {
    return this.getKey('jwt.pem');
  }

  public async getPublicKey(): Promise<string | Buffer> {
    return this.getKey('jwt.pem.pub');
  }

  private async getKey(key: string): Promise<string | Buffer> {
    return FSUtils.readFile(path.resolve(__dirname, '../../../keys', key));
  }
}
