import { ConfigService } from './config/config.service';
import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private cookieService: CookieService
  ) { }

  headers: Headers;

  isLogged(): boolean {

    if(this.cookieService.check('api_token')){
      return true;
    }
    return false;
    
  }

  isAdmin(): boolean {

    if(this.cookieService.get('user_status') == "1"){
      return true;
    }
    return false;
  }

  login(data) {
    return this.http.post('http://localhost:3000/api/login', data);
  }

  logout() {
    let data = {};
    let headers = new Headers();
    headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.post(this.config.getApiUrl() + '/logout', data, {
      headers: headers
    });
  }

  register(data: any) {
    return this.http.post(this.config.getRegisterUrl(), data);
  }

  loggedUser(): Observable<any> {
    let headers = new Headers();
    headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.get(this.config.getLoggedUserUrl(), {
      headers: headers
    });
  }

}
