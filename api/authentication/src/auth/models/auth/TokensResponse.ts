import { Description, Required, Schema, Title } from '@tsed/schema';

@Schema({ additionalProperties: false })
export class TokensResponse {
  @Title('access')
  @Description('JWT access token.')
  @Required()
  access!: string;
}
