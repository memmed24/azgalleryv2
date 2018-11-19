import { CookieService } from 'ngx-cookie-service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../common/config/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  headers: Headers;

  constructor(
    private http: Http,
    private cookie: CookieService,
    private config: ConfigService
  ) { }

  getAll(): Observable<any>{

    this.headers = new Headers();
    this.headers.append('api_token', this.cookie.get('api_token'));

    return this.http.get(this.config.getApiUrl() + '/countries', {
      headers: this.headers
    });

  }

  create(data): Observable<any>{
    this.headers = new Headers();
    this.headers.append('api_token', this.cookie.get('api_token'));

    return this.http.post(this.config.getApiUrl() + '/country/create', data, {
      headers: this.headers
    });
  }

  update(data:any, id: number): Observable<any>{
    this.headers = new Headers();
    this.headers.append('api_token', this.cookie.get('api_token'));

    return this.http.post(this.config.getApiUrl() + `/country/edit/${id}`, data, {
      headers: this.headers
    });
  }

  delete(id: number): Observable<any>{
    this.headers = new Headers();
    this.headers.append('api_token', this.cookie.get('api_token'));
    return this.http.get(this.config.getApiUrl() + `/country/delete/${id}`, {
      headers: this.headers
    });
  }

}
