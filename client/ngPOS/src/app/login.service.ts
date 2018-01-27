import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {

  headers;
  constructor(public http: HttpClient, private router: Router) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }


  baseUrl = 'https://bellino-pos.herokuapp.com/api';
  login(loginData) {
    return this.http.post(`${this.baseUrl}/login`, loginData, { withCredentials: true});
    // this.headers.append('Authorization', this.UserDataStored.token_type + ' ' + this.UserDataStored['access_token']);
  }

  logout() {
    this.http.post(`${this.baseUrl}/logout`, {})
      .subscribe(
      () => {
        window.localStorage.setItem('isLoggedIn', 'false');
        return this.router.navigateByUrl('/login');
      },
      (err) => {
        console.log(err);
      });
  }
}
