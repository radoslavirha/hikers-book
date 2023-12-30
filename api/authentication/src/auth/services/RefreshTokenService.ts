import { JWTPayloadDecoded } from '@hikers-book/tsed-common/types';
import { CommonUtils } from '@hikers-book/tsed-common/utils';
import { Req } from '@tsed/common';
import { Service } from '@tsed/di';
import { Unauthorized } from '@tsed/exceptions';
import { $log } from '@tsed/logger';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import ms from 'ms';
import { ConfigService } from '../../global/services/ConfigService';
import { CookieName, Credentials, RefreshToken, TokensPair } from '../models';
import { JWTService } from './JWTService';
import { CredentialsMongoService } from './mongo/CredentialsMongoService';
import { RefreshTokenMongoService } from './mongo/RefreshTokenMongoService';

@Service()
export class RefreshTokenService {
  // eslint-disable-next-line max-params
  constructor(
    private configService: ConfigService,
    private credentialsService: CredentialsMongoService,
    private jwtService: JWTService,
    private refreshTokenMongoService: RefreshTokenMongoService
  ) {}

  public async verifyRefreshAndRemove(refreshToken?: string): Promise<RefreshToken> {
    this.checkIfRTExist(refreshToken);

    const jwtPayload = await this.decode(refreshToken!);

    const token = await this.findRefreshToken(jwtPayload.jti!, jwtPayload!.id);

    await this.deleteRefreshToken(token!);

    return token;
  }

  public async createRefreshTokenAndSave(token: RefreshToken): Promise<TokensPair> {
    const credentials = await this.credentialsService.findByUserId(token.user_id);

    this.checkIfCredentialsExist(credentials);

    const tokens = await this.jwtService.createTokenPair(credentials!);

    const decoded = await this.decode(tokens.refresh);

    await this.createRefreshToken(
      CommonUtils.buildModel(RefreshToken, { token_jti: decoded.jti, user_id: credentials!.user!.id })
    );

    return tokens;
  }

  public async createRefreshToken(rt: RefreshToken): Promise<RefreshToken> {
    return this.refreshTokenMongoService.create(rt);
  }

  public async handleError(request: Req, refreshToken?: string): Promise<void> {
    this.unsetRefreshCookie(request);

    if (refreshToken) {
      try {
        const decoded = await this.decode(refreshToken);
        await this.refreshTokenMongoService.deleteByJTI(decoded.jti!);
      } catch (error) {
        $log.warn(error);
      }
    }
  }

  public setRefreshCookie(request: Req, refresh: string): void {
    request.res?.cookie(CookieName.Refresh, refresh, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: new URL(this.configService.config.frontend.url).hostname,
      maxAge: ms(this.configService.config.jwt.expiresInRefresh)
    });
  }

  public unsetRefreshCookie(request: Req): void {
    request.res?.clearCookie(CookieName.Refresh);
  }

  private checkIfRTExist(refreshToken?: string): void {
    if (!refreshToken) {
      throw new Unauthorized('Refresh token is missing.');
    }
    return;
  }

  private checkIfCredentialsExist(credentials: Credentials | null): void {
    if (!credentials) {
      throw new Unauthorized('Invalid credentials.');
    }
    return;
  }

  private async decode(refreshToken: string): Promise<JWTPayloadDecoded> {
    try {
      const decoded = await this.jwtService.decodeRT(refreshToken);
      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new Unauthorized('Refresh token expired.');
      } else if (error instanceof JsonWebTokenError) {
        $log.error(error);
        throw new Unauthorized('Refresh token is invalid.');
      }
      throw error;
    }
  }

  private async findRefreshToken(token_jti: string, userId: string): Promise<RefreshToken> {
    const rt = await this.refreshTokenMongoService.find(token_jti, userId);

    if (!rt) {
      throw new Unauthorized('Refresh token does not exist.');
    }

    return rt;
  }

  private async deleteRefreshToken(token: RefreshToken): Promise<void> {
    await this.refreshTokenMongoService.deleteByJTI(token.token_jti);
  }
}
