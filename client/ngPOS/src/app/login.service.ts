import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable()
export class LoginService {

  constructor(public http: HttpClient) { }


  login (username,password) {
    // this.http.

  }

}
