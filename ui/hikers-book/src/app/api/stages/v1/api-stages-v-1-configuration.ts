/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class APIStagesV1Configuration {
  rootUrl: string = '';
}

/**
 * Parameters for `APIStagesV1Module.forRoot()`
 */
export interface APIStagesV1ConfigurationParams {
  rootUrl?: string;
}
