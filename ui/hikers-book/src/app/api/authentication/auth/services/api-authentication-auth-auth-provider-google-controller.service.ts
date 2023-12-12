/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIAuthenticationAuthBaseService } from '../api-authentication-auth-base-service';
import { APIAuthenticationAuthConfiguration } from '../api-authentication-auth-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authProviderGoogleControllerAuthenticated } from '../fn/auth-provider-google-controller/auth-provider-google-controller-authenticated';
import { AuthProviderGoogleControllerAuthenticated$Params } from '../fn/auth-provider-google-controller/auth-provider-google-controller-authenticated';
import { authProviderGoogleControllerCallback } from '../fn/auth-provider-google-controller/auth-provider-google-controller-callback';
import { AuthProviderGoogleControllerCallback$Params } from '../fn/auth-provider-google-controller/auth-provider-google-controller-callback';


/**
 * Google provider controllers.
 */
@Injectable({ providedIn: 'root' })
export class APIAuthenticationAuthAuthProviderGoogleControllerService extends APIAuthenticationAuthBaseService {
  constructor(config: APIAuthenticationAuthConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authProviderGoogleControllerAuthenticated()` */
  static readonly AuthProviderGoogleControllerAuthenticatedPath = '/auth/provider/google';

  /**
   * Login with Google.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderGoogleControllerAuthenticated()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderGoogleControllerAuthenticated$Response(params?: AuthProviderGoogleControllerAuthenticated$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authProviderGoogleControllerAuthenticated(this.http, this.rootUrl, params, context);
  }

  /**
   * Login with Google.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderGoogleControllerAuthenticated$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderGoogleControllerAuthenticated(params?: AuthProviderGoogleControllerAuthenticated$Params, context?: HttpContext): Observable<void> {
    return this.authProviderGoogleControllerAuthenticated$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `authProviderGoogleControllerCallback()` */
  static readonly AuthProviderGoogleControllerCallbackPath = '/auth/provider/google/callback';

  /**
   * Login with Google.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderGoogleControllerCallback()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderGoogleControllerCallback$Response(params?: AuthProviderGoogleControllerCallback$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authProviderGoogleControllerCallback(this.http, this.rootUrl, params, context);
  }

  /**
   * Login with Google.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderGoogleControllerCallback$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderGoogleControllerCallback(params?: AuthProviderGoogleControllerCallback$Params, context?: HttpContext): Observable<void> {
    return this.authProviderGoogleControllerCallback$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
