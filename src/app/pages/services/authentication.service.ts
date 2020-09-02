import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHandler, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, mapTo, switchMap, take, tap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;
  private isRefreshing = false;
  private key = 'data';

  constructor(private http: HttpClient) {
  }

  login()
  {
    this.loginRequest().then(response => {
      if (response && response[this.key].accessToken) {
        this.doLoginUser(response[this.key].userModel.username, response[this.key].accessToken);
      }
    });
  }
  loginRequest(): Promise<any> {
    const user = {username: 'test.user', password: '2kf84nd'};
    return this.http.post(`${environment.api_url}/User/Login`, user).toPromise();
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, jwt: string) {
    this.loggedUser = username;
    this.storeJwtToken(jwt);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  public addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

}
