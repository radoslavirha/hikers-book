import { Description, Required, Schema, Title } from '@tsed/schema';

@Schema({ additionalProperties: false })
export class JWTResponse {
  @Title('jwt')
  @Description('JWT token.')
  @Required()
  jwt!: string;

  @Title('refresh')
  @Description('JWT refresh token.')
  @Required()
  refresh!: string;
}
