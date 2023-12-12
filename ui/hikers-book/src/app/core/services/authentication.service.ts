import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  #isLoggedIn = false;
  // create mechanism for handling auth errors from API like credentials exist, etc.
  // this is just a very naive solution
  #authErrorCode?: number;

  public get authErrorCode(): number | undefined {
    return this.#authErrorCode;
  }
  public set authErrorCode(code: number | undefined) {
    this.#authErrorCode = code;
  }

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router
  ) {
    this.getTokens();
  }

  public isLogged(): boolean {
    return this.#isLoggedIn;
  }

  public githubAuth(): void {
    window.open(`${this.config.config.api.authentication}/auth/provider/github`, '_self', 'height=600,width=450');
  }

  public googleAuth(): void {
    window.open(`${this.config.config.api.authentication}/auth/provider/google`, '_self', 'height=600,width=450');
  }

  public facebookAuth(): void {
    window.open(`${this.config.config.api.authentication}/auth/provider/facebook`, '_self', 'height=600,width=450');
  }

  public refreshToken() {
    return this.http.get(`${this.config.config.api.authentication}/auth/refresh`).pipe(
      map((data) => {
        // @ts-expect-error learn how to type it
        this.authenticate(data.access);
        // @ts-expect-error learn how to type it
        return data.access;
      })
    );
  }

  public authenticate(access: string): void {
    this.#isLoggedIn = true;
    this.#authErrorCode = undefined;
    sessionStorage.setItem('access', access);
    // sessionStorage.setItem('refresh', refresh);
    this.router.navigate(['/']);
  }

  public async logout(): Promise<void> {
    this.http.get(`${this.config.config.api.authentication}/auth/logout`).subscribe({
      next: () => {
        this.#isLoggedIn = false;
        this.#authErrorCode = undefined;
        sessionStorage.removeItem('access');
        this.router.navigate(['/auth/sign-in']);
      },
      error: () => {
        this.#isLoggedIn = false;
        this.#authErrorCode = undefined;
        sessionStorage.removeItem('access');
        this.router.navigate(['/auth/sign-in']);
      }
    });
  }

  public getToken() {
    return sessionStorage.getItem('access');
  }

  // public getRefreshToken() {
  //   return sessionStorage.getItem('refresh');
  // }

  private getTokens(): void {
    const access = this.getToken();
    // const refresh = this.getRefreshToken();

    this.#isLoggedIn = !!access;
    this.#authErrorCode = undefined;
  }
}
