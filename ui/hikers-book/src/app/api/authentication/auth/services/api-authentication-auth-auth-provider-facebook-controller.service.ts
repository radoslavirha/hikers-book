/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIAuthenticationAuthBaseService } from '../api-authentication-auth-base-service';
import { APIAuthenticationAuthConfiguration } from '../api-authentication-auth-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authProviderFacebookControllerAuthenticated } from '../fn/auth-provider-facebook-controller/auth-provider-facebook-controller-authenticated';
import { AuthProviderFacebookControllerAuthenticated$Params } from '../fn/auth-provider-facebook-controller/auth-provider-facebook-controller-authenticated';
import { authProviderFacebookControllerCallback } from '../fn/auth-provider-facebook-controller/auth-provider-facebook-controller-callback';
import { AuthProviderFacebookControllerCallback$Params } from '../fn/auth-provider-facebook-controller/auth-provider-facebook-controller-callback';


/**
 * Facebook provider controllers.
 */
@Injectable({ providedIn: 'root' })
export class APIAuthenticationAuthAuthProviderFacebookControllerService extends APIAuthenticationAuthBaseService {
  constructor(config: APIAuthenticationAuthConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authProviderFacebookControllerAuthenticated()` */
  static readonly AuthProviderFacebookControllerAuthenticatedPath = '/auth/provider/facebook';

  /**
   * Login with Facebook.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderFacebookControllerAuthenticated()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderFacebookControllerAuthenticated$Response(params?: AuthProviderFacebookControllerAuthenticated$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authProviderFacebookControllerAuthenticated(this.http, this.rootUrl, params, context);
  }

  /**
   * Login with Facebook.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderFacebookControllerAuthenticated$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderFacebookControllerAuthenticated(params?: AuthProviderFacebookControllerAuthenticated$Params, context?: HttpContext): Observable<void> {
    return this.authProviderFacebookControllerAuthenticated$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `authProviderFacebookControllerCallback()` */
  static readonly AuthProviderFacebookControllerCallbackPath = '/auth/provider/facebook/callback';

  /**
   * Login with Facebook.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderFacebookControllerCallback()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderFacebookControllerCallback$Response(params?: AuthProviderFacebookControllerCallback$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authProviderFacebookControllerCallback(this.http, this.rootUrl, params, context);
  }

  /**
   * Login with Facebook.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderFacebookControllerCallback$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderFacebookControllerCallback(params?: AuthProviderFacebookControllerCallback$Params, context?: HttpContext): Observable<void> {
    return this.authProviderFacebookControllerCallback$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
