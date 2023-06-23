import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  environment: any = environment;
  baseUrl = environment.baseUrl_connection;
  baseUrl_playerSelection = environment.baseUrl_playerSelection;
  public storage: any;

  constructor(private http: HttpClient) { }

  SendMailCrux(data:any){
    return this.http.post(this.baseUrl +'api/crux/SendMailCrux',data)
  }
  sendPlayerSelection(data:any){
    return this.http.post(this.baseUrl_playerSelection+'api/query/emailResults',data)
  }
}
