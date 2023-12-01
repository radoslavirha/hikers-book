import { Description, Email, Example, Required, Schema, Title } from '@tsed/schema';

@Schema({ additionalProperties: false })
export class EmailSignInRequest {
  @Title('email')
  @Description('Email used for registration.')
  @Example('user@email.com')
  @Email()
  @Required()
  email!: string;

  @Title('password')
  @Description(`User's password.`)
  @Example('8^^3286UhpB$9m')
  @Required()
  password!: string;
}
