import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private authenticationService: AuthenticationService,
    public config: ConfigService,
    private titleService: Title
  ) {
    this.titleService.setTitle($localize`:Tab name|Tab name:Hiker's Book`);
  }

  public logout() {
    this.authenticationService.logout();
  }
}
