import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {

  constructor(public http: HttpClient) { }

  baseUrl = 'http://127.0.0.1:3333';
  login (loginData) {
    return this.http.post(`${this.baseUrl}/api/login`, JSON.stringify(loginData));

  }

}
