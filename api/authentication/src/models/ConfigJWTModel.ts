import { Enum, Required } from '@tsed/schema';
import { Algorithm } from 'jsonwebtoken';

export class ConfigJWTModel {
  @Required()
  @Enum(
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'ES256',
    'ES384',
    'ES512',
    'PS256',
    'PS384',
    'PS512',
    'none'
  )
  algorithm!: Algorithm;

  @Required()
  expiresIn!: string;

  @Required()
  expiresInRefresh!: string;
}
