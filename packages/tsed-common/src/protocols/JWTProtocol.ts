import { Arg, OnVerify, Protocol } from '@tsed/passport';
import { IStrategyOptions, Strategy } from 'passport-http-bearer';
import { AuthenticateService } from '../services/AuthenticateService';

@Protocol<IStrategyOptions>({
  name: 'jwt',
  useStrategy: Strategy,
  settings: {}
})
export class JWTProtocol implements OnVerify {
  constructor(private authenticateService: AuthenticateService) {}

  async $onVerify(@Arg(0) token: string) {
    try {
      const response = await this.authenticateService.authenticate(token);
      return response;
    } catch (error) {
      return null;
    }
  }
}
