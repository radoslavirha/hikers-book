/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { APIAuthenticationV1UserRequest } from '../../models/api-authentication-v-1-user-request';

export interface UserControllerGetUser$Params {
      body: APIAuthenticationV1UserRequest
}

export function userControllerGetUser(http: HttpClient, rootUrl: string, params: UserControllerGetUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, userControllerGetUser.PATH, 'get');
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

userControllerGetUser.PATH = '/v1/user';
