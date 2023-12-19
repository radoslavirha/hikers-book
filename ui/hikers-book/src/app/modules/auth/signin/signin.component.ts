import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { APIAuthenticationAuthAuthProviderEmailControllerService } from '../../../api/authentication/auth/services';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent {
  authError?: string;

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  apiService = inject(APIAuthenticationAuthAuthProviderEmailControllerService);

  constructor(private authenticationService: AuthenticationService) {
    if (this.authenticationService.authErrorCode) {
      this.authError = 'Something went wrong. Please try again.';
    }
  }

  signIn() {
    this.apiService
      .authProviderEmailControllerSignIn({
        Authorization: `Basic ${btoa(`${this.signInForm.value.email}:${this.signInForm.value.password}`)}`
      })
      .subscribe({
        next: (response) => {
          this.authenticationService.authenticate(response.access);
        },
        error: (error) => {
          this.authError = error.error.message;
        }
      });
  }
}
