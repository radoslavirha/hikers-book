/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class APIAuthenticationV1Configuration {
  rootUrl: string = '';
}

/**
 * Parameters for `APIAuthenticationV1Module.forRoot()`
 */
export interface APIAuthenticationV1ConfigurationParams {
  rootUrl?: string;
}
