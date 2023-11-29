import { JWTPayload } from '@hikers-book/tsed-common/types';
import { Inject, Service } from '@tsed/di';
import JWT from 'jsonwebtoken';
import { CryptographyUtils } from '../utils';
import { ConfigService } from './ConfigService';
import { KeysService } from './KeysService';

@Service()
export class JWTService {
  @Inject()
  private configService!: ConfigService;

  @Inject()
  private keysService!: KeysService;

  public async getPrivateKey(): Promise<string | Buffer> {
    return this.keysService.getPrivateKey();
  }

  public async getPublicKey(): Promise<string | Buffer> {
    return this.keysService.getPublicKey();
  }

  public async createJWT(payload: JWTPayload, refresh: boolean = false): Promise<string> {
    const opt: JWT.SignOptions = {
      algorithm: this.configService.config.jwt.algorithm,
      expiresIn: refresh ? this.configService.config.jwt.expiresInRefresh : this.configService.config.jwt.expiresIn,
      jwtid: CryptographyUtils.generateJWTjti()
    };

    const privateKey = await this.getPrivateKey();

    // eslint-disable-next-line import/no-named-as-default-member
    return JWT.sign(payload, privateKey, opt);
  }

  public async decodeJWT(jwt: string, ignoreExpiration: boolean = false): Promise<JWTPayload> {
    const publicKey = await this.getPublicKey();

    // eslint-disable-next-line import/no-named-as-default-member
    return JWT.verify(jwt, publicKey, {
      algorithms: [this.configService.config.jwt.algorithm],
      ignoreExpiration: ignoreExpiration
    }) as JWTPayload;
  }
}
