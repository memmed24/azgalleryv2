import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private url: string = "http://localhost:3000";
  private api_url: string = "http://localhost:3000/api";

  constructor() { }

  public getUrl(): string {
    return this.url;
  }

  public getApiUrl(): string {
    return this.api_url;
  }

  public getLoginUrl(): string {
    return this.api_url + '/login';
  }

  public getRegisterUrl(): string {
    return this.api_url + '/register';
  }

  public getLoggedUserUrl(): string {
    return this.api_url + '/user';
  }

}
