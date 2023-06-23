import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,BehaviorSubject, throwError } from 'rxjs';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from "../../../environments/environment";
import {map, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlayerSelectionService {
  environment: any = environment;
  baseURL = environment.baseUrl_playerSelection;
  // public baseURL="http://192.168.11.47:4800/";
  public dataSource =  new BehaviorSubject<any>({});
  public currentData = this.dataSource.asObservable();
  public collectionsList:any=[];
  public playerSelection:any=false;

  constructor(private http: HttpClient) {
    // this.getElements("5c6a60adfaf62f1bacef3294").subscribe(e=>{
    //   this.collectionsList=e;
    // })
   }
nameCheck(name) {
  return this.http.get(this.baseURL+`api/query/findName/${name}`).pipe(map(response => {
    return response;
  }));
}
   getLayerElements(): Observable<any>{
    return this.http.get(this.baseURL+'api/query/getLayerElements');
  }

   getElements(id): Observable<any>  {
    return this.http.get(this.baseURL+'api/query/getElements/'+id);
  
   }
   loadElement(id): Observable<any>  {
    return this.http.get(this.baseURL+'api/query/'+id+'/load');
   }
   getViewSql(data): Observable<any>  {
     console.log(data,"viewdatasendingfor query")
    return this.http.post(this.baseURL+'api/query/execute',data);
   }

   querySave(data): Observable<any>  {
    return this.http.post(this.baseURL+'api/query/save',data);
   }
   getMetricCont(data){
    return this.http.post(this.baseURL+'api/query/metricsCount',data).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      // window.alert(errorMessage);
      return throwError(errorMessage);
    }));
   }
   customsegResult(data): Observable<any>  {
    return this.http.post(this.baseURL+'api/query/customsegResult',data);
   }
   deleteQuery(id): Observable<any>  {
//     debugger;

    return this.http.get(this.baseURL+`api/query/${id}/delete`);
   }

   set isDataSource(data: any) {
    this.dataSource.next(data);
  }

  get isDataSource() {
    return this.currentData;
  }

  findNameById(data:any) {
    // console.log("this.collectionsList===>",this.collectionsList);

     let  filterDate=this.collectionsList.elements.filter(e=>e.id==data)[0];
      return filterDate;
  }
getPlayerSelectionCount(query) {
  return this.http.post(this.baseURL + 'api/query/metricsCount', query);
}
}
