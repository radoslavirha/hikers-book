/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIAuthenticationAuthBaseService } from '../api-authentication-auth-base-service';
import { APIAuthenticationAuthConfiguration } from '../api-authentication-auth-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticateControllerAuthenticate } from '../fn/authenticate-controller/authenticate-controller-authenticate';
import { AuthenticateControllerAuthenticate$Params } from '../fn/authenticate-controller/authenticate-controller-authenticate';
import { authenticateControllerLogout } from '../fn/authenticate-controller/authenticate-controller-logout';
import { AuthenticateControllerLogout$Params } from '../fn/authenticate-controller/authenticate-controller-logout';
import { authenticateControllerRefresh } from '../fn/authenticate-controller/authenticate-controller-refresh';
import { AuthenticateControllerRefresh$Params } from '../fn/authenticate-controller/authenticate-controller-refresh';
import { APIAuthenticationAuthJwtAuthenticationResponse } from '../models/api-authentication-auth-jwt-authentication-response';
import { APIAuthenticationAuthTokensResponse } from '../models/api-authentication-auth-tokens-response';


/**
 * Authentication/Authorization controllers.
 */
@Injectable({ providedIn: 'root' })
export class APIAuthenticationAuthAuthenticateControllerService extends APIAuthenticationAuthBaseService {
  constructor(config: APIAuthenticationAuthConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authenticateControllerAuthenticate()` */
  static readonly AuthenticateControllerAuthenticatePath = '/auth/authenticate';

  /**
   * Returns User model based on JWT token.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticateControllerAuthenticate()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticateControllerAuthenticate$Response(params?: AuthenticateControllerAuthenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<APIAuthenticationAuthJwtAuthenticationResponse>> {
    return authenticateControllerAuthenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * Returns User model based on JWT token.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticateControllerAuthenticate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticateControllerAuthenticate(params?: AuthenticateControllerAuthenticate$Params, context?: HttpContext): Observable<APIAuthenticationAuthJwtAuthenticationResponse> {
    return this.authenticateControllerAuthenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<APIAuthenticationAuthJwtAuthenticationResponse>): APIAuthenticationAuthJwtAuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `authenticateControllerRefresh()` */
  static readonly AuthenticateControllerRefreshPath = '/auth/refresh';

  /**
   * Refresh token controller.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticateControllerRefresh()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticateControllerRefresh$Response(params?: AuthenticateControllerRefresh$Params, context?: HttpContext): Observable<StrictHttpResponse<APIAuthenticationAuthTokensResponse>> {
    return authenticateControllerRefresh(this.http, this.rootUrl, params, context);
  }

  /**
   * Refresh token controller.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticateControllerRefresh$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticateControllerRefresh(params?: AuthenticateControllerRefresh$Params, context?: HttpContext): Observable<APIAuthenticationAuthTokensResponse> {
    return this.authenticateControllerRefresh$Response(params, context).pipe(
      map((r: StrictHttpResponse<APIAuthenticationAuthTokensResponse>): APIAuthenticationAuthTokensResponse => r.body)
    );
  }

  /** Path part for operation `authenticateControllerLogout()` */
  static readonly AuthenticateControllerLogoutPath = '/auth/logout';

  /**
   * Logout controller.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticateControllerLogout()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticateControllerLogout$Response(params?: AuthenticateControllerLogout$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return authenticateControllerLogout(this.http, this.rootUrl, params, context);
  }

  /**
   * Logout controller.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticateControllerLogout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticateControllerLogout(params?: AuthenticateControllerLogout$Params, context?: HttpContext): Observable<{
}> {
    return this.authenticateControllerLogout$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
