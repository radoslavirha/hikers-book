/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { APIAuthenticationAuthEmailVerifyTokenRequest } from '../../models/api-authentication-auth-email-verify-token-request';

export interface AuthProviderEmailControllerVerifyToken$Params {
      body?: APIAuthenticationAuthEmailVerifyTokenRequest
}

export function authProviderEmailControllerVerifyToken(http: HttpClient, rootUrl: string, params?: AuthProviderEmailControllerVerifyToken$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, authProviderEmailControllerVerifyToken.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

authProviderEmailControllerVerifyToken.PATH = '/auth/provider/email/verify-token';
