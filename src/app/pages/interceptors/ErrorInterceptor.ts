import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(map(((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.status !== 200) {
                  throw new Error(event.body.message);
                }
                return event;
        }}))
        ).pipe(catchError((error: any) => {
            if (error.error instanceof Error) {
                console.error('An error occurred:', error.error.message);
              } else {
                if (error.status === 0){
                    error = 'Connection failed';
                }
              }
            return throwError(error);
        }));
    }
}
