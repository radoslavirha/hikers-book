import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-auth-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  constructor(private authenticationService: AuthenticationService) {}

  public github() {
    this.authenticationService.githubAuth();
  }

  public google() {
    this.authenticationService.googleAuth();
  }

  public facebook() {
    this.authenticationService.facebookAuth();
  }
}
