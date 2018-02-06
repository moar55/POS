import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockService {

  headers;
  constructor(private http: HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
  }

  // TODO: See if possible to put baseUrl and headers setup in a file to be reused everywhere
  baseUrl = 'http://localhost:3333/api';

  list() {
    return this.http.get(this.baseUrl + '/stock', {
      withCredentials: true,
    });
  }
  getStockItem(R) {
    return this.http.get(`${this.baseUrl}/stock/${R}`);
  }

}
