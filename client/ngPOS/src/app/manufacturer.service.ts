import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ManufacturerService {

  headers;
  baseUrl = 'http://localhost:3333/api';
  constructor(private http: HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
  }

  getManfsList() {
    return this.http.get(`${this.baseUrl}/manufacturers`, {
      withCredentials: true,
    });
  }
}
