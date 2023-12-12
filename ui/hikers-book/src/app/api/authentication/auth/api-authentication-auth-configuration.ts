/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class APIAuthenticationAuthConfiguration {
  rootUrl: string = '';
}

/**
 * Parameters for `APIAuthenticationAuthModule.forRoot()`
 */
export interface APIAuthenticationAuthConfigurationParams {
  rootUrl?: string;
}
