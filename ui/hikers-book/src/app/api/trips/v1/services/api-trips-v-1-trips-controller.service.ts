/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APITripsV1BaseService } from '../api-trips-v-1-base-service';
import { APITripsV1Configuration } from '../api-trips-v-1-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { APITripsV1Trip } from '../models/api-trips-v-1-trip';
import { tripsControllerGet } from '../fn/trips-controller/trips-controller-get';
import { TripsControllerGet$Params } from '../fn/trips-controller/trips-controller-get';


/**
 * Trips controllers.
 */
@Injectable({ providedIn: 'root' })
export class APITripsV1TripsControllerService extends APITripsV1BaseService {
  constructor(config: APITripsV1Configuration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `tripsControllerGet()` */
  static readonly TripsControllerGetPath = '/v1/trips';

  /**
   * Returns list of trips.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tripsControllerGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  tripsControllerGet$Response(params?: TripsControllerGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<APITripsV1Trip>>> {
    return tripsControllerGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Returns list of trips.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `tripsControllerGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  tripsControllerGet(params?: TripsControllerGet$Params, context?: HttpContext): Observable<Array<APITripsV1Trip>> {
    return this.tripsControllerGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<APITripsV1Trip>>): Array<APITripsV1Trip> => r.body)
    );
  }

}
