import { ConfigService } from './../../common/config/config.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  headers: Headers;

  constructor(
    private http: Http,
    private config: ConfigService,
    private cookieService: CookieService
  ) { }

  indexData(): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.get(this.config.getApiUrl() + '/admin', {
      headers: this.headers
    });
  }

}
