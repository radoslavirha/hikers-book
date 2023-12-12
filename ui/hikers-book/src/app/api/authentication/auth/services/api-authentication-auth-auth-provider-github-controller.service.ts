/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIAuthenticationAuthBaseService } from '../api-authentication-auth-base-service';
import { APIAuthenticationAuthConfiguration } from '../api-authentication-auth-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authProviderGithubControllerAuthenticated } from '../fn/auth-provider-github-controller/auth-provider-github-controller-authenticated';
import { AuthProviderGithubControllerAuthenticated$Params } from '../fn/auth-provider-github-controller/auth-provider-github-controller-authenticated';
import { authProviderGithubControllerCallback } from '../fn/auth-provider-github-controller/auth-provider-github-controller-callback';
import { AuthProviderGithubControllerCallback$Params } from '../fn/auth-provider-github-controller/auth-provider-github-controller-callback';


/**
 * Github provider controllers.
 */
@Injectable({ providedIn: 'root' })
export class APIAuthenticationAuthAuthProviderGithubControllerService extends APIAuthenticationAuthBaseService {
  constructor(config: APIAuthenticationAuthConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authProviderGithubControllerAuthenticated()` */
  static readonly AuthProviderGithubControllerAuthenticatedPath = '/auth/provider/github';

  /**
   * Login with Github.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderGithubControllerAuthenticated()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderGithubControllerAuthenticated$Response(params?: AuthProviderGithubControllerAuthenticated$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authProviderGithubControllerAuthenticated(this.http, this.rootUrl, params, context);
  }

  /**
   * Login with Github.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderGithubControllerAuthenticated$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderGithubControllerAuthenticated(params?: AuthProviderGithubControllerAuthenticated$Params, context?: HttpContext): Observable<void> {
    return this.authProviderGithubControllerAuthenticated$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `authProviderGithubControllerCallback()` */
  static readonly AuthProviderGithubControllerCallbackPath = '/auth/provider/github/callback';

  /**
   * Login with Github.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderGithubControllerCallback()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderGithubControllerCallback$Response(params?: AuthProviderGithubControllerCallback$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authProviderGithubControllerCallback(this.http, this.rootUrl, params, context);
  }

  /**
   * Login with Github.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderGithubControllerCallback$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderGithubControllerCallback(params?: AuthProviderGithubControllerCallback$Params, context?: HttpContext): Observable<void> {
    return this.authProviderGithubControllerCallback$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
