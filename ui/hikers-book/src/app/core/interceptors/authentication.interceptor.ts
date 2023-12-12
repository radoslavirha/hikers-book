import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();

    req = req.clone({
      withCredentials: !req.url.includes('/graphql'),
      setHeaders: {
        Authorization: 'Bearer ' + authToken
      }
    });

    return next.handle(req).pipe(
      catchError((error) => {
        // check !req.url.includes(auth/refresh)
        if (error instanceof HttpErrorResponse && !req.url.includes('auth') && error.status === 401) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.authService.isLogged()) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            // if (error.status == '403') {
            //   this.eventBusService.emit(new EventData('logout', null));
            // }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}
