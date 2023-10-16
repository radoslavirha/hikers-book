import { Description, Email, Example, MinLength, Property, Required, Title } from '@tsed/schema';

export class UserSignUp {
  @Title('email')
  @Description('Email used for registration.')
  @Example('user@email.com')
  @Email()
  @Property()
  @Required()
  email!: string;

  @Title('password')
  @Description("User's password.")
  @Example('8^^3286UhpB$9m')
  @MinLength(10)
  @Required()
  password!: string;
}
