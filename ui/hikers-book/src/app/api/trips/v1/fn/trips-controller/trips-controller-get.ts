/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { APITripsV1Trip } from '../../models/api-trips-v-1-trip';

export interface TripsControllerGet$Params {
}

export function tripsControllerGet(http: HttpClient, rootUrl: string, params?: TripsControllerGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<APITripsV1Trip>>> {
  const rb = new RequestBuilder(rootUrl, tripsControllerGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<APITripsV1Trip>>;
    })
  );
}

tripsControllerGet.PATH = '/v1/trips';
