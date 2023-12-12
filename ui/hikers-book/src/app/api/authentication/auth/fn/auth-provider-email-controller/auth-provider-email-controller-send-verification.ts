/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { APIAuthenticationAuthEmailSendVerificationRequest } from '../../models/api-authentication-auth-email-send-verification-request';

export interface AuthProviderEmailControllerSendVerification$Params {
      body?: APIAuthenticationAuthEmailSendVerificationRequest
}

export function authProviderEmailControllerSendVerification(http: HttpClient, rootUrl: string, params?: AuthProviderEmailControllerSendVerification$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, authProviderEmailControllerSendVerification.PATH, 'post');
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

authProviderEmailControllerSendVerification.PATH = '/auth/provider/email/send-verification';
