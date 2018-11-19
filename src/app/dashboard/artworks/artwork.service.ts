import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from './../../common/config/config.service';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  private take: number;
  private skip: number;
  headers: Headers;


  constructor(
    private http: Http,
    private config: ConfigService,
    private cookieService: CookieService
  ) { }

  create(data: any): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.post(`${this.config.getApiUrl()}/artwork`, data, {
      headers: this.headers
    });
  }

  delete(id: number): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.get(`${this.config.getApiUrl()}/artwork/delete/${id}`, {
      headers: this.headers
    });
  } 

  getOne(id: number): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.get(`${this.config.getApiUrl()}/artwork/${id}`, {
      headers: this.headers
    }); 
  }

  update(data: any, id: number) : Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.post(`${this.config.getApiUrl()}/artwork/edit/${id}`, data, {
      headers: this.headers
    });
  }

  getAll(page: number = null): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    if(page){
      var url = `${this.config.getApiUrl()}/artworks?page=${page}`;
    }else{
      var url = `${this.config.getApiUrl()}/artworks?take=${this.take}&skip=${this.skip}`;
    }
    return this.http.get(`${url}`, {
      headers: this.headers
    });
  }

  search(query: string): Observable<any> {
    this.headers = new Headers();
    this.headers.append('api_token', this.cookieService.get('api_token'));
    return this.http.get(`${this.config.getApiUrl()}/search?q=${query}`, {
      headers: this.headers
    });
  }

  arrange(take: number, skip: number = null) {
    this.take = take;
    this.skip = skip;
    console.log(take, skip)
    return this;
  }

}
