import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockService {

  headers;
  constructor(private http: HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
  }

  // TODO: See if possible to put baseUrl and headers setup in a file to be reused everywhere
<<<<<<< HEAD
  // baseUrl = 'https://bellino-pos.herokuapp.com/api';
=======
>>>>>>> 35136bab473a40c44a4f3122dcfe3a83cb2f9267
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
