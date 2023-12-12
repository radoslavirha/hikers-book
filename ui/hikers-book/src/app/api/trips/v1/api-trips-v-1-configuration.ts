/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class APITripsV1Configuration {
  rootUrl: string = '';
}

/**
 * Parameters for `APITripsV1Module.forRoot()`
 */
export interface APITripsV1ConfigurationParams {
  rootUrl?: string;
}
