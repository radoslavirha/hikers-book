/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIAuthenticationV1Configuration } from './api-authentication-v-1-configuration';

/**
 * Base class for services
 */
@Injectable()
export class APIAuthenticationV1BaseService {
  constructor(
    protected config: APIAuthenticationV1Configuration,
    protected http: HttpClient
  ) {
  }

  private _rootUrl?: string;

  /**
   * Returns the root url for all operations in this service. If not set directly in this
   * service, will fallback to `APIAuthenticationV1Configuration.rootUrl`.
   */
  get rootUrl(): string {
    return this._rootUrl || this.config.rootUrl;
  }

  /**
   * Sets the root URL for API operations in this service.
   */
  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }
}
