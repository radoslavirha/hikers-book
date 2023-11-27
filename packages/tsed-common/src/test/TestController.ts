import { Controller } from '@tsed/di';
import { Get } from '@tsed/schema';
import { JWTAuth } from '../decorators/JWTAuth';

@Controller('/tests')
export class TestController {
  @Get('/')
  @JWTAuth()
  public getRequest(): Promise<string> {
    return Promise.resolve('hello');
  }
}
