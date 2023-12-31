import { Description, Required, Schema, Title } from '@tsed/schema';

@Schema({ additionalProperties: false })
export class TokensPair {
  @Title('access')
  @Description('JWT access token.')
  @Required()
  access!: string;

  @Title('refresh')
  @Description('JWT refresh token.')
  @Required()
  refresh!: string;
}
