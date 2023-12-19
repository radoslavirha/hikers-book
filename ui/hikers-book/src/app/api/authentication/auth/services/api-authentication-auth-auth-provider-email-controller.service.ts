/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APIAuthenticationAuthBaseService } from '../api-authentication-auth-base-service';
import { APIAuthenticationAuthConfiguration } from '../api-authentication-auth-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authProviderEmailControllerSendVerification } from '../fn/auth-provider-email-controller/auth-provider-email-controller-send-verification';
import { AuthProviderEmailControllerSendVerification$Params } from '../fn/auth-provider-email-controller/auth-provider-email-controller-send-verification';
import { authProviderEmailControllerSignIn } from '../fn/auth-provider-email-controller/auth-provider-email-controller-sign-in';
import { AuthProviderEmailControllerSignIn$Params } from '../fn/auth-provider-email-controller/auth-provider-email-controller-sign-in';
import { authProviderEmailControllerSignUp } from '../fn/auth-provider-email-controller/auth-provider-email-controller-sign-up';
import { AuthProviderEmailControllerSignUp$Params } from '../fn/auth-provider-email-controller/auth-provider-email-controller-sign-up';
import { authProviderEmailControllerVerifyToken } from '../fn/auth-provider-email-controller/auth-provider-email-controller-verify-token';
import { AuthProviderEmailControllerVerifyToken$Params } from '../fn/auth-provider-email-controller/auth-provider-email-controller-verify-token';
import { APIAuthenticationAuthTokensResponse } from '../models/api-authentication-auth-tokens-response';


/**
 * Email provider controllers.
 */
@Injectable({ providedIn: 'root' })
export class APIAuthenticationAuthAuthProviderEmailControllerService extends APIAuthenticationAuthBaseService {
  constructor(config: APIAuthenticationAuthConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authProviderEmailControllerSendVerification()` */
  static readonly AuthProviderEmailControllerSendVerificationPath = '/auth/provider/email/send-verification';

  /**
   * Sends verification email to the user. Then user can sign up.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderEmailControllerSendVerification()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authProviderEmailControllerSendVerification$Response(params: AuthProviderEmailControllerSendVerification$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return authProviderEmailControllerSendVerification(this.http, this.rootUrl, params, context);
  }

  /**
   * Sends verification email to the user. Then user can sign up.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderEmailControllerSendVerification$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authProviderEmailControllerSendVerification(params: AuthProviderEmailControllerSendVerification$Params, context?: HttpContext): Observable<{
}> {
    return this.authProviderEmailControllerSendVerification$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `authProviderEmailControllerVerifyToken()` */
  static readonly AuthProviderEmailControllerVerifyTokenPath = '/auth/provider/email/verify-token';

  /**
   * Verify registration token sent to email.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderEmailControllerVerifyToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authProviderEmailControllerVerifyToken$Response(params: AuthProviderEmailControllerVerifyToken$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return authProviderEmailControllerVerifyToken(this.http, this.rootUrl, params, context);
  }

  /**
   * Verify registration token sent to email.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderEmailControllerVerifyToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authProviderEmailControllerVerifyToken(params: AuthProviderEmailControllerVerifyToken$Params, context?: HttpContext): Observable<{
}> {
    return this.authProviderEmailControllerVerifyToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `authProviderEmailControllerSignUp()` */
  static readonly AuthProviderEmailControllerSignUpPath = '/auth/provider/email/sign-up';

  /**
   * Sign up user with email and password.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderEmailControllerSignUp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authProviderEmailControllerSignUp$Response(params: AuthProviderEmailControllerSignUp$Params, context?: HttpContext): Observable<StrictHttpResponse<APIAuthenticationAuthTokensResponse>> {
    return authProviderEmailControllerSignUp(this.http, this.rootUrl, params, context);
  }

  /**
   * Sign up user with email and password.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderEmailControllerSignUp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authProviderEmailControllerSignUp(params: AuthProviderEmailControllerSignUp$Params, context?: HttpContext): Observable<APIAuthenticationAuthTokensResponse> {
    return this.authProviderEmailControllerSignUp$Response(params, context).pipe(
      map((r: StrictHttpResponse<APIAuthenticationAuthTokensResponse>): APIAuthenticationAuthTokensResponse => r.body)
    );
  }

  /** Path part for operation `authProviderEmailControllerSignIn()` */
  static readonly AuthProviderEmailControllerSignInPath = '/auth/provider/email/sign-in';

  /**
   * Sign in user with email and password.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderEmailControllerSignIn()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderEmailControllerSignIn$Response(params: AuthProviderEmailControllerSignIn$Params, context?: HttpContext): Observable<StrictHttpResponse<APIAuthenticationAuthTokensResponse>> {
    return authProviderEmailControllerSignIn(this.http, this.rootUrl, params, context);
  }

  /**
   * Sign in user with email and password.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authProviderEmailControllerSignIn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderEmailControllerSignIn(params: AuthProviderEmailControllerSignIn$Params, context?: HttpContext): Observable<APIAuthenticationAuthTokensResponse> {
    return this.authProviderEmailControllerSignIn$Response(params, context).pipe(
      map((r: StrictHttpResponse<APIAuthenticationAuthTokensResponse>): APIAuthenticationAuthTokensResponse => r.body)
    );
  }

}
