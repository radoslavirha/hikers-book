import { JWTPayload } from '@hikers-book/tsed-common/types';
import { Req } from '@tsed/common';
import { Arg, BeforeInstall, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JWTService } from '../services/JWTService';

@Protocol<StrategyOptions>({
  // Do not mess with shared jwt strategy coming from @hikers-book/tsed-common
  name: 'jwt-authentication-api',
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '',
    algorithms: []
  }
})
export class JWTProtocol implements OnVerify, OnInstall, BeforeInstall {
  constructor(private jwtService: JWTService) {}

  async $beforeInstall(settings: StrategyOptions): Promise<StrategyOptions> {
    const publicKey = await this.jwtService.getATPublicKey();
    settings.secretOrKey = publicKey;
    settings.algorithms = [this.jwtService.algorithm];
    return settings;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $onInstall(strategy: Strategy): void {}

  async $onVerify(@Req() _request: Req, @Arg(0) jwtPayload: JWTPayload) {
    return jwtPayload;
  }
}
