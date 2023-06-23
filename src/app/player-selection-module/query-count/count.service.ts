import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountService {
  environment: any = environment;
  baseURL = environment.baseUrl_playerSelection;
  // public baseURL  = 'http://localhost:4800/';
  constructor(private http: HttpClient) { }
  getCount(queryObject) {
    // console.log(queryObject);
return this.http.post(this.baseURL + 'api/query/getCount',  queryObject);

  }
}
