import { Description, Email, Example, Property, Schema, Title } from '@tsed/schema';

@Schema({ additionalProperties: false })
export class EmailVerifyTokenRequest {
  @Title('email')
  @Description('Email used for registration.')
  @Example('user@email.com')
  @Email()
  @Property()
  email!: string;

  @Title('token')
  @Description('Verification token sent to email.')
  @Example('verification-token')
  @Property()
  token!: string;
}
