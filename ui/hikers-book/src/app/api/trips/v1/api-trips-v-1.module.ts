/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APITripsV1Configuration, APITripsV1ConfigurationParams } from './api-trips-v-1-configuration';

import { APITripsV1TripsControllerService } from './services/api-trips-v-1-trips-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    APITripsV1TripsControllerService,
    APITripsV1Configuration
  ],
})
export class APITripsV1Module {
  static forRoot(params: APITripsV1ConfigurationParams): ModuleWithProviders<APITripsV1Module> {
    return {
      ngModule: APITripsV1Module,
      providers: [
        {
          provide: APITripsV1Configuration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: APITripsV1Module,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('APITripsV1Module is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
