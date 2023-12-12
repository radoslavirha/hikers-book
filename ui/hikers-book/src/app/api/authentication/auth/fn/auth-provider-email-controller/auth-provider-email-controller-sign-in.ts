/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { APIAuthenticationAuthTokensResponse } from '../../models/api-authentication-auth-tokens-response';

export interface AuthProviderEmailControllerSignIn$Params {
}

export function authProviderEmailControllerSignIn(http: HttpClient, rootUrl: string, params?: AuthProviderEmailControllerSignIn$Params, context?: HttpContext): Observable<StrictHttpResponse<APIAuthenticationAuthTokensResponse>> {
  const rb = new RequestBuilder(rootUrl, authProviderEmailControllerSignIn.PATH, 'get');
  if (params) {
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

authProviderEmailControllerSignIn.PATH = '/auth/provider/email/sign-in';
