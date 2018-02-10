import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class ManufacturerService {

  headers;
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
  }

  getManfsList() {
    return this.http.get(`${this.baseUrl}/manufacturers`, {
      withCredentials: true,
    });
  }
}
