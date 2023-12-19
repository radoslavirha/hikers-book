/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { APIAuthenticationAuthEmailSignUpRequest } from '../../models/api-authentication-auth-email-sign-up-request';
import { APIAuthenticationAuthTokensResponse } from '../../models/api-authentication-auth-tokens-response';

export interface AuthProviderEmailControllerSignUp$Params {
      body: APIAuthenticationAuthEmailSignUpRequest
}

export function authProviderEmailControllerSignUp(http: HttpClient, rootUrl: string, params: AuthProviderEmailControllerSignUp$Params, context?: HttpContext): Observable<StrictHttpResponse<APIAuthenticationAuthTokensResponse>> {
  const rb = new RequestBuilder(rootUrl, authProviderEmailControllerSignUp.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<APIAuthenticationAuthTokensResponse>;
    })
  );
}

authProviderEmailControllerSignUp.PATH = '/auth/provider/email/sign-up';
