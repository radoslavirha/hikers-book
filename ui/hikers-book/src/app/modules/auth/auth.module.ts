import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { APIAuthenticationAuthConfiguration } from '../../api/authentication/auth/api-authentication-auth-configuration';
import { APIAuthenticationAuthModule } from '../../api/authentication/auth/api-authentication-auth.module';
import { ConfigService } from '../../core/services/config.service';
import { AuthRoutingModule } from './auth-routing.module';
import { CallbackComponent } from './callback/callback.component';
import { ErrorComponent } from './error/error.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { SocialComponent } from './social/social.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, CallbackComponent, ErrorComponent, SocialComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    APIAuthenticationAuthModule.forRoot({})
  ],
  providers: [
    {
      provide: APIAuthenticationAuthConfiguration,
      useFactory: (configService: ConfigService) => {
        return {
          rootUrl: configService.config.api.authentication
        };
      },
      deps: [ConfigService]
    }
  ],
  exports: [SignInComponent, SignUpComponent, SocialComponent]
})
export class AuthModule {}
