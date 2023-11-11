import { Description, Email, Example, Required, Schema, Title } from '@tsed/schema';

@Schema({ additionalProperties: false })
export class EmailVerifyTokenRequest {
  @Title('email')
  @Description('Email used for registration.')
  @Example('user@email.com')
  @Email()
  @Required()
  email!: string;

  @Title('token')
  @Description('Verification token sent to email.')
  @Example('verification-token')
  @Required()
  token!: string;
}
