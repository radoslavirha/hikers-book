/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIAuthenticationV1Configuration, APIAuthenticationV1ConfigurationParams } from './api-authentication-v-1-configuration';

import { APIAuthenticationV1UserControllerService } from './services/api-authentication-v-1-user-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    APIAuthenticationV1UserControllerService,
    APIAuthenticationV1Configuration
  ],
})
export class APIAuthenticationV1Module {
  static forRoot(params: APIAuthenticationV1ConfigurationParams): ModuleWithProviders<APIAuthenticationV1Module> {
    return {
      ngModule: APIAuthenticationV1Module,
      providers: [
        {
          provide: APIAuthenticationV1Configuration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: APIAuthenticationV1Module,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('APIAuthenticationV1Module is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
