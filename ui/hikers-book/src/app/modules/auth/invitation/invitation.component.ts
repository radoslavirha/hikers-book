import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIAuthenticationAuthAuthProviderEmailControllerService } from '../../../api/authentication/auth/services';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-auth-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  authError?: string;
  token!: string;

  disabled = true;

  signUpForm = new FormGroup({
    email: new FormControl(''),
    full_name: new FormControl(''),
    password: new FormControl(''),
    password_confirm: new FormControl('')
  });

  apiService = inject(APIAuthenticationAuthAuthProviderEmailControllerService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const invitation: { token: string; email: string } = params as { token: string; email: string };

      if (!invitation.token && !invitation.email) {
        this.router.navigate(['/auth/sign-in']);
      }

      this.apiService
        .authProviderEmailControllerVerifyToken({
          body: {
            email: invitation.email,
            token: invitation.token
          }
        })
        .subscribe({
          next: () => {
            this.token = invitation.token;
            this.signUpForm.patchValue({ email: invitation.email });
            this.disabled = false;
          },
          error: () => {
            this.router.navigate(['/auth/sign-in']);
          }
        });
    });
  }

  signUp() {
    this.apiService
      .authProviderEmailControllerSignUp({
        body: {
          email: this.signUpForm.value.email as string,
          full_name: this.signUpForm.value.full_name as string,
          password: this.signUpForm.value.password as string,
          password_confirm: this.signUpForm.value.password_confirm as string,
          token: this.token
        }
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
