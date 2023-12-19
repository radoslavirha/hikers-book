import { AdditionalProperties, Property } from '@tsed/schema';
import { SwaggerUIOptions } from '@tsed/swagger';

@AdditionalProperties(true)
export class SwaggerUIOptionsConfigModel implements SwaggerUIOptions {
  [key: string]: unknown;
}

@AdditionalProperties(false)
export class SwaggerConfigModel {
  @Property()
  enabled: boolean = true;

  @Property(SwaggerUIOptionsConfigModel)
  swaggerUIOptions: SwaggerUIOptionsConfigModel = {};
}
