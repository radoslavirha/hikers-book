import { AdditionalProperties, Required } from '@tsed/schema';

@AdditionalProperties(false)
export class FrontendConfigModel {
  @Required()
  url!: string;
}
