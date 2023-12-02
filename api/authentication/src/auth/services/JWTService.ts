import { JWTPayload } from '@hikers-book/tsed-common/types';
import { Inject, Service } from '@tsed/di';
import JWT from 'jsonwebtoken';
import { ConfigService } from '../../global/services/ConfigService';
import { CryptographyUtils } from '../utils';
import { KeysService } from './KeysService';

@Service()
export class JWTService {
  @Inject()
  private configService!: ConfigService;

  @Inject()
  private keysService!: KeysService;

  public get algorithm() {
    return this.keysService.algorithm;
  }

  public async getATPrivateKey(): Promise<string | Buffer> {
    return this.keysService.getATPrivateKey();
  }

  public async getATPublicKey(): Promise<string | Buffer> {
    return this.keysService.getATPublicKey();
  }

  public async getRTPrivateKey(): Promise<string | Buffer> {
    return this.keysService.getRTPrivateKey();
  }

  public async getRTPublicKey(): Promise<string | Buffer> {
    return this.keysService.getRTPublicKey();
  }

  public async createAT(payload: JWTPayload): Promise<string> {
    const opt: JWT.SignOptions = {
      algorithm: this.algorithm,
      expiresIn: this.configService.config.jwt.expiresIn,
      jwtid: CryptographyUtils.generateJWTjti()
    };

    // eslint-disable-next-line import/no-named-as-default-member
    return JWT.sign(payload, await this.getATPrivateKey(), opt);
  }

  public async createRT(payload: JWTPayload): Promise<string> {
    const opt: JWT.SignOptions = {
      algorithm: this.algorithm,
      expiresIn: this.configService.config.jwt.expiresInRefresh,
      jwtid: CryptographyUtils.generateJWTjti()
    };

    // eslint-disable-next-line import/no-named-as-default-member
    return JWT.sign(payload, await this.getRTPrivateKey(), opt);
  }

  public async decodeAT(access: string, ignoreExpiration: boolean = false): Promise<JWTPayload> {
    const publicKey = await this.getATPublicKey();

    // eslint-disable-next-line import/no-named-as-default-member
    return JWT.verify(access, publicKey, {
      algorithms: [this.algorithm],
      ignoreExpiration: ignoreExpiration
    }) as JWTPayload;
  }

  public async decodeRT(refresh: string, ignoreExpiration: boolean = false): Promise<JWTPayload> {
    const publicKey = await this.getRTPublicKey();

    // eslint-disable-next-line import/no-named-as-default-member
    return JWT.verify(refresh, publicKey, {
      algorithms: [this.algorithm],
      ignoreExpiration: ignoreExpiration
    }) as JWTPayload;
  }
}
