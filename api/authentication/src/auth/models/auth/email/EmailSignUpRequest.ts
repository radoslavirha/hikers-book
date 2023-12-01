import { PasswordValidator } from '@hikers-book/tsed-common/validators';
import { AfterDeserialize } from '@tsed/json-mapper';
import { Description, Email, Example, Required, Schema, Title } from '@tsed/schema';

@Schema({ additionalProperties: false })
@AfterDeserialize(PasswordValidator)
export class EmailSignUpRequest {
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

  @Title('password_confirm')
  @Description(`Confirm password.`)
  @Example('8^^3286UhpB$9m')
  @Required()
  password_confirm!: string;

  @Title('token')
  @Description('Verification token sent to email.')
  @Example('verification-token')
  @Required()
  token!: string;

  @Title('full_name')
  @Description(`User's full name.`)
  @Example('John Doe')
  @Required()
  full_name!: string;
}
