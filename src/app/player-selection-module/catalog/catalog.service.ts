import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  environment: any = environment;
  baseUrl = environment.baseUrl_playerSelection;
  constructor( private http:  HttpClient) {

   }
   getQueryList():  Observable<any> {
    return this.http.get(this.baseUrl+'api/query/getQueries');
   }
}
