import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {

  constructor(public http: HttpClient) { }



  baseUrl = 'http://127.0.0.1:3333';
  login (loginData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', this.UserDataStored.token_type + ' ' + this.UserDataStored['access_token']);
    return this.http.post(`${this.baseUrl}/api/login`, loginData );

  }

}
