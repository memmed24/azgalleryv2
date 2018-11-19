import { CookieService } from 'ngx-cookie-service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../common/config/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  headers: Headers;

  constructor(
    private http: Http,
    private cookie: CookieService,
    private config: ConfigService
  ) { }

  get(): Observable<any>{

    this.headers = new Headers();
    this.headers.append('api_token', this.cookie.get('api_token'));

    return this.http.get(this.config.getApiUrl() + '/materials', {
      headers: this.headers
    });

  }

  create(data): Observable<any>{
    this.headers = new Headers();
    this.headers.append('api_token', this.cookie.get('api_token'));

    return this.http.post(this.config.getApiUrl() + '/material/create', data, {
      headers: this.headers
    });
  }

  update(data:any, id: number): Observable<any>{
    this.headers = new Headers();
    this.headers.append('api_token', this.cookie.get('api_token'));

    return this.http.post(this.config.getApiUrl() + `/material/edit/${id}`, data, {
      headers: this.headers
    });
  }

  delete(id: number): Observable<any>{
    this.headers = new Headers();
    this.headers.append('api_token', this.cookie.get('api_token'));
    return this.http.get(this.config.getApiUrl() + `/material/delete/${id}`, {
      headers: this.headers
    });
  }

}
