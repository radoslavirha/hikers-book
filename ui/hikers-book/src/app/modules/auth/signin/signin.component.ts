import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent {
  authError?: string;

  constructor(private authenticationService: AuthenticationService) {
    if (this.authenticationService.authErrorCode) {
      this.authError = 'Something went wrong. Please try again.';
    }
  }
}
