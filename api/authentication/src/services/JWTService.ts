import { FSUtils } from '@hikers-book/tsed-common/utils';
import { Inject, Service } from '@tsed/di';
import JWT from 'jsonwebtoken';
import path from 'path';
import { CryptographyUtils } from '../utils';
import { ConfigService } from './ConfigService';

export type JWTPayload = {
  id: string;
  email: string;
};

@Service()
export class JWTService {
  @Inject()
  private configService!: ConfigService;

  public async createJWT(payload: JWTPayload, refresh: boolean = false): Promise<string> {
    const opt: JWT.SignOptions = {
      algorithm: this.configService.config.file.jwt.algorithm,
      expiresIn: refresh
        ? this.configService.config.file.jwt.expiresInRefresh
        : this.configService.config.file.jwt.expiresIn,
      jwtid: CryptographyUtils.generateJWTjti()
    };

    const privateKey = await FSUtils.readFile(path.resolve(__dirname, '../../keys/jwt.pem'));

    // eslint-disable-next-line import/no-named-as-default-member
    return JWT.sign(payload, privateKey, opt);
  }

  public async decodeJWT(jwt: string, ignoreExpiration: boolean = false): Promise<JWTPayload> {
    const publicKey = await FSUtils.readFile(path.resolve(__dirname, '../../keys/jwt.pem.pub'));

    // eslint-disable-next-line import/no-named-as-default-member
    return JWT.verify(jwt, publicKey, {
      algorithms: [this.configService.config.file.jwt.algorithm],
      ignoreExpiration: ignoreExpiration
    }) as JWTPayload;
  }
}
