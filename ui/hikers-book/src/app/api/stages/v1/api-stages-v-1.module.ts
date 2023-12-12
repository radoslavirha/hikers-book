/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIStagesV1Configuration, APIStagesV1ConfigurationParams } from './api-stages-v-1-configuration';

import { APIStagesV1HelloWorldControllerService } from './services/api-stages-v-1-hello-world-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    APIStagesV1HelloWorldControllerService,
    APIStagesV1Configuration
  ],
})
export class APIStagesV1Module {
  static forRoot(params: APIStagesV1ConfigurationParams): ModuleWithProviders<APIStagesV1Module> {
    return {
      ngModule: APIStagesV1Module,
      providers: [
        {
          provide: APIStagesV1Configuration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: APIStagesV1Module,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('APIStagesV1Module is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
