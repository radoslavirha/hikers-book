import { Description, Email, Example, Property, Schema, Title } from '@tsed/schema';

@Schema({ additionalProperties: false })
export class EmailSendVerificationRequest {
  @Title('email')
  @Description('Email used for registration.')
  @Example('user@email.com')
  @Email()
  @Property()
  email!: string;
}
