import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APIAuthenticationAuthAuthProviderEmailControllerService } from '../../../api/authentication/auth/services';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {
  authError?: string;

  signUpForm = new FormGroup({
    email: new FormControl('')
  });

  apiService = inject(APIAuthenticationAuthAuthProviderEmailControllerService);

  constructor(private router: Router) {}

  signUp() {
    this.apiService
      .authProviderEmailControllerSendVerification({
        body: {
          email: this.signUpForm.value.email as string
        }
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/sign-in']);
        },
        error: () => {
          this.authError = 'Something went wrong. Please try again.';
        }
      });
  }
}
