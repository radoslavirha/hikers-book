import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';
import { CallbackComponent } from './callback/callback.component';
import { ErrorComponent } from './error/error.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { SocialComponent } from './social/social.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, CallbackComponent, ErrorComponent, SocialComponent],
  imports: [CommonModule, AuthRoutingModule, MatIconModule, MatButtonModule, MatCardModule],
  exports: [SignInComponent, SignUpComponent, SocialComponent]
})
export class AuthModule {}
