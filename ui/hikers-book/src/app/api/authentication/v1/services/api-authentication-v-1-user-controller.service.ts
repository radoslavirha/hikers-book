/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIAuthenticationV1BaseService } from '../api-authentication-v-1-base-service';
import { APIAuthenticationV1Configuration } from '../api-authentication-v-1-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { userControllerGetUser } from '../fn/user-controller/user-controller-get-user';
import { UserControllerGetUser$Params } from '../fn/user-controller/user-controller-get-user';


/**
 * User controllers.
 */
@Injectable({ providedIn: 'root' })
export class APIAuthenticationV1UserControllerService extends APIAuthenticationV1BaseService {
  constructor(config: APIAuthenticationV1Configuration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userControllerGetUser()` */
  static readonly UserControllerGetUserPath = '/v1/user';

  /**
   * Returns User model.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerGetUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerGetUser$Response(params: UserControllerGetUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return userControllerGetUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Returns User model.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerGetUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerGetUser(params: UserControllerGetUser$Params, context?: HttpContext): Observable<{
}> {
    return this.userControllerGetUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
