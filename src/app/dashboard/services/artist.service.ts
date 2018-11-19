import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from './../../common/config/config.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  headers: Headers;

  constructor(
    private http: Http,
    private configService: ConfigService,
    private cookieService: CookieService
  ) { }

  getAll(): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.get(this.configService.getApiUrl() + '/artists', {
      headers: this.headers
    });
  }

  create(data: any): Observable<any>{
    let header = new Headers();
    header.append('api_token', this.cookieService.get('api_token'));
    return this.http.post(this.configService.getApiUrl() + '/artist/create', data, {
      headers: header
    });
  }

  update(data: any, id: number): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.post(this.configService.getApiUrl() + `/artist/edit/${id}`, data, {
      headers: this.headers
    });
  }

  getOne(id:number): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.get(this.configService.getApiUrl() + `/artist/${id}`, {
      headers: this.headers
    });
  }

  delete(id: number): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.get(this.configService.getApiUrl() + `/artist/delete/${id}`, {
      headers: this.headers
    });
  }

}