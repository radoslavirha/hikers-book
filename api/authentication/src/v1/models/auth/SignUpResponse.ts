import { Description, Property, Required, Title } from '@tsed/schema';

export class SignUpLocalResponse {
  @Title('jwt')
  @Description('JWT token used for authentication.')
  @Property()
  @Required()
  jwt!: string;
}
