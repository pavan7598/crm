import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  environment: any = environment;
  baseUrl = environment.baseUrl_connection;
  public tableAdding$= new Subject<any>();
  connectionChangeTrigger$ = new Subject<any>();
  currentData: any;
  constructor(private http: HttpClient) {
  }
  // baseUrl="http://localhost:4600/";
  
  getConnectionList() {
    return this.http.get(this.baseUrl+`api/data-sources/find-all`);
  }
  saveConnection(payload) {
    return this.http.post(this.baseUrl+`api/data-sources/create`,  payload);
  }
  updateConnection(id,  payload) {
    payload._id = id;
    return this.http.post(this.baseUrl+`api/data-sources/update/${id}`,  payload);
  }
  testConnection(payload) {
    return this.http.post(this.baseUrl+`api/data-sources/testConnection`, payload);
  }
  getElements(id) {
    return this.http.get(this.baseUrl+`api/data-sources/getEntities`, {params: {id}});
  }
  getEntitiesSchema(id, name) {
    const data: any  = {};
    data.datasourceID = id;
    data.entities = JSON.stringify([{name:  name}]);
    return this.http.get(this.baseUrl+`api/data-sources/getEntitySchema`, {params: data});
  }
  

}
