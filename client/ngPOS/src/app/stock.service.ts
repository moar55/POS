import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockService {

  headers;
  constructor(private http: HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' });
  }

  // TODO: See if possible to put baseUrl and headers setup in a file to be reused everywhere
  baseUrl = 'https://bellino-pos.herokuapp.com/api';

  list() {
    return this.http.get(this.baseUrl + '/stock', {
      withCredentials: true,
    });
  }
  getStockItem(R) {
    return this.http.get(`${this.baseUrl}/stock/${R}`);
  }

}
