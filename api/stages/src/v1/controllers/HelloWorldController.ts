import { SwaggerDocsVersion } from '@hikers-book/tsed-common/types';
import { Controller } from '@tsed/di';
import { Get } from '@tsed/schema';
import { Docs } from '@tsed/swagger';

@Controller('/hello-world')
@Docs(SwaggerDocsVersion.V1)
export class HelloWorldController {
  @Get('/')
  get() {
    return 'hello';
  }
}
