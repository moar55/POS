import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class StockService {

  headers;
  constructor(public http: HttpClient, private router: Router) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  // TODO: See if possible to put baseUrl and headers setup in a file to be reused everywhere
  baseUrl = 'https://bellino-pos.herokuapp.com/api';

  list() {
    return this.http.get(this.baseUrl + '/stock');
  }

}
