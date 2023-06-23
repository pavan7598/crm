import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import * as chartConfigs from './chartConfigs';
// import * as myGlobals from '../staticVariables';
@Injectable({
  providedIn: 'root'
})

export class dashbordService {
  environment: any = environment;
  baseUrl_dashboard = environment.baseUrl_connection;
  baseUrl_playerSelection = environment.baseUrl_playerSelection;
  
  constructor(private http: HttpClient) { }
    executeQuery(data:any){
     return this.http.post(this.baseUrl_playerSelection+'api/query/execute',data);
    }
    getElements(id:any){
      return this.http.get(this.baseUrl_playerSelection+'api/query/getElements/'+id);
    }

    saveDashboard(data:any){
      return this.http.post(this.baseUrl_dashboard+'api/dashboard/saveDashboard',data);
    }
    getDashboardList(){
      return this.http.get(this.baseUrl_dashboard+'api/dashboard/dashboardList');
    }
    getDashbordObj(dataID:any){
      return this.http.get(this.baseUrl_dashboard+'api/dashboard/dashboardObj/'+dataID);
    }
    deleteDashboard(data:any){
      return this.http.post(this.baseUrl_dashboard+'api/dashboard/deleteDashboard',data);
    }
    editDashboard(data:any){
      return this.http.post(this.baseUrl_dashboard+'api/dashboard/editDashboard/'+data._id,data);
    }

    updateDashboard(data:any){
      return this.http.post(this.baseUrl_dashboard+'api/dashboard/updateDashboard/'+data._id,data);
    }
}
