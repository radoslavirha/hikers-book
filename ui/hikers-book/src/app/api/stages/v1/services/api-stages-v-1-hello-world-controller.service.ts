/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIStagesV1BaseService } from '../api-stages-v-1-base-service';
import { APIStagesV1Configuration } from '../api-stages-v-1-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { helloWorldControllerGet } from '../fn/hello-world-controller/hello-world-controller-get';
import { HelloWorldControllerGet$Params } from '../fn/hello-world-controller/hello-world-controller-get';

@Injectable({ providedIn: 'root' })
export class APIStagesV1HelloWorldControllerService extends APIStagesV1BaseService {
  constructor(config: APIStagesV1Configuration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `helloWorldControllerGet()` */
  static readonly HelloWorldControllerGetPath = '/v1/hello-world';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `helloWorldControllerGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  helloWorldControllerGet$Response(params?: HelloWorldControllerGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return helloWorldControllerGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `helloWorldControllerGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  helloWorldControllerGet(params?: HelloWorldControllerGet$Params, context?: HttpContext): Observable<void> {
    return this.helloWorldControllerGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
