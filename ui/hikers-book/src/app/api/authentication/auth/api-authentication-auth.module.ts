/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIAuthenticationAuthConfiguration, APIAuthenticationAuthConfigurationParams } from './api-authentication-auth-configuration';

import { APIAuthenticationAuthAuthenticateControllerService } from './services/api-authentication-auth-authenticate-controller.service';
import { APIAuthenticationAuthAuthProviderEmailControllerService } from './services/api-authentication-auth-auth-provider-email-controller.service';
import { APIAuthenticationAuthAuthProviderFacebookControllerService } from './services/api-authentication-auth-auth-provider-facebook-controller.service';
import { APIAuthenticationAuthAuthProviderGithubControllerService } from './services/api-authentication-auth-auth-provider-github-controller.service';
import { APIAuthenticationAuthAuthProviderGoogleControllerService } from './services/api-authentication-auth-auth-provider-google-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    APIAuthenticationAuthAuthenticateControllerService,
    APIAuthenticationAuthAuthProviderEmailControllerService,
    APIAuthenticationAuthAuthProviderFacebookControllerService,
    APIAuthenticationAuthAuthProviderGithubControllerService,
    APIAuthenticationAuthAuthProviderGoogleControllerService,
    APIAuthenticationAuthConfiguration
  ],
})
export class APIAuthenticationAuthModule {
  static forRoot(params: APIAuthenticationAuthConfigurationParams): ModuleWithProviders<APIAuthenticationAuthModule> {
    return {
      ngModule: APIAuthenticationAuthModule,
      providers: [
        {
          provide: APIAuthenticationAuthConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: APIAuthenticationAuthModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('APIAuthenticationAuthModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
