import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {AuthenticationService} from '../services/authentication.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isMethodLogin = request.url.includes('Login');
    if (!isMethodLogin && this.authenticationService.getJwtToken()) {
      request = this.authenticationService.addToken(request, this.authenticationService.getJwtToken());
    }
    return next.handle(request);
  }
}
