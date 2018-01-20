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
 baseUrl = 'http://127.0.0.1:3333/api';

 list() {
   return this.http.get(this.baseUrl + '/stock')
 }

}
