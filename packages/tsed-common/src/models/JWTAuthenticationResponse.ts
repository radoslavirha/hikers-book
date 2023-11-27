import { Description, Required, Schema, Title } from '@tsed/schema';
import { JWTPayload } from '../types';

@Schema({ additionalProperties: false })
export class JWTAuthenticationResponse implements JWTPayload {
  @Title('id')
  @Description('User ID.')
  @Required()
  id!: string;

  @Title('name')
  @Description('User name.')
  @Required()
  name!: string;
}
