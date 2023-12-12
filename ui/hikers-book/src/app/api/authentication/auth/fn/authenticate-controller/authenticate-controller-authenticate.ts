/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { APIAuthenticationAuthJwtAuthenticationResponse } from '../../models/api-authentication-auth-jwt-authentication-response';

export interface AuthenticateControllerAuthenticate$Params {
}

export function authenticateControllerAuthenticate(http: HttpClient, rootUrl: string, params?: AuthenticateControllerAuthenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<APIAuthenticationAuthJwtAuthenticationResponse>> {
  const rb = new RequestBuilder(rootUrl, authenticateControllerAuthenticate.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<APIAuthenticationAuthJwtAuthenticationResponse>;
    })
  );
}

authenticateControllerAuthenticate.PATH = '/auth/authenticate';
