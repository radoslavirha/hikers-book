import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { APIAuthenticationAuthModule } from '../../../api/authentication/auth/api-authentication-auth.module';
import { SocialComponent } from '../social/social.component';
import { SignUpComponent } from './signup.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDividerModule,
        ReactiveFormsModule,
        APIAuthenticationAuthModule.forRoot({}),
        BrowserAnimationsModule,
        RouterTestingModule,
        MockComponent(SocialComponent)
      ],
      declarations: [SignUpComponent]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
