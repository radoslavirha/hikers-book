import { Description, Email, Example, MinLength, Property, RequiredGroups, Schema, Title } from '@tsed/schema';
import { GROUP_CREATE } from './_GroupsLabels';

@Schema({ additionalProperties: false })
export class User {
  @Title('email')
  @Description('Email used for registration.')
  @Example('user@email.com')
  @RequiredGroups(GROUP_CREATE)
  @Email()
  @Property()
  email!: string;

  @Title('password')
  @Description("User's password.")
  @Example('8^^3286UhpB$9m')
  @RequiredGroups(GROUP_CREATE)
  @MinLength(10)
  password!: string;
}
